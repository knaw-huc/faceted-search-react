import useSearchContext from './useSearchContext';

type UseQueryHook = [
    string,
    string | undefined,
    (query?: string) => void,
];

export default function useQuery(): UseQueryHook {
    const searchLabel = useSearchContext(s => s.searchLabel);
    const query = useSearchContext(s => s.state.query);
    const setQuery = useSearchContext(s => s.setQuery);


    return [searchLabel, query, setQuery];
}
