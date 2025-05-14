import {createStore} from 'zustand';
import {StoreApi} from 'zustand/vanilla';
import withUrlSync from './withUrlSync.ts';

export type Facets = Record<string, Facet>;
export type FacetValues = Record<string, string[]>;

export interface SearchState {
    facetValues: FacetValues;
    page: number;
    sort?: string;
}

export interface Facet {
    label: string;
    getReadable: ((value: string) => string) | null;
}

export interface SearchResults<R> {
    items: R[];
    total: number;
}

export type SearchFn<R> = (state: SearchState) => SearchResults<R> | Promise<SearchResults<R>>;

export interface FacetedSearchStoreState<R> {
    state: SearchState;
    facets: Facets;
    results: SearchResults<R> | Promise<SearchResults<R>>;
    searchFn: SearchFn<R>;
    pageSize: number;
    registerFacets: (facets: Facets) => void;
    updateFacetValues: (facets: FacetValues) => void;
    setFacetValue: (facetKey: string, val: string | string[]) => void;
    addFacetValue: (facetKey: string, val: string) => void;
    removeFacetValue: (facetKey: string, val: string) => void;
    clearFacetValues: () => void;
    setPage: (page: number) => void;
    runSearch: () => void;
}

export type FacetedSearchStore<R> = StoreApi<FacetedSearchStoreState<R>>;

export default function createFacetedSearchStore<R>(searchFn: SearchFn<R>, pageSize?: number) {
    return createStore<FacetedSearchStoreState<R>>()(
        withUrlSync((set, get) => ({
            state: {
                facetValues: {},
                page: 1,
            },
            facets: {},
            results: {
                items: [],
                total: 0,
            },
            searchFn,
            pageSize: pageSize || 10,

            registerFacets: (facets: Facets) => {
                set({facets: {...facets}});
            },

            updateFacetValues: (facets: FacetValues) => {
                set({
                    state: {
                        facetValues: {...facets},
                        page: 1,
                    },
                });
                get().runSearch();
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

            clearFacetValues: () => {
                get().updateFacetValues({});
            },

            setPage: (page) => {
                set((s) => ({state: {...s.state, page}}));
                get().runSearch();
            },

            runSearch: () => {
                const {state, searchFn} = get();
                set({results: searchFn(state)});
            },
        }))
    );
}
