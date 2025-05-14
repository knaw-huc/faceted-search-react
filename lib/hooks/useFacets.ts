import useSearchContext from './useSearchContext';
import {Facets, FacetValues} from '../store';

type UseFacetsHooks = [
    Facets,
    FacetValues,
    (facetKey: string, value: string) => void,
    (facetKey: string, value: string) => void,
    () => void,
];

export default function useFacets(): UseFacetsHooks {
    const facets = useSearchContext(s => s.facets);
    const facetValues = useSearchContext(s => s.state.facetValues);
    const addFacetValue = useSearchContext(s => s.addFacetValue);
    const removeFacetValue = useSearchContext(s => s.removeFacetValue);
    const clearFacetValues = useSearchContext(s => s.clearFacetValues);

    return [facets, facetValues, addFacetValue, removeFacetValue, clearFacetValues];
}
