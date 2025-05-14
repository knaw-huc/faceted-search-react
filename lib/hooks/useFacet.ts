import useSearchContext from './useSearchContext';

type UseFacetHook = [
    string | string[],
    (value: string | string[]) => void
];

export default function useFacet(facetKey: string, label: string, getReadable: ((value: string) => string) | null, defaultValue: string | string[]): UseFacetHook {
    const facets = useSearchContext(s => s.facets);
    const facetValues = useSearchContext(s => s.state.facetValues);
    const registerFacets = useSearchContext(s => s.registerFacets);
    const setFacetValue = useSearchContext(s => s.setFacetValue);

    if (!(facetKey in facets)) {
        registerFacets({
            ...facets,
            [facetKey]: {label, getReadable}
        });
    }

    return [
        facetValues[facetKey] || (Array.isArray(defaultValue) ? defaultValue : [defaultValue]),
        (value: string | string[]) => setFacetValue(facetKey, value)
    ];
}
