import {Suspense, use} from 'react';
import {SelectedFacets} from '../results';
import {useQuery, useFacets} from '../../hooks';
import Spinner from '../utils/Spinner.tsx';

const PromisedLabel = ({label}: { label: Promise<string> }) => use(label);

export default function HookedSelectedFacets() {
    const [label, query, setQuery] = useQuery();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [facets, facetValues, _addFacetValue, removeFacetValue, clearFacets] = useFacets();

    const selectedFacets = Object.entries(facetValues).flatMap(([name, values]) => values.flat().map(value => ({
        key: `${name}__${value}`,
        name: facets[name].label,
        label: facets[name].getReadable ? (
            <Suspense fallback={<Spinner/>}>
                <PromisedLabel label={facets[name].getReadable(value)}/>
            </Suspense>
        ) : value,
        onRemove: () => removeFacetValue(name, value),
    })));

    if (query) {
        selectedFacets.unshift({
            key: 'q',
            name: label,
            label: query,
            onRemove: () => setQuery(undefined),
        });
    }

    return (
        <SelectedFacets selectedFacets={selectedFacets} onClear={clearFacets}/>
    );
}
