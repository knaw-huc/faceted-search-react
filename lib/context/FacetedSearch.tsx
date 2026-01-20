import {createContext, useRef, ReactNode} from 'react';
import createFacetedSearchStore, {Facets, SearchFn, FacetedSearchStore} from 'store/FacetedSearchStore';
import {I18nProvider, TranslateFn} from './I18nContext';

interface FacetedSearchParams<R> {
    facets: Facets;
    searchFn: SearchFn<R>;
    searchLabel?: string;
    pageSize?: number;
    /**
     * Custom translate function from your i18n library (react-intl, i18next, your own homegrown solution etc.)
     * If provided, this takes precedence over the translations prop
     */
    translate?: TranslateFn;
    /**
     * Partial translations object to override specific key. Will be merged with default English translations.
     */
    translations?: Partial<Record<string, string>>;
    children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-explicit-any
export const FacetedSearchContext = createContext<FacetedSearchStore<any> | null>(null);

export default function FacetedSearch<R>({facets, searchFn, searchLabel, pageSize, translate, translations, children}: FacetedSearchParams<R>) {
    const store = useRef<FacetedSearchStore<R>>(null);
    // eslint-disable-next-line react-hooks/refs
    if (!store.current) {
        store.current = createFacetedSearchStore(facets, searchFn, searchLabel, pageSize);
    }

    return (
        // eslint-disable-next-line react-hooks/refs
        <FacetedSearchContext.Provider value={store.current}>
            <I18nProvider translate={translate} translations={translations}>
                {children}
            </I18nProvider>
        </FacetedSearchContext.Provider>
    );
}
