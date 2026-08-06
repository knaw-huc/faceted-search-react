import useSearchContext from './useSearchContext';

interface UseFacetReturn {
    label: string;
    values: string | string[];
    setValues: (value: string | string[]) => void;
}

export default function useFacet(facetKey: string, defaultValue: string | string[]): UseFacetReturn {
    const facet = useSearchContext(s => s.facets[facetKey]);
    const facetValues = useSearchContext(s => s.state.facetValues);
    const setFacetValue = useSearchContext(s => s.setFacetValue);

    return {
        label: facet?.label || facetKey,
        values: facetValues[facetKey] || (Array.isArray(defaultValue) ? defaultValue : [defaultValue]),
        setValues: (value: string | string[]) => setFacetValue(facetKey, value),
    };
}
