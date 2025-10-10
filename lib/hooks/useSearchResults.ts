import {use} from 'react';
import {SearchResults} from 'store/index';
import useSearchContext from './useSearchContext';

export default function useSearchResults<R>(): SearchResults<R> {
    const results = useSearchContext<R, SearchResults<R> | Promise<SearchResults<R>>>(s => s.results);
    return results instanceof Promise ? use(results) : results;
}
