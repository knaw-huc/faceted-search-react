import {useEffect, useId, useRef, useState} from 'react';
import {ChevronDownIcon, ChevronRightIcon} from '@heroicons/react/24/solid';
import iconSortAz from '../assets/icon-sort-az.svg';
import iconSortZa from '../assets/icon-sort-za.svg';
import iconSort09 from '../assets/icon-sort-09.svg';

export interface FilterFacetProps extends FilterFacetFiltersProps {
    items: FilterFacetItem[];
    maxInitialItems?: number;
    onSelected: (key: string) => void;
    showAmount?: boolean;
    itemsClosed?: boolean;
}

interface FilterFacetFiltersProps {
    onTextFilterChange?: (value: string) => void;
    onSort?: (type: 'asc' | 'desc' | 'amount') => void;
}

interface FilterFacetItemProps extends FilterFacetItem {
    onSelected: (key: string) => void;
    hasChildren: boolean;
    showAmount?: boolean;
    itemsClosed?: boolean;
}

export interface FilterFacetItem {
    itemKey: string;
    label: string;
    amount: number;
    isSelected: boolean;
    children?: FilterFacetItem[];
}

export default function FilterFacet({
                                        items,
                                        maxInitialItems,
                                        onSelected,
                                        showAmount = true,
                                        itemsClosed = false,
                                        onTextFilterChange,
                                        onSort
                                    }: FilterFacetProps) {
    const hasChildren = items.some(item => item.children && item.children.length > 0);
    const [showAll, setShowAll] = useState(!(maxInitialItems && items.length > maxInitialItems));

    return (
        <>
            {(onTextFilterChange || onSort) &&
                <FilterFacetFilters onTextFilterChange={onTextFilterChange} onSort={onSort}/>}

            <div className="max-h-48 overflow-y-auto">
                {(showAll ? items : items.slice(0, maxInitialItems)).map(facetItem =>
                    <FilterFacetItem key={facetItem.itemKey} {...facetItem} onSelected={onSelected}
                                     hasChildren={hasChildren} showAmount={showAmount} itemsClosed={itemsClosed}/>)}
            </div>

            {maxInitialItems && items.length > maxInitialItems &&
                <ToggleItems toggle={() => setShowAll(showAll => !showAll)}/>}
        </>
    )
}

function FilterFacetFilters({onTextFilterChange, onSort}: FilterFacetFiltersProps) {
    const id = useId();

    return (
        <div className="pb-1 flex gap-2 justify-between items-center border- border-neutral-300 mt-2">
            {onTextFilterChange && <div className="pb-1 w-3/5 flex items-center">
                <label htmlFor={id} className="hidden">Filter on facet items</label>
                <input
                    className="py-1 px-3 text-xs w-full rounded border border-neutral-600 placeholder:italic text-neutral-700"
                    type="search" id={id} placeholder="Type to filter"
                    onChange={e => onTextFilterChange(e.target.value)}/>
            </div>}

            {onSort && <div className="flex justify-end gap-1 w-2/5">
                <button
                    className="py-1 px-2 text-xs rounded bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center"
                    aria-label="Order from A to Z" onClick={_ => onSort('asc')}>
                    <img src={iconSortAz} alt="" className="h-4"/>
                </button>

                <button
                    className="py-1 px-2 text-xs rounded bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center"
                    aria-label="Order from Z to A" onClick={_ => onSort('desc')}>
                    <img src={iconSortZa} alt="" className="h-4"/>
                </button>

                <button
                    className="py-1 px-2 text-xs rounded bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center"
                    aria-label="Order by the amount of results" onClick={_ => onSort('amount')}>
                    <img src={iconSort09} alt="" className="h-4"/>
                </button>
            </div>}
        </div>
    );
}

function FilterFacetItem({
                             itemKey,
                             label,
                             amount,
                             isSelected,
                             children,
                             onSelected,
                             hasChildren,
                             showAmount = true,
                             itemsClosed = false
                         }: FilterFacetItemProps) {
    const itemHasChildren = children && children.length > 0;
    const areAllSelected = (items: FilterFacetItem[], allSelected: boolean) => items.every(item => item.isSelected === allSelected);

    const id = useId();
    const [isOpen, setIsOpen] = useState(!itemsClosed);
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (ref.current) {
            if (itemHasChildren) {
                if (children.flatMap(item => item.children ? areAllSelected(item.children, true) : item.isSelected)) {
                    ref.current.checked = true;
                    ref.current.indeterminate = false;
                }
                else if (children.flatMap(item => item.children ? areAllSelected(item.children, false) : !item.isSelected)) {
                    ref.current.checked = false;
                    ref.current.indeterminate = false;
                }
                else {
                    ref.current.checked = false;
                    ref.current.indeterminate = true;
                }
            }
            else {
                ref.current.checked = isSelected;
                ref.current.indeterminate = false;
            }
        }
    }, [isSelected, children]);

    return (
        <div className="flex flex-col justify-between gap-1 w-full items-center">
            <div className="flex flex-row items-center w-full">
                {itemHasChildren &&
                    <button className="mr-2" onClick={_ => setIsOpen(isOpen => !isOpen)}>
                        <ChevronIcon isOpen={isOpen}/>
                    </button>}

                <input className={`w-4 h-4 mr-2 block ${!itemHasChildren && hasChildren ? 'ml-5' : ''}`}
                       type="checkbox" id={id} name={itemKey} ref={ref}
                       onChange={_ => onSelected(itemKey)}/>

                <label htmlFor={id} className="flex justify-between w-full">
                    <div className="grow">{label}</div>
                    {showAmount && <>
                        <div className="grow" aria-label="Amount of results"></div>
                        <div className="text-sm text-neutral-500">{amount}</div>
                    </>}
                </label>
            </div>

            {itemHasChildren && <div className={`w-full ${isOpen ? 'block' : 'hidden'}`}>
                <div className="ml-2">
                    {children.map(facetItem =>
                        <FilterFacetItem key={facetItem.itemKey} {...facetItem} onSelected={onSelected}
                                         hasChildren={hasChildren} showAmount={showAmount} itemsClosed={itemsClosed}/>)}
                </div>
            </div>}
        </div>
    );
}

function ChevronIcon({isOpen}: { isOpen: boolean }) {
    if (isOpen) {
        return <ChevronDownIcon className="w-3 h-3 fill-neutral-900"/>;
    }
    return <ChevronRightIcon className="w-3 h-3 fill-neutral-900"/>;
}

function ToggleItems({toggle}: { toggle: () => void }) {
    return (
        <div className="flex justify-end">
            <button className="text-xs flex flex-row text-sky-700 items-center justify-start gap-1"
                    onClick={toggle}>
                All items
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                     className="w-4 h-4 fill-bg-sky-700">
                    <path fillRule="evenodd"
                          d="M20.03 4.72a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 11.69l6.97-6.97a.75.75 0 011.06 0zm0 6a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06L12 17.69l6.97-6.97a.75.75 0 011.06 0z"
                          clipRule="evenodd"/>
                </svg>
            </button>
        </div>
    );
}
