import useSearchContext from './useSearchContext';

type UseQueryHook = [
    string | undefined,
    (query?: string) => void,
    string,
    (label: string) => void
];

export default function useQuery(): UseQueryHook {
    const query = useSearchContext(s => s.state.query);
    const setQuery = useSearchContext(s => s.setQuery);
    const searchLabel = useSearchContext(s => s.searchLabel);
    const setSearchLabel = useSearchContext(s => s.setSearchLabel);

    return [query, setQuery, searchLabel, setSearchLabel];
}
