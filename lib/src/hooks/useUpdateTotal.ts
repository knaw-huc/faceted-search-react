import useSearchContext from './useSearchContext';

export default function useUpdateTotal(): (total: number) => void {
    return useSearchContext(s => s.setTotal);
}
