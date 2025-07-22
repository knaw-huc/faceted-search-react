import {SearchFacet} from '../facets';
import {useSearchFacet} from '../../hooks';

export default function HookedSearchFacet() {
    const {query, onSearch} = useSearchFacet();

    return (
        <SearchFacet initialQuery={query || ''} onSearch={onSearch}/>
    );
}
