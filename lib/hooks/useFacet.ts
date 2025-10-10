import useSearchContext from './useSearchContext';

type UseFacetReturn = [
    string,
    string | string[],
    (value: string | string[]) => void
];

export default function useFacet(facetKey: string, defaultValue: string | string[]): UseFacetReturn {
    const facet = useSearchContext(s => s.facets[facetKey]);
    const facetValues = useSearchContext(s => s.state.facetValues);
    const setFacetValue = useSearchContext(s => s.setFacetValue);

    return [
        facet?.label || facetKey,
        facetValues[facetKey] || (Array.isArray(defaultValue) ? defaultValue : [defaultValue]),
        (value: string | string[]) => setFacetValue(facetKey, value)
    ];
}
