import {createStore} from 'zustand';
import {StoreApi} from 'zustand/vanilla';
import {querystring} from 'zustand-querystring';

export type FacetValues = Record<string, string | string[]>;

export interface SearchState {
    facets: FacetValues;
    page: number;
    sort?: string;
}

export interface SearchResults<R> {
    items: R[];
    total: number;
}

export type SearchFn<R> = (state: SearchState) => Promise<SearchResults<R>>;

export interface FacetedSearchStoreState<R> {
    state: SearchState;
    results: Promise<SearchResults<R>>;
    searchFn: SearchFn<R>;
    pageSize: number;
    updateFacets: (facets: FacetValues) => void;
    setPage: (page: number) => void;
    runSearch: () => void;
}

export type FacetedSearchStore<R> = StoreApi<FacetedSearchStoreState<R>>;

export default function createFacetedSearchStore<R>(searchFn: SearchFn<R>, pageSize?: number) {
    return createStore<FacetedSearchStoreState<R>>()(
        querystring((set, get) => ({
            state: {
                facets: {},
                page: 1,
            },
            results: new Promise(() => <R>({
                items: [],
                total: 0,
            })),
            searchFn,
            pageSize: pageSize || 10,

            updateFacets: (facets: FacetValues) => {
                set((s) => ({
                    state: {
                        facets: {...s.state.facets, ...facets},
                        page: 1,
                    },
                }));
                get().runSearch();
            },

            setPage: (page) => {
                set((s) => ({state: {...s.state, page}}));
                get().runSearch();
            },

            runSearch: () => {
                const {state, searchFn} = get();
                set({results: searchFn(state)});
            },
        }), {
            select(_pathname) {
                return {
                    state: {
                        facets: true,
                        page: true,
                        sort: true,
                    },
                }
            },
        })
    );
}
