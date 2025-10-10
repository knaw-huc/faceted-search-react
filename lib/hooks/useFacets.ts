import useSearchContext from './useSearchContext';
import {Facets, FacetValues, FacetValueLabels} from 'store/FacetedSearchStore';

type UseFacetsReturn = [
    Facets,
    FacetValues,
    Record<string, FacetValueLabels>,
    (facetKey: string, value: string) => void,
    (facetKey: string, value: string) => void,
    () => void,
];

export default function useFacets(): UseFacetsReturn {
    const facets = useSearchContext(s => s.facets);
    const facetValues = useSearchContext(s => s.state.facetValues);
    const valueLabels = useSearchContext(s => s.valueLabels);
    const addFacetValue = useSearchContext(s => s.addFacetValue);
    const removeFacetValue = useSearchContext(s => s.removeFacetValue);
    const clearFacetValues = useSearchContext(s => s.clearFacetValues);

    return [facets, facetValues, valueLabels, addFacetValue, removeFacetValue, clearFacetValues];
}
