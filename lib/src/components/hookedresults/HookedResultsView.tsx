import {Fragment, useEffect} from 'react';
import {ResultsView} from 'components/results';
import useSearchState from 'hooks/useSearchState';
import useUpdateTotal from 'hooks/useUpdateTotal';

import type {Key, ReactNode} from 'react';
import type {SearchResults, SearchState} from 'store/FacetedSearchStore';

interface HookedResultsViewProps<C extends object> {
    useResults: (state: SearchState) => SearchResults<C>;
    id: (result: C) => Key;
    children: (result: C) => ReactNode;
}

export default function HookedResultsView<C extends object>({useResults, id, children}: HookedResultsViewProps<C>) {
    return (
        <ResultsView>
            <ResultItems useResults={useResults} id={id} children={children}/>
        </ResultsView>
    );
}

function ResultItems<C extends object>({useResults, id, children}: HookedResultsViewProps<C>) {
    const state = useSearchState();
    const updateTotal = useUpdateTotal();

    const {items, total} = useResults(state);

    useEffect(() => updateTotal(total), [updateTotal, total]);

    return items.map(result => (
        <Fragment key={id(result)}>
            {children(result)}
        </Fragment>
    ));
}
