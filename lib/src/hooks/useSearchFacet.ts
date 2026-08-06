import useQuery from './useQuery';

interface useSearchFacetReturn {
    label: string;
    query?: string;
    onSearch: (query: string) => void;
}

export default function useSearchFacet(): useSearchFacetReturn {
    const [label, query, setQuery] = useQuery();

    return {
        label,
        query,
        onSearch: setQuery
    };
}
