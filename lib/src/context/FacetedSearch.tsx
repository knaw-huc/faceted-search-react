import {createContext, useState, type ReactNode} from 'react';
import createFacetedSearchStore from 'store/FacetedSearchStore';
import type {Facets, FacetedSearchStore} from 'store/FacetedSearchStore';
import {I18nProvider, type TranslateFn} from './I18nContext';

interface FacetedSearchParams {
    facets: Facets;
    searchLabel?: string;
    pageSize?: number;
    syncPageToUrl?: boolean;
    translate?: TranslateFn;
    translations?: Record<string, string>;
    locale?: string | Intl.Locale;
    children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FacetedSearchContext = createContext<FacetedSearchStore | null>(null);

export default function FacetedSearch({
                                          facets,
                                          searchLabel,
                                          pageSize,
                                          syncPageToUrl,
                                          translate,
                                          translations,
                                          locale,
                                          children
                                      }: FacetedSearchParams) {
    const [store] = useState(() => createFacetedSearchStore(facets, searchLabel, pageSize, syncPageToUrl));

    return (
        <FacetedSearchContext.Provider value={store}>
            <I18nProvider translate={translate} translations={translations} locale={locale}>
                {children}
            </I18nProvider>
        </FacetedSearchContext.Provider>
    );
}
