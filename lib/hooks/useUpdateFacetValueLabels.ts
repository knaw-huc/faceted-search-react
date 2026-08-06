import {useCallback} from 'react';
import useSearchContext from './useSearchContext';
import type {FacetValueLabels} from 'store/FacetedSearchStore';

type UseUpdateFacetValueLabelsReturn = (valueLabels: FacetValueLabels) => void;

export default function useUpdateFacetValueLabels(facetKey: string): UseUpdateFacetValueLabelsReturn {
    const updateFacetValueLabels = useSearchContext(s => s.updateFacetValueLabels);
    return useCallback((valueLabels: FacetValueLabels) => updateFacetValueLabels(facetKey, valueLabels), [updateFacetValueLabels, facetKey]);
}
