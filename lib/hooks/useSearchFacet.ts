import useFacet from './useFacet';

interface useSearchFacetReturn {
    query: string;
    onSearch: (query: string) => void;
}

export default function useSearchFacet(facetKey: string, label: string): useSearchFacetReturn {
    const [values, setValues] = useFacet(facetKey, label, null,'');

    return {
        query: Array.isArray(values) ? values[0] : values,
        onSearch: (query: string) => setValues(query.trim()),
    };
}
