import useSearchContext from './useSearchContext';

type UseFacetHook = [
    string,
    string | string[],
    (value: string | string[]) => void
];

export default function useFacet(facetKey: string, defaultValue: string | string[]): UseFacetHook {
    const facets = useSearchContext(s => s.facets);
    const facetValues = useSearchContext(s => s.state.facetValues);
    const setFacetValue = useSearchContext(s => s.setFacetValue);

    return [
        facets[facetKey]?.label || facetKey,
        facetValues[facetKey] || (Array.isArray(defaultValue) ? defaultValue : [defaultValue]),
        (value: string | string[]) => setFacetValue(facetKey, value)
    ];
}
