import {createStore} from 'zustand';
import {StoreApi} from 'zustand/vanilla';
import {subscribeWithSelector} from 'zustand/middleware'
import withUrlSync from './withUrlSync';

export type Facets = Record<string, Facet>;
export type FacetValues = Record<string, string[]>;
export type FacetValueLabels = Record<string, string>;

export interface SearchState {
    query?: string;
    facetValues: FacetValues;
    page: number;
    sort?: string;
}

export interface Facet {
    label: string;
    valueRenderer?: (value: string, valueLabel?: string) => string;
}

export interface SearchResults<R> {
    items: R[];
    total: number;
}

export type SearchFn<R> = (state: SearchState) => SearchResults<R> | Promise<SearchResults<R>>;

export type TranslateFn = (key: string, options?: Record<string, unknown>) => string;

export interface FacetedSearchStoreState<R> {
    state: SearchState;
    facets: Facets;
    searchLabel: string;
    valueLabels: Record<string, FacetValueLabels>;
    results: SearchResults<R> | Promise<SearchResults<R>>;
    searchFn: SearchFn<R>;
    translateFn: TranslateFn;
    pageSize: number;
    setQuery: (query?: string) => void;
    updateFacetValues: (facets: FacetValues) => void;
    setFacetValue: (facetKey: string, val: string | string[]) => void;
    addFacetValue: (facetKey: string, val: string) => void;
    removeFacetValue: (facetKey: string, val: string) => void;
    updateFacetValueLabels: (facetKey: string, valueLabels: Record<string, string>) => void;
    clearFacetValues: () => void;
    setPage: (page: number) => void;
    runSearch: () => void;
}

export type FacetedSearchStore<R> = StoreApi<FacetedSearchStoreState<R>>;

export default function createFacetedSearchStore<R>(facets: Facets, searchFn: SearchFn<R>, translateFn: TranslateFn, searchLabel?: string, pageSize?: number) {
    const store = createStore<FacetedSearchStoreState<R>>()(
        subscribeWithSelector(
            withUrlSync((set, get) => ({
                state: {
                    facetValues: {},
                    page: 1,
                },
                facets,
                valueLabels: Object.keys(facets).reduce<Record<string, FacetValueLabels>>((acc, key) => {
                    acc[key] = {};
                    return acc;
                }, {}),
                searchLabel: searchLabel || 'Search',
                results: {
                    items: [],
                    total: 0,
                },
                searchFn,
                translateFn,
                pageSize: pageSize || 10,

                setQuery: (query?: string) => {
                    query = query?.trim();
                    if (query === undefined || query === '') {
                        query = undefined;
                    }
                    set(s => ({state: {...s.state, query}}));
                },

                updateFacetValues: (facets: FacetValues) => {
                    for (const key of Object.keys(facets)) {
                        facets[key] = facets[key].filter(v => v !== '');

                        if (facets[key].length === 0) {
                            delete facets[key];
                        }
                    }

                    set(s => ({
                        state: {
                            query: s.state.query,
                            facetValues: {...facets},
                            page: 1,
                        },
                    }));
                },

                setFacetValue: (facetKey: string, val: string | string[]) => {
                    const {state: {facetValues}} = get();
                    get().updateFacetValues({...facetValues, [facetKey]: Array.isArray(val) ? val : [val]});
                },

                addFacetValue: (facetKey: string, val: string) => {
                    const {state: {facetValues}} = get();
                    const newFacets = {...facetValues};
                    if (!newFacets[facetKey].includes(val)) {
                        newFacets[facetKey].push(val);
                    }
                    get().updateFacetValues(newFacets);
                },

                removeFacetValue: (facetKey: string, val: string) => {
                    const {state: {facetValues}} = get();
                    const newFacets = {...facetValues};
                    newFacets[facetKey] = newFacets[facetKey].filter(v => v !== val);
                    if (newFacets[facetKey].length === 0) {
                        delete newFacets[facetKey];
                    }
                    get().updateFacetValues(newFacets);
                },

                updateFacetValueLabels: (facetKey: string, valueLabels: FacetValueLabels) => {
                    set(s => ({
                        valueLabels: {
                            ...s.valueLabels,
                            [facetKey]: valueLabels
                        }
                    }));
                },

                clearFacetValues: () => {
                    get().updateFacetValues({});
                },

                setPage: (page) => {
                    set(s => ({state: {...s.state, page}}));
                },

                runSearch: () => {
                    const {state, searchFn} = get();
                    set({results: searchFn(state)});
                },
            }))
        )
    );

    store.subscribe(state => state.state, (state, prevState) => {
        if (JSON.stringify(state) !== JSON.stringify(prevState)) {
            store.getState().runSearch();
        }
    })

    store.getState().runSearch();

    return store;
}
