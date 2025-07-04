import {SearchFacet} from '../facets';
import {useSearchFacet} from '../../hooks';

interface HookedSearchFacetProps {
    label: string;
}

export default function HookedSearchFacet({label}: HookedSearchFacetProps) {
    const {query, onSearch, setSearchLabel} = useSearchFacet();

    setSearchLabel(label);

    return (
        <SearchFacet initialQuery={query || ''} onSearch={onSearch}/>
    );
}
