import {FunctionComponent, Key} from 'react';
import {ResultsView} from '../results';
import {useSearchResults} from '../../hooks';

export default function HookedResultsView<R extends {}>({idKey, ResultComponent}: {
    idKey: keyof R,
    ResultComponent: FunctionComponent<R>
}) {
    return (
        <ResultsView>
            <ResultItems idKey={idKey} ResultComponent={ResultComponent}/>
        </ResultsView>
    );
}

function ResultItems<R extends {}>({idKey, ResultComponent}: {
    idKey: keyof R,
    ResultComponent: FunctionComponent<R>
}) {
    const results = useSearchResults<R>();
    return results.items.map(result => <ResultComponent key={result[idKey] as Key} {...result}/>);
}
