import {createContext, useState, type ReactNode} from 'react';
import createFacetedSearchStore from 'store/FacetedSearchStore';
import type {Facets, SearchFn, FacetedSearchStore} from 'store/FacetedSearchStore';
import {I18nProvider, type TranslateFn} from './I18nContext';

interface FacetedSearchParams<R> {
    facets: Facets;
    searchFn: SearchFn<R>;
    searchLabel?: string;
    pageSize?: number;
    translate?: TranslateFn;
    translations?: Record<string, string>;
    locale?: string | Intl.Locale;
    children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-explicit-any
export const FacetedSearchContext = createContext<FacetedSearchStore<any> | null>(null);

export default function FacetedSearch<R>({
                                             facets,
                                             searchFn,
                                             searchLabel,
                                             pageSize,
                                             translate,
                                             translations,
                                             locale,
                                             children
                                         }: FacetedSearchParams<R>) {
    const [store] = useState(() => createFacetedSearchStore(facets, searchFn, searchLabel, pageSize));

    return (
        <FacetedSearchContext.Provider value={store}>
            <I18nProvider translate={translate} translations={translations} locale={locale}>
                {children}
            </I18nProvider>
        </FacetedSearchContext.Provider>
    );
}
