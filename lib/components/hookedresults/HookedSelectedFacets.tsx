import {Suspense, use} from 'react';
import {SelectedFacets} from 'components/results';
import Spinner from 'components/utils/Spinner';
import useQuery from 'hooks/useQuery';
import useFacets from 'hooks/useFacets';

const PromisedLabel = ({label}: { label: string | Promise<string> }) =>
    label instanceof Promise ? use(label) : label;

export default function HookedSelectedFacets() {
    const [label, query, setQuery] = useQuery();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [facets, facetValues, _addFacetValue, removeFacetValue, clearFacets] = useFacets();

    const selectedFacets = Object.entries(facetValues).flatMap(([name, values]) => values.flat().map(value => ({
        itemKey: `${name}__${value}`,
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
            itemKey: 'q',
            name: label,
            label: query,
            onRemove: () => setQuery(undefined),
        });
    }

    return (
        <SelectedFacets selectedFacets={selectedFacets} onClear={clearFacets}/>
    );
}
