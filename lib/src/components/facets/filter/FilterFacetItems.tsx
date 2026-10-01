import {useMemo, useState} from 'react';
import {ChevronDoubleDownIcon} from '@heroicons/react/24/solid';
import {Tree, TreeItem, TreeItemContent} from 'react-aria-components';
import Hierarchy from 'context/Hierarchy';
import useTranslate from 'hooks/useTranslate';
import FilterFacetTreeItemContent from './FilterFacetTreeItemContent';

export interface FilterFacetItem {
    itemKey: string;
    label: string;
    amount: number;
    children?: FilterFacetItem[];
}

export interface FilterFacetItemsProps {
    items: FilterFacetItem[];
    selected: Set<string>;
    maxInitialItems?: number;
    showAmount?: boolean;
    itemsClosed?: boolean;
    initialLevels?: number;
    onSelect: (selected: Set<string>) => void;
}

interface FilterFacetTreeItemsProps {
    items: FilterFacetItem[];
    showAmount: boolean;
    facetHasChildren: boolean;
}

export default function FilterFacetItems({
                                             items,
                                             selected,
                                             maxInitialItems,
                                             showAmount = true,
                                             itemsClosed = false,
                                             initialLevels = 1,
                                             onSelect
                                         }: FilterFacetItemsProps) {
    const {t} = useTranslate();
    const [showAll, setShowAll] = useState(!(maxInitialItems && items.length > maxInitialItems));

    const filteredItems = showAll ? items : items.slice(0, maxInitialItems);
    const hasChildren = items.some(item => item.children && item.children.length > 0);

    const expandedKeys = useMemo(() => itemsClosed ? new Set<string>() : (() => {
        const addExpandingKeys = (item: FilterFacetItem, level: number = 0) => {
            if (item.children && level < initialLevels) {
                keys.add(item.itemKey);
                item.children.map(i => addExpandingKeys(i, level + 1));
            }
        };

        const keys = new Set<string>();
        filteredItems.map(i => addExpandingKeys(i, 0));

        return keys;
    })(), [itemsClosed, filteredItems, initialLevels]);

    return (
        <Hierarchy items={filteredItems} selected={selected} setSelected={onSelect}
                   getKey={item => item.itemKey} getChildren={item => item.children}>
            <Tree selectionMode="multiple" aria-label={t('filter.aria')} defaultExpandedKeys={expandedKeys}
                  className="max-h-80 overflow-y-auto pr-4">
                <TreeItems items={filteredItems} showAmount={showAmount} facetHasChildren={hasChildren}/>
            </Tree>

            {maxInitialItems && items.length > maxInitialItems &&
                <ToggleItems isOpen={showAll} toggle={() => setShowAll(showAll => !showAll)}/>}
        </Hierarchy>
    );
}

function TreeItems({items, showAmount, facetHasChildren}: FilterFacetTreeItemsProps) {
    return (
        <>
            {items.map(item => (
                <TreeItem key={item.itemKey} id={item.itemKey} textValue={item.label}
                          hasChildItems={item.children && item.children.length > 0}>
                    <TreeItemContent>
                        {({hasChildItems, isExpanded, level}) =>
                            <FilterFacetTreeItemContent item={item} level={level}
                                                        showAmount={showAmount} facetHasChildren={facetHasChildren}
                                                        hasChildren={hasChildItems} isOpen={isExpanded}/>}
                    </TreeItemContent>

                    {item.children && item.children.length > 0 &&
                        <TreeItems items={item.children} showAmount={showAmount} facetHasChildren={facetHasChildren}/>}
                </TreeItem>
            ))}
        </>
    );
}

function ToggleItems({isOpen, toggle}: { isOpen: boolean, toggle: () => void }) {
    const {t} = useTranslate();

    return (
        <div className="flex justify-end">
            <button className="text-xs flex flex-row items-center justify-start gap-1" onClick={toggle}>
                {t('filter.showAll')}
                <ChevronDoubleDownIcon className={`w-4 h-4 fill-bg-sky-700 ${isOpen ? 'rotate-180' : ''}`}/>
            </button>
        </div>
    );
}
