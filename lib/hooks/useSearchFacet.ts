import useFacet from './useFacet.ts';

interface useSearchFacetReturn {
    query: string;
    onSearch: (query: string) => void;
}

export default function useSearchFacet(facetKey: string): useSearchFacetReturn {
    const [values, setValues] = useFacet(facetKey);

    return {
        query: Array.isArray(values) ? values[0] : values,
        onSearch: (query: string) => setValues(query.trim()),
    };
}
