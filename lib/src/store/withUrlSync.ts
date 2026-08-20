import type {StateCreator} from 'zustand';
import type {FacetedSearchStoreState, FacetValues, SearchState} from './FacetedSearchStore';

type SearchStoreStateCreator = StateCreator<FacetedSearchStoreState>;

export interface UrlSyncOptions {
    syncPageToUrl?: boolean;
}

export default function withUrlSync(config: SearchStoreStateCreator, {syncPageToUrl = true}: UrlSyncOptions = {}): SearchStoreStateCreator {
    return (set, get, api) => {
        const store = config(partial => {
            if (typeof partial === 'function') {
                set((prev) => {
                    const before = prev.state;
                    const result =
                        (partial as (state: FacetedSearchStoreState) => Partial<FacetedSearchStoreState>)(prev);
                    const after = result.state ?? before;

                    if (!areStatesEqual(before, after)) {
                        updateSearchParamsFromSearchState(after, syncPageToUrl);
                    }

                    return result;
                });
            }
            else {
                const before = get().state;
                const after = partial.state ?? before;

                if (!areStatesEqual(before, after)) {
                    updateSearchParamsFromSearchState(after, syncPageToUrl);
                }

                set(partial);
            }
        }, get, api);

        store.state = parseSearchParamsToSearchState(syncPageToUrl);

        window.addEventListener('popstate', () => {
            const newState = parseSearchParamsToSearchState(syncPageToUrl);
            const current = get().state;
            if (!areStatesEqual(current, newState)) {
                set({state: newState});
            }
        });

        return store;
    };
}

function areStatesEqual(a: SearchState, b: SearchState) {
    return JSON.stringify(a) === JSON.stringify(b);
}

function updateSearchParamsFromSearchState(state: SearchState, syncPageToUrl: boolean) {
    const params = new URLSearchParams();

    if (syncPageToUrl && state.page > 1) {
        params.set('page', String(state.page));
    }
    if (state.query) {
        params.set('q', state.query);
    }
    if (state.sort) {
        params.set('sort', state.sort);
    }

    for (const [key, value] of Object.entries(state.facetValues)) {
        for (const v of (Array.isArray(value) ? value : [value])) {
            params.append(key, v);
        }
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', newUrl);
}

function parseSearchParamsToSearchState(syncPageToUrl: boolean): SearchState {
    const params = new URLSearchParams(window.location.search);
    const facetValues: FacetValues = {};

    for (const [key, value] of params.entries()) {
        if (!['q', 'page', 'sort'].includes(key)) {
            if (facetValues[key]) {
                facetValues[key].push(value);
            }
            else {
                facetValues[key] = [value];
            }
        }
    }

    return {
        query: params.get('q') || undefined,
        page: syncPageToUrl ? parseInt(params.get('page') || '1', 10) : 1,
        sort: params.get('sort') || undefined,
        facetValues,
    };
}
