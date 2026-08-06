import {type ReactNode, startTransition, useMemo} from 'react';
import useQuery from 'hooks/useQuery';
import useFacets from 'hooks/useFacets';

type UseSelectedFacetsReturn = [
    SelectedFacet[],
    () => void,
];

export interface SelectedFacet {
    itemKey: string;
    name?: string;
    label: ReactNode;
    onRemove: () => void;
}

export default function useSelectedFacets(includeQuery: boolean = true): UseSelectedFacetsReturn {
    const [label, query, setQuery] = useQuery();
    const {facets, facetValues, valueLabels: facetValueLabels, removeFacetValue, clearFacets} = useFacets();

    return [
        useMemo(() => {
            const selectedFacets = Object.entries(facetValues).flatMap(([facetKey, values]) =>
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
            );

            if (includeQuery && query) {
                selectedFacets.unshift({
                    itemKey: 'q',
                    name: label,
                    label: query,
                    onRemove: () => startTransition(() => setQuery(undefined)),
                });
            }

            return selectedFacets;
        }, [includeQuery, label, query, setQuery, facets, facetValues, facetValueLabels, removeFacetValue]),
        clearFacets
    ];
}
