import useSearchContext from './useSearchContext';

type UseQueryReturn = [
    string,
    string | undefined,
    (query?: string) => void,
];

export default function useQuery(): UseQueryReturn {
    const searchLabel = useSearchContext(s => s.searchLabel);
    const query = useSearchContext(s => s.state.query);
    const setQuery = useSearchContext(s => s.setQuery);


    return [searchLabel, query, setQuery];
}
