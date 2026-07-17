import {type CSSProperties, useMemo} from 'react';
import {Button, CheckboxField, CheckboxButton} from 'react-aria-components';
import {ChevronRightIcon} from '@heroicons/react/24/solid';
import useTranslate from 'hooks/useTranslate';
import useHierarchy from 'hooks/useHierarchy';
import type {FilterFacetItem} from './FilterFacetItems';

export interface FilterFacetTreeItemContentProps {
    item: FilterFacetItem;
    level: number;
    showAmount: boolean;
    facetHasChildren: boolean;
    hasChildren: boolean;
    isOpen: boolean;
}

export default function FilterFacetTreeItemContent({
                                                       item,
                                                       level,
                                                       showAmount,
                                                       facetHasChildren,
                                                       hasChildren,
                                                       isOpen
                                                   }: FilterFacetTreeItemContentProps) {
    const {toggle, isSelected, isPartial} = useHierarchy();

    const selected = useMemo(() => isSelected(item.itemKey), [item, isSelected]);
    const indeterminate = useMemo(() => isPartial(item.itemKey), [item, isPartial]);

    return (
        <div className="flex flex-row items-center ml-(--indent)"
             style={{'--indent': level > 1 ? `${(level - 1) * 0.5}rem` : 0} as CSSProperties}>
            {hasChildren && <Button slot="chevron" className="mr-2">
                <ChevronRightIcon className={`w-3 h-3 fill-neutral-900 ${isOpen ? 'rotate-90' : ''}`}/>
            </Button>}

            <CheckboxField slot="selection" className="flex flex-row items-center w-full"
                      name={item.itemKey} isSelected={selected} isIndeterminate={indeterminate}
                      onChange={() => toggle(item.itemKey)}>
                <CheckboxIndicator className={facetHasChildren && !hasChildren ? 'ml-5' : ''}
                                   isSelected={selected} isIndeterminate={indeterminate}/>
                <ItemContent item={item} showAmount={showAmount}/>
            </CheckboxField>
        </div>
    );
}

function CheckboxIndicator({isSelected, isIndeterminate, className}: {
    isSelected: boolean,
    isIndeterminate: boolean,
    className?: string
}) {
    return (
        <CheckboxButton
            className={`${className || ''} mr-2 w-4 h-4 shrink-0 box-border flex items-center justify-center rounded-sm border border-neutral-600 ${isSelected || isIndeterminate ? 'bg-(--color-support-002)' : ''}`}>
            {(isSelected || isIndeterminate) &&
                <svg viewBox="0 0 18 18" aria-hidden="true" key={isIndeterminate ? 'indeterminate' : 'check'}
                     fill="none" stroke="white" strokeWidth="3px" className="w-3 h-3">
                    {isIndeterminate
                        ? <rect x={3} y={8} width={12} height={1}/>
                        : <polyline points="2 9 7 14 16 4"/>}
                </svg>}
        </CheckboxButton>
    );
}

function ItemContent({item, showAmount}: { item: FilterFacetItem, showAmount: boolean }) {
    const {t} = useTranslate();

    return (
        <div className="flex justify-between w-full">
            <div className="grow">{item.label}</div>
            {showAmount && <div className="text-sm text-neutral-500" aria-label={t('filter.amount.aria')}>
                {item.amount.toLocaleString()}
            </div>}
        </div>
    );
}
