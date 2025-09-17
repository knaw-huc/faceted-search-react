import {FunctionComponent, Key} from 'react';
import {ResultsView} from 'components/results';
import useSearchResults from 'hooks/useSearchResults';

export default function HookedResultsView<R extends object, C extends object>({idKey, mapper, ResultComponent}: {
    idKey: keyof R,
    mapper?: (result: R) => C,
    ResultComponent: FunctionComponent<C>
}) {
    return (
        <ResultsView>
            <ResultItems idKey={idKey} mapper={mapper} ResultComponent={ResultComponent}/>
        </ResultsView>
    );
}

function ResultItems<R extends object, C extends object>({idKey, mapper, ResultComponent}: {
    idKey: keyof R,
    mapper?: (result: R) => C,
    ResultComponent: FunctionComponent<C>
}) {
    const results = useSearchResults<R>();

    return results.items.map(result => {
        const params = mapper ? mapper(result) : result as unknown as C;

        return (
            <ResultComponent key={result[idKey] as Key} {...params}/>
        );
    });
}
