import {StateCreator} from 'zustand';
import {FacetedSearchStoreState, FacetValues, SearchState} from './FacetedSearchStore.ts';

type SearchStoreStateCreator<R> = StateCreator<FacetedSearchStoreState<R>>;

export default function withUrlSync<R>(config: SearchStoreStateCreator<R>): SearchStoreStateCreator<R> {
    return (set, get, api) => {
        const store = config(partial => {
            if (typeof partial === 'function') {
                set((prev) => {
                    const before = prev.state;
                    const result =
                        (partial as (state: FacetedSearchStoreState<R>) => Partial<FacetedSearchStoreState<R>>)(prev);
                    const after = result.state ?? before;

                    if (!areStatesEqual(before, after)) {
                        updateSearchParamsFromSearchState(after);
                    }

                    return result;
                });
            }
            else {
                const before = get().state;
                const after = partial.state ?? before;

                if (!areStatesEqual(before, after)) {
                    updateSearchParamsFromSearchState(after);
                }

                set(partial);
            }
        }, get, api);

        store.state = parseSearchParamsToSearchState();

        window.addEventListener('popstate', () => {
            const newState = parseSearchParamsToSearchState();
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

function updateSearchParamsFromSearchState(state: SearchState) {
    const params = new URLSearchParams();

    params.set('page', String(state.page));
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

function parseSearchParamsToSearchState(): SearchState {
    const params = new URLSearchParams(window.location.search);
    const facetValues: FacetValues = {};

    params.forEach((value, key) => {
        if (key === 'page' || key === 'sort') {
            return;
        }

        if (facetValues[key]) {
            facetValues[key].push(value);
        }
        else {
            facetValues[key] = [value];
        }
    });

    return {
        page: parseInt(params.get('page') || '1', 10),
        sort: params.get('sort') || undefined,
        facetValues,
    };
}
