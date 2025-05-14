import {Suspense, use, useEffect, useId, useRef, useState} from 'react';
import {ChevronDownIcon, ChevronRightIcon} from '@heroicons/react/24/solid';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import GhostLines from '../utils/GhostLines.tsx';
import iconSortAz from '../../assets/icon-sort-az.svg';
import iconSortZa from '../../assets/icon-sort-za.svg';
import iconSort09 from '../../assets/icon-sort-09.svg';
import iconDoubleArrowDown from '../../assets/icon-double-arrow-down.svg';

type SelectedState = boolean | 'indeterminate';
export type Selected = { [itemKey: string]: SelectedState };
export type Sort = 'asc' | 'desc' | 'amount';

export type FilterFacetProps = GeneralFilterFacetProps & FilterFacetFiltersProps;

interface GeneralFilterFacetProps {
    items: FilterFacetItem[] | Promise<FilterFacetItem[]>;
    selected: Selected;
    maxInitialItems?: number;
    showAmount?: boolean;
    itemsClosed?: boolean;
    onSelect: (selected: Selected) => void;
}

interface FilterFacetFiltersProps {
    onTextFilterChange?: (value: string) => void;
    onSort?: (type: Sort) => void;
}

interface FilterFacetItemProps extends FilterFacetItem {
    state: Selected;
    parents: Map<string, FilterFacetItem>;
    onSelected: (selected: Selected) => void;
    hasChildren: boolean;
    showAmount?: boolean;
    itemsClosed?: boolean;
}

export interface FilterFacetItem {
    itemKey: string;
    label: string;
    amount: number;
    children?: FilterFacetItem[];
}

function buildParents(items: FilterFacetItem[], parent?: FilterFacetItem, map = new Map<string, FilterFacetItem>()) {
    for (const item of items) {
        if (parent) {
            map.set(item.itemKey, parent);
        }
        if (item.children) {
            buildParents(item.children, item, map);
        }
    }
    return map;
}

export default function FilterFacet({
                                        items,
                                        selected,
                                        maxInitialItems,
                                        onSelect,
                                        showAmount = true,
                                        itemsClosed = false,
                                        onTextFilterChange,
                                        onSort
                                    }: FilterFacetProps) {
    return (
        <>
            {(onTextFilterChange || onSort) &&
                <FilterFacetFilters onTextFilterChange={onTextFilterChange} onSort={onSort}/>}

            <Suspense fallback={<GhostLines/>}>
                <FilterFacetItems items={items} selected={selected} maxInitialItems={maxInitialItems}
                                  onSelect={onSelect} showAmount={showAmount} itemsClosed={itemsClosed}/>
            </Suspense>
        </>
    );
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

function FilterFacetItems({
                              items,
                              selected,
                              maxInitialItems,
                              showAmount,
                              itemsClosed,
                              onSelect
                          }: GeneralFilterFacetProps) {
    const resolvedItems = items instanceof Promise ? use(items) : items;
    const parents = buildParents(resolvedItems);
    const hasChildren = resolvedItems.some(item => item.children && item.children.length > 0);
    const [showAll, setShowAll] = useState(!(maxInitialItems && resolvedItems.length > maxInitialItems));

    return (
        <>
            <ScrollArea.Root className="relative overflow-hidden">
                <ScrollArea.Viewport className="max-h-48 pr-4">
                    {(showAll ? resolvedItems : resolvedItems.slice(0, maxInitialItems)).map(facetItem =>
                        <FilterFacetItem key={facetItem.itemKey} {...facetItem}
                                         state={selected} parents={parents}
                                         onSelected={onSelect} hasChildren={hasChildren}
                                         showAmount={showAmount} itemsClosed={itemsClosed}/>)}
                </ScrollArea.Viewport>

                <ScrollArea.Scrollbar orientation="vertical"
                                      className="flex touch-none select-none transition-colors h-full w-2.5 border-l border-l-transparent p-[1px]">
                    <ScrollArea.Thumb className="relative flex-1 rounded-full bg-neutral-100"/>
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>

            {maxInitialItems && resolvedItems.length > maxInitialItems &&
                <ToggleItems isOpen={showAll} toggle={() => setShowAll(showAll => !showAll)}/>}
        </>
    );
}

function FilterFacetItem({
                             itemKey,
                             label,
                             amount,
                             state,
                             parents,
                             children,
                             onSelected,
                             hasChildren,
                             showAmount = true,
                             itemsClosed = false
                         }: FilterFacetItemProps) {
    const itemHasChildren = children && children.length > 0;
    const id = useId();
    const [isOpen, setIsOpen] = useState(!itemsClosed);
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.indeterminate = state[itemKey] === 'indeterminate';
        }
    }, [state]);

    function updateDown(itemKey: string, children: FilterFacetItem[] | undefined,
                        checked: boolean, newState: Selected) {
        newState[itemKey] = checked;
        for (const child of children || []) {
            updateDown(child.itemKey, child.children, checked, newState);
        }
    }

    function updateUp(itemKey: string, newState: Selected) {
        const parent = parents.get(itemKey);
        if (!parent)
            return;

        const children = parent.children!;
        const states = children.map(child => newState[child.itemKey]);
        const allChecked = states.every(s => s === true);
        const noneChecked = states.every(s => s === false);

        newState[parent.itemKey] = !allChecked && !noneChecked ? 'indeterminate' : allChecked;

        updateUp(parent.itemKey, newState);
    }

    function onChange(checked: boolean) {
        const newState = {...state};
        updateDown(itemKey, children, checked, newState);
        updateUp(itemKey, newState);
        onSelected(newState);
    }

    return (
        <div className="flex flex-col justify-between w-full items-center">
            <div className="flex flex-row items-center w-full">
                {itemHasChildren &&
                    <button className="mr-2" onClick={_ => setIsOpen(isOpen => !isOpen)}>
                        <ChevronIcon isOpen={isOpen}/>
                    </button>}

                <input className={`w-4 h-4 mr-2 block ${!itemHasChildren && hasChildren ? 'ml-5' : ''}`}
                       type="checkbox" id={id} name={itemKey} ref={ref} checked={Boolean(state[itemKey])}
                       onChange={e => onChange(e.target.checked)}/>

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
                        <FilterFacetItem key={facetItem.itemKey} {...facetItem}
                                         state={state} parents={parents}
                                         onSelected={onSelected} hasChildren={hasChildren}
                                         showAmount={showAmount} itemsClosed={itemsClosed}/>)}
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

function ToggleItems({isOpen, toggle}: { isOpen: boolean, toggle: () => void }) {
    return (
        <div className="flex justify-end">
            <button className="text-xs flex flex-row text-sky-700 items-center justify-start gap-1"
                    onClick={toggle}>
                All items
                <img src={iconDoubleArrowDown} alt=""
                     className={`w-4 h-4 fill-bg-sky-700 ${isOpen ? 'rotate-180' : ''}`}/>
            </button>
        </div>
    );
}
