import {use} from 'react';
import {SearchResults} from '../store/FacetedSearchStore.ts';
import useSearchContext from './useSearchContext.ts';

export default function useSearchResults<R>(): SearchResults<R> {
    return use(useSearchContext<R, Promise<SearchResults<R>>>(s => s.results));
}
