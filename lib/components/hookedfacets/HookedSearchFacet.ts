import {SearchFacet} from '../facets';
import useSearchFacet from '../../hooks/useSearchFacet.ts';

interface HookedSearchFacetProps {
    facetKey: string;
}

export default function HookedSearchFacet({facetKey}: HookedSearchFacetProps) {
    const {query, onSearch} = useSearchFacet(facetKey);

    return SearchFacet({
        initialQuery: query,
        onSearch
    });
}
