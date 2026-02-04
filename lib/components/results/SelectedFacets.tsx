import {ReactNode} from 'react';
import useTranslate from 'hooks/useTranslate';

export interface SelectedFacetsProps {
    selectedFacets: SelectedFacet[];
    onClear: () => void;
}

export interface SelectedFacet {
    itemKey: string;
    name?: string;
    label: ReactNode;
    onRemove: () => void;
}

export default function SelectedFacets({selectedFacets, onClear}: SelectedFacetsProps) {
    const {t} = useTranslate();

    return (
        <section className="flex flex-row gap-2 my-4 justify-center max-h-20 overflow-auto"
                 aria-label={t('selected.aria')}>
            <div className="text-sm italic text-neutral-500 py-1 whitespace-nowrap">
                {t('selected.label')}
            </div>

            <div className="flex flex-row gap-2 flex-wrap items-start grow">
                {selectedFacets.map(facet =>
                    <SelectedFacetItem key={facet.itemKey} {...facet}/>)}
            </div>

            <div>
                <button
                    className="rounded-full px-2 py-1 font-bold no-underline inline-flex items-center gap-1 transition bg-neutral-100 hover:bg-neutral-200 whitespace-nowrap text-xs"
                    onClick={onClear}>
                    {t('selected.clear')}
                </button>
            </div>
        </section>
    );
}

function SelectedFacetItem({name, label, onRemove}: SelectedFacet) {
    const {t} = useTranslate();

    return (
        <div className="rounded bg-(--color-support-002) text-white py-1 px-2 text-sm flex flex-row items-center">
            <span className="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 stroke-white">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                </svg>
            </span>

            <span>
                {name && <span className="font-bold">{name}: </span>}{label}
            </span>

            <button className="ml-2" aria-label={t('selected.remove.aria')} onClick={onRemove}>
                &#10005;
            </button>
        </div>
    );
}
