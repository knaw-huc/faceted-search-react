import {createStore} from 'zustand';
import type {StoreApi} from 'zustand/vanilla';
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

export interface FacetedSearchStoreState {
    state: SearchState;
    facets: Facets;
    searchLabel: string;
    valueLabels: Record<string, FacetValueLabels>;
    pageSize: number;
    total: number;
    setQuery: (query?: string) => void;
    updateFacetValues: (facets: FacetValues) => void;
    setFacetValue: (facetKey: string, val: string | string[]) => void;
    addFacetValue: (facetKey: string, val: string) => void;
    removeFacetValue: (facetKey: string, val: string) => void;
    updateFacetValueLabels: (facetKey: string, valueLabels: Record<string, string>) => void;
    clearFacetValues: () => void;
    clearFacets: () => void;
    setPage: (page: number) => void;
    setTotal: (total: number) => void;
}

export type FacetedSearchStore = StoreApi<FacetedSearchStoreState>;

export default function createFacetedSearchStore(
    facets: Facets,
    searchLabel?: string,
    pageSize?: number,
    syncPageToUrl?: boolean,
) {
    return createStore<FacetedSearchStoreState>()(
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
            pageSize: pageSize || 10,
            total: 0,

            setQuery: (query?: string) => {
                query = query?.trim();
                if (query === undefined || query === '') {
                    query = undefined;
                }
                set(s => {
                    if (s.state.query === query)
                        return s;
                    return {state: {...s.state, query, page: 1}};
                });
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
                set(s => {
                    const current = s.valueLabels[facetKey];
                    const merged = {...current, ...valueLabels};
                    if (current && JSON.stringify(current) === JSON.stringify(merged))
                        return s;
                    return {valueLabels: {...s.valueLabels, [facetKey]: merged}};
                });
            },

            clearFacetValues: () => {
                get().updateFacetValues({});
            },

            clearFacets: () => {
                get().setQuery(undefined);
                get().clearFacetValues();
            },

            setPage: (page) => {
                set(s => ({state: {...s.state, page}}));
            },

            setTotal: (total: number) => {
                set(s => s.total === total ? s : {total});
            },
        }), {syncPageToUrl})
    );
}
