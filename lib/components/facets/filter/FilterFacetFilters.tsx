import {useId} from 'react';
import {Button} from 'react-aria-components';
import useTranslate from 'hooks/useTranslate';
import iconSortAZ from 'assets/icon-sort-az.svg';
import iconSortZA from 'assets/icon-sort-za.svg';
import iconSort09 from 'assets/icon-sort-09.svg';

export type Sort = 'asc' | 'desc' | 'hits';

export interface FilterFacetFiltersProps {
    onTextFilterChange?: (value: string) => void;
    onSort?: (type: Sort) => void;
    sort?: Sort;
}

export default function FilterFacetFilters({onTextFilterChange, onSort, sort}: FilterFacetFiltersProps) {
    return (
        <div className="pb-1 flex gap-2 justify-between items-center border-neutral-300">
            {onTextFilterChange && <TextFilter onTextFilterChange={onTextFilterChange}/>}
            {sort && onSort && <SortButtons sort={sort} onSort={onSort}/>}
        </div>
    );
}

function TextFilter({onTextFilterChange}: { onTextFilterChange: (value: string) => void }) {
    const id = useId();
    const {t} = useTranslate();

    return (
        <div className="pb-1 w-3/5 flex items-center">
            <label htmlFor={id} className="hidden">{t('filter.label')}</label>
            <input
                className="py-1 px-3 text-xs w-full rounded border border-neutral-600 placeholder:italic text-neutral-700"
                type="search" id={id} placeholder={t('filter.placeholder')}
                onChange={e => onTextFilterChange(e.target.value)}/>
        </div>
    );
}

function SortButtons({sort, onSort}: { sort: Sort, onSort: (type: Sort) => void }) {
    const {t} = useTranslate();

    return (
        <div className="flex justify-end gap-1 w-2/5">
            <Button
                className={`py-1 px-2 text-xs rounded bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center ${sort === 'asc' ? 'border' : ''}`}
                aria-label={t('filter.sort.asc')} onClick={() => onSort('asc')}>
                <img src={iconSortAZ} alt={t('filter.sort.asc')} className="h-4"/>
            </Button>

            <Button
                className={`py-1 px-2 text-xs rounded bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center ${sort === 'desc' ? 'border' : ''}`}
                aria-label={t('filter.sort.desc')} onClick={() => onSort('desc')}>
                <img src={iconSortZA} alt={t('filter.sort.desc')} className="h-4"/>
            </Button>

            <Button
                className={`py-1 px-2 text-xs rounded bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center ${sort === 'hits' ? 'border' : ''}`}
                aria-label={t('filter.sort.hits')} onClick={() => onSort('hits')}>
                <img src={iconSort09} alt={t('filter.sort.hits')} className="h-4"/>
            </Button>
        </div>
    );
}
