import useSearchContext from './useSearchContext.ts';

type UseFacetHook = [
    string | string[],
    (value: string | string[]) => void
];

export default function useFacet(facetKey: string): UseFacetHook {
    const updateFacets = useSearchContext(s => s.updateFacets);
    const value = useSearchContext(s => s.state.facets[facetKey]);
    const setValue = (val: string | string[]) => updateFacets({[facetKey]: val});

    return [value, setValue];
}
