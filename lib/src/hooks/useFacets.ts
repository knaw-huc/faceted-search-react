import useSearchContext from './useSearchContext';
import type {Facets, FacetValues, FacetValueLabels} from 'store/FacetedSearchStore';

interface UseFacetsReturn {
    facets: Facets;
    facetValues: FacetValues;
    valueLabels: Record<string, FacetValueLabels>;
    addFacetValue: (facetKey: string, value: string) => void;
    removeFacetValue: (facetKey: string, value: string) => void;
    clearFacets: () => void;
}

export default function useFacets(): UseFacetsReturn {
    const facets = useSearchContext(s => s.facets);
    const facetValues = useSearchContext(s => s.state.facetValues);
    const valueLabels = useSearchContext(s => s.valueLabels);
    const addFacetValue = useSearchContext(s => s.addFacetValue);
    const removeFacetValue = useSearchContext(s => s.removeFacetValue);
    const clearFacets = useSearchContext(s => s.clearFacets);

    return {facets, facetValues, valueLabels, addFacetValue, removeFacetValue, clearFacets};
}
