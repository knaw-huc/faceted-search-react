import useSearchContext from './useSearchContext';
import {SearchState} from '../store';

export default function useSearchState(): SearchState {
    return useSearchContext(s => s.state);
}
