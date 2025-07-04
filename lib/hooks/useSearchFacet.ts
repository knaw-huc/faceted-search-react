import useQuery from './useQuery';

interface useSearchFacetReturn {
    query?: string;
    onSearch: (query: string) => void;
    setSearchLabel: (label: string) => void;
}

export default function useSearchFacet(): useSearchFacetReturn {
    const [query, setQuery, _searchLabel, setSearchLabel] = useQuery();

    return {
        query,
        onSearch: setQuery,
        setSearchLabel
    };
}
