import {Fragment} from 'react';
import type {Key, ReactNode} from 'react';
import {ResultsView} from 'components/results';
import useSearchResults from 'hooks/useSearchResults';

export default function HookedResultsView<C extends object>({id, children}: {
    id: (result: C) => Key,
    children: (result: C) => ReactNode
}) {
    return (
        <ResultsView>
            <ResultItems id={id} children={children}/>
        </ResultsView>
    );
}

function ResultItems<C extends object>({id, children}: {
    id: (result: C) => Key,
    children: (result: C) => ReactNode
}) {
    const results = useSearchResults<C>();
    return results.items.map(result => (
        <Fragment key={id(result)}>
            {children(result)}
        </Fragment>
    ));
}
