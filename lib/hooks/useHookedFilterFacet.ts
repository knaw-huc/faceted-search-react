import {useContext} from 'react';
import {Sort} from '../components';
import {FilterFacetContext} from 'context/FilterFacet';

interface useHookedFilterFacetReturn {
    selected: Set<string>;
    textFilter: string;
    sort: Sort;
}

export default function useHookedFilterFacet(): useHookedFilterFacetReturn {
    const filterFacetHook = useContext(FilterFacetContext);
    if (!filterFacetHook) {
        throw new Error('Missing FilterFacetContext.Provider in the tree');
    }

    return {selected: filterFacetHook.selected, textFilter: filterFacetHook.textFilter, sort: filterFacetHook.sort};
}
