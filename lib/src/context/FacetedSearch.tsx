import {createContext, useEffect, useState, type ReactNode} from 'react';
import createFacetedSearchStore from 'store/FacetedSearchStore';
import areStatesEqual from 'store/areStatesEqual.ts';
import type {Facets, FacetedSearchStore, SearchState} from 'store/FacetedSearchStore';
import {I18nProvider, type TranslateFn} from './I18nContext';

interface FacetedSearchParams {
    facets: Facets;
    searchLabel?: string;
    pageSize?: number;
    syncPageToUrl?: boolean;
    translate?: TranslateFn;
    translations?: Record<string, string>;
    locale?: string | Intl.Locale;
    state?: SearchState;
    onStateChange?: (state: SearchState) => void;
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
                                          state,
                                          onStateChange,
                                          children
                                      }: FacetedSearchParams) {
    const [store] = useState(() => createFacetedSearchStore(facets, searchLabel, pageSize, syncPageToUrl, state));

    useEffect(() => {
        if (state && !areStatesEqual(store.getState().state, state)) {
            store.setState({state});
        }
    }, [store, state]);

    useEffect(() => {
        if (!state || !onStateChange) {
            return;
        }
        return store.subscribe(({state: current}) => {
            if (!areStatesEqual(current, state)) {
                onStateChange(current);
            }
        });
    }, [store, state, onStateChange]);

    return (
        <FacetedSearchContext.Provider value={store}>
            <I18nProvider translate={translate} translations={translations} locale={locale}>
                {children}
            </I18nProvider>
        </FacetedSearchContext.Provider>
    );
}
