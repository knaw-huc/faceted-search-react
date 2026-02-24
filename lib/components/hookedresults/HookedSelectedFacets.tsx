import {startTransition, useMemo} from 'react';
import {SelectedFacets} from 'components/results';
import useQuery from 'hooks/useQuery';
import useFacets from 'hooks/useFacets';

export default function HookedSelectedFacets() {
    const [label, query, setQuery] = useQuery();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [facets, facetValues, facetValueLabels, _addFacetValue, removeFacetValue, clearFacets] = useFacets();

    const selectedFacets = useMemo(() => Object.entries(facetValues).flatMap(([facetKey, values]) =>
        values.flat().map(value => {
            const facet = facets[facetKey];
            const valueLabels = facetValueLabels[facetKey];

            const label = facet.valueRenderer
                ? facet.valueRenderer(value, valueLabels ? valueLabels[value] : undefined)
                : (valueLabels ? valueLabels[value] || value : value);

            return {
                itemKey: `${facetKey}__${value}`,
                name: facet?.label || facetKey,
                label,
                onRemove: () => startTransition(() => removeFacetValue(facetKey, value)),
            };
        })
    ), [facets, facetValueLabels, facetValues, removeFacetValue]);

    if (query) {
        selectedFacets.unshift({
            itemKey: 'q',
            name: label,
            label: query,
            onRemove: () => startTransition(() => setQuery(undefined)),
        });
    }

    return (
        <SelectedFacets selectedFacets={selectedFacets} onClear={clearFacets} />
    );
}
