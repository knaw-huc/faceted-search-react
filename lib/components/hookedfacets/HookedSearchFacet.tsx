import {SearchFacet} from 'components/facets';
import useSearchFacet from 'hooks/useSearchFacet';
import useTranslate from "../../hooks/useTranslate.ts";

export default function HookedSearchFacet() {
    const {query, onSearch} = useSearchFacet();
    const translate = useTranslate();

    return (
        <SearchFacet initialQuery={query || ''} onSearch={onSearch} translate={translate} />
    );
}
