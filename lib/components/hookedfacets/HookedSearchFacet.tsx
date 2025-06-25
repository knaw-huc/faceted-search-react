import {SearchFacet} from '../facets';
import useSearchFacet from '../../hooks/useSearchFacet';

interface HookedSearchFacetProps {
    facetKey: string;
    label: string;
}

export default function HookedSearchFacet({facetKey, label}: HookedSearchFacetProps) {
    const {query, onSearch} = useSearchFacet(facetKey, label);

    return (
        <SearchFacet initialQuery={query} onSearch={onSearch}/>
    );
}
