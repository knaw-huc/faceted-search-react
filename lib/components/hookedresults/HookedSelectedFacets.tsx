import {SelectedFacets} from '../results';
import {useQuery, useFacets} from '../../hooks';

export default function HookedSelectedFacets() {
    const [label, query, setQuery] = useQuery();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [facets, facetValues, _addFacetValue, removeFacetValue, clearFacets] = useFacets();

    const selectedFacets = Object.entries(facetValues).flatMap(([name, values]) => values.flat().map(value => ({
        facet: facets[name].label,
        value: facets[name].getReadable ? facets[name].getReadable(value) : value,
        onRemove: () => removeFacetValue(name, value),
    })));

    if (query) {
        selectedFacets.unshift({
            facet: label,
            value: query,
            onRemove: () => setQuery(undefined),
        });
    }

    return (
        <SelectedFacets selectedFacets={selectedFacets} onClear={clearFacets}/>
    );
}
