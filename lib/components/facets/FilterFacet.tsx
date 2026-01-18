import {ReactNode, Suspense, useEffect, useId, useMemo, useRef, useState} from 'react';
import {ChevronDownIcon, ChevronRightIcon} from '@heroicons/react/24/solid';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import GhostLines from 'components/utils/GhostLines';
import iconSortAz from 'assets/icon-sort-az.svg';
import iconSortZa from 'assets/icon-sort-za.svg';
import iconSort09 from 'assets/icon-sort-09.svg';
import iconDoubleArrowDown from 'assets/icon-double-arrow-down.svg';
import type {TranslateFn} from "../../context/I18nContext";

export type Sort = 'asc' | 'desc' | 'hits';

export interface FilterFacetProps extends FilterFacetFiltersProps {
    children: ReactNode;
    translate?: TranslateFn;
}

interface FilterFacetFiltersProps {
    onTextFilterChange?: (value: string) => void;
    onSort?: (type: Sort) => void;
    translate?: TranslateFn;
}

export interface FilterFacetItemsProps {
    items: FilterFacetItem[];
    selected: Set<string>;
    maxInitialItems?: number;
    showAmount?: boolean;
    itemsClosed?: boolean;
    onSelect: (selected: Set<string>) => void;
}

interface FilterFacetItemProps extends FilterFacetItem {
    state: Set<string>;
    parents: Map<string, FilterFacetItem>;
    onSelected: (selected: Set<string>) => void;
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

function updateDown(children: FilterFacetItem[] | undefined, state: Set<string>) {
    for (const child of children || []) {
        state.delete(child.itemKey);
        updateDown(child.children, state);
    }
}

function updateUp(itemKey: string, parents: Map<string, FilterFacetItem>, state: Set<string>) {
    const parent = parents.get(itemKey);
    if (!parent || !parent.children)
        return;

    const allChecked = parent.children.every(child => state.has(child.itemKey));
    if (allChecked) {
        state.add(parent.itemKey);
        for (const child of parent.children) {
            state.delete(child.itemKey);
        }
    }
    else if (state.has(parent.itemKey)) {
        state.delete(parent.itemKey);
        for (const child of parent.children) {
            if (child.itemKey !== itemKey) {
                state.add(child.itemKey);
            }
        }
    }

    updateUp(parent.itemKey, parents, state);
}

function isCheckedItem(itemKey: string, state: Set<string>, parents: Map<string, FilterFacetItem>): boolean {
    if (state.has(itemKey)) {
        return true;
    }

    const parent = parents.get(itemKey);
    if (!parent)
        return false;

    return isCheckedItem(parent.itemKey, state, parents);
}

function isIndeterminateItem(children: FilterFacetItem[] | undefined, state: Set<string>): boolean {
    if (!children || children.length === 0) {
        return false;
    }

    const allChecked = children.every(s => state.has(s.itemKey));
    const noneChecked = children.every(s => !state.has(s.itemKey));

    if (!allChecked && !noneChecked) {
        return true;
    }

    return children.some(child => isIndeterminateItem(child.children, state));
}

export default function FilterFacet({onTextFilterChange, onSort, children, translate}: FilterFacetProps) {
    return (
        <>
            {(onTextFilterChange || onSort) &&
                <FilterFacetFilters onTextFilterChange={onTextFilterChange} onSort={onSort} translate={translate} />}

            <Suspense fallback={<GhostLines/>}>
                {children}
            </Suspense>
        </>
    );
}

function FilterFacetFilters({onTextFilterChange, onSort, translate}: FilterFacetFiltersProps) {
    const id = useId();

    return (
        <div className="pb-1 flex gap-2 justify-between items-center border-neutral-300 mt-2">
            {onTextFilterChange && <div className="pb-1 w-3/5 flex items-center">
                <label htmlFor={id} className="hidden">{translate ? translate('filterFacet:filterOnFacetItems') : 'Filter on facet items'}</label>
                <input
                    className="py-1 px-3 text-xs w-full rounded border border-neutral-600 placeholder:italic text-neutral-700"
                    type="search" id={id} placeholder={translate ? translate('faceted-search-react.filter.facet.placeHolder') : 'Type to filter'}
                    onChange={e => onTextFilterChange(e.target.value)}/>
            </div>}

            {onSort && <div className="flex justify-end gap-1 w-2/5">
                <button
                    className="py-1 px-2 text-xs rounded bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center"
                    aria-label={translate ? translate('faceted-search-react.filter.facet.orderAsc') : 'Order from A to Z'} onClick={() => onSort('asc')}>
                    <img src={iconSortAz} alt="" className="h-4"/>
                </button>

                <button
                    className="py-1 px-2 text-xs rounded bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center"
                    aria-label={translate ? translate('faceted-search-react.filter.facet.orderDesc') : 'Order from Z to A'} onClick={() => onSort('desc')}>
                    <img src={iconSortZa} alt="" className="h-4"/>
                </button>

                <button
                    className="py-1 px-2 text-xs rounded bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center"
                    aria-label={translate ? translate('faceted-search-react.filter.facet.orderHits') : 'Order by amount of results'} onClick={() => onSort('hits')}>
                    <img src={iconSort09} alt="" className="h-4"/>
                </button>
            </div>}
        </div>
    );
}

export function FilterFacetItems({
                                     items,
                                     selected,
                                     maxInitialItems,
                                     showAmount,
                                     itemsClosed,
                                     onSelect
                                 }: FilterFacetItemsProps) {
    const parents = buildParents(items);
    const hasChildren = items.some(item => item.children && item.children.length > 0);
    const [showAll, setShowAll] = useState(!(maxInitialItems && items.length > maxInitialItems));

    return (
        <>
            <ScrollArea.Root className="relative overflow-hidden">
                <ScrollArea.Viewport className="max-h-80 pr-4">
                    {(showAll ? items : items.slice(0, maxInitialItems)).map(facetItem =>
                        <FilterFacetItem key={facetItem.itemKey} {...facetItem}
                                         state={selected} parents={parents}
                                         onSelected={onSelect} hasChildren={hasChildren}
                                         showAmount={showAmount} itemsClosed={itemsClosed}/>)}
                </ScrollArea.Viewport>

                <ScrollArea.Scrollbar orientation="vertical"
                                      className="flex touch-none select-none transition-colors h-full w-2.5 border-l border-l-transparent p-[1px]">
                    <ScrollArea.Thumb className="relative flex-1 rounded-full bg-(--color-support-002)"/>
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>

            {maxInitialItems && items.length > maxInitialItems &&
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
    const id = useId();
    const [isOpen, setIsOpen] = useState(!itemsClosed);
    const ref = useRef<HTMLInputElement>(null);

    const itemHasChildren = children && children.length > 0;
    const isChecked = useMemo(() => isCheckedItem(itemKey, state, parents), [itemKey, state, parents]);
    const isIndeterminate = useMemo(() => isIndeterminateItem(children, state), [children, state]);

    useEffect(() => {
        if (ref.current) {
            ref.current.indeterminate = isIndeterminate;
        }
    }, [isIndeterminate]);

    function onChange(checked: boolean) {
        const newState = new Set(state);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        checked ? newState.add(itemKey) : newState.delete(itemKey);

        updateDown(children, newState);
        updateUp(itemKey, parents, newState);

        onSelected(newState);
    }

    return (
        <div className="flex flex-col justify-between w-full items-center">
            <div className="flex flex-row items-center w-full">
                {itemHasChildren && <button className="mr-2" onClick={() => setIsOpen(isOpen => !isOpen)}>
                    <ChevronIcon isOpen={isOpen}/>
                </button>}

                <input className={`w-4 h-4 mr-2 block ${!itemHasChildren && hasChildren ? 'ml-5' : ''}`}
                       type="checkbox" id={id} name={itemKey} ref={ref} checked={isChecked}
                       onChange={e => onChange(e.target.checked)}/>

                <label htmlFor={id} className="flex justify-between w-full">
                    <div className="grow">{label}</div>
                    {showAmount && <>
                        <div className="grow" aria-label="Amount of results"></div>
                        <div className="text-sm text-neutral-500">{amount.toLocaleString()}</div>
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
            <button className="text-xs flex flex-row items-center justify-start gap-1" onClick={toggle}>
                All items
                <img src={iconDoubleArrowDown} alt=""
                     className={`w-4 h-4 fill-bg-sky-700 ${isOpen ? 'rotate-180' : ''}`}/>
            </button>
        </div>
    );
}
