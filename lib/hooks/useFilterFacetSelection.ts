import {startTransition, useMemo} from 'react';
import useFacet from './useFacet';

export interface UseFilterFacetSelectionReturn {
    selected: Set<string>;
    onSelect: (selected: Set<string>) => void;
}

export default function useFilterFacetSelection(facetKey: string): UseFilterFacetSelectionReturn {
    const {values, setValues} = useFacet(facetKey, []);

    const selected = useMemo(() => new Set(Array.isArray(values) ? values : [values]), [values]);
    const onSelect = (selected: Set<string>) => startTransition(() => setValues(Array.from(selected)));

    return {selected, onSelect};
}
