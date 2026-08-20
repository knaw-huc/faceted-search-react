import {Fragment, Suspense, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ResultsView} from 'components/results';
import ResultsLoading from 'components/utils/ResultsLoading';
import usePagination from 'hooks/usePagination';
import useSearchState from 'hooks/useSearchState';
import useUpdateTotal from 'hooks/useUpdateTotal';

import type {SearchState} from 'store/FacetedSearchStore';
import type {SearchResults, HookedResultsViewProps} from './HookedResultsView';

export interface HookedInfiniteResultsViewProps<C extends object> extends HookedResultsViewProps<C> {
    rootMargin?: string;
}

export default function HookedInfiniteResultsView<C extends object>({
                                                                        useResults,
                                                                        id,
                                                                        children,
                                                                        rootMargin = '0px',
                                                                    }: HookedInfiniteResultsViewProps<C>) {
    const state = useSearchState();
    const {pageSize, setPage} = usePagination();
    const updateTotal = useUpdateTotal();

    const identity = useMemo(
        () => JSON.stringify({query: state.query, facetValues: state.facetValues, sort: state.sort}),
        [state.facetValues, state.query, state.sort]
    );
    const [loaded, setLoaded] = useState<{ identity: string; page: number; total: number } | null>(null);
    const sentinelRef = useRef<HTMLLIElement>(null);
    const advancingRef = useRef(false);

    const loadedPage = loaded?.identity === identity ? loaded.page : 0;
    const total = loaded?.identity === identity ? loaded.total : 0;
    const hasMore = loadedPage === state.page && state.page * pageSize < total;

    useEffect(() => {
        advancingRef.current = false;
    }, [identity]);

    const advance = useCallback(() => {
        if (!hasMore || advancingRef.current)
            return;

        advancingRef.current = true;
        setPage(state.page + 1);
    }, [hasMore, setPage, state.page]);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel || !hasMore)
            return;

        const observer = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting))
                advance();
        }, {rootMargin});
        observer.observe(sentinel);

        return () => observer.disconnect();
    }, [advance, hasMore, rootMargin]);

    const handleResolved = useCallback((page: number, result: SearchResults<C>) => {
        advancingRef.current = false;
        setLoaded(current =>
            current?.identity === identity && current.page === page && current.total === result.total
                ? current
                : {identity, page, total: result.total}
        );
        updateTotal(result.total);
    }, [identity, updateTotal]);

    return (
        <ResultsView>
            {Array.from({length: state.page}, (_, idx) => (
                <ResultPage key={`${identity}:${idx + 1}`}
                            useResults={useResults} id={id} state={{...state, page: idx + 1}}
                            children={children} onResolved={handleResolved}/>
            ))}

            {hasMore && <li className="col-span-full h-px" aria-hidden ref={sentinelRef}/>}
        </ResultsView>
    );
}

function ResultPage<C extends object>({useResults, id, state, onResolved, children}: HookedResultsViewProps<C> & {
    state: SearchState;
    onResolved: (page: number, result: SearchResults<C>) => void
}) {
    return (
        <Suspense fallback={<ResultsLoading/>}>
            <ResultPageItems useResults={useResults} id={id} children={children} state={state} onResolved={onResolved}/>
        </Suspense>
    );
}

function ResultPageItems<C extends object>({useResults, id, state, onResolved, children}: HookedResultsViewProps<C> & {
    state: SearchState;
    onResolved: (page: number, result: SearchResults<C>) => void
}) {
    const {items, total} = useResults(state);

    useEffect(() => onResolved(state.page, {items, total}), [onResolved, items, total, state.page]);

    return items.map(item => (
        <Fragment key={id(item)}>
            {children(item)}
        </Fragment>
    ));
}
