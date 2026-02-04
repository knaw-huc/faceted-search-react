import {SearchFacet} from 'components/facets';
import useSearchFacet from 'hooks/useSearchFacet';

export default function HookedSearchFacet() {
    const {query, onSearch} = useSearchFacet();

    return (
        <SearchFacet initialQuery={query || ''} onSearch={onSearch} />
    );
}
