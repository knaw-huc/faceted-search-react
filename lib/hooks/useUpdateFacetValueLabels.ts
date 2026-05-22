import useSearchContext from './useSearchContext';
import type {FacetValueLabels} from 'store/FacetedSearchStore';

type useUpdateFacetValueLabelsReturn = (valueLabels: FacetValueLabels) => void;

export default function useUpdateFacetValueLabels(facetKey: string): useUpdateFacetValueLabelsReturn {
    const updateFacetValueLabels = useSearchContext(s => s.updateFacetValueLabels);

    return (valueLabels: FacetValueLabels) => updateFacetValueLabels(facetKey, valueLabels);
}
