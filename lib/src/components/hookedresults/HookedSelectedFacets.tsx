import {SelectedFacets} from 'components/results';
import useSelectedFacets from 'hooks/useSelectedFacets';

export default function HookedSelectedFacets({includeQuery}: { includeQuery?: boolean }) {
    const [selectedFacets, clearFacets] = useSelectedFacets(includeQuery);

    return (
        <SelectedFacets selectedFacets={selectedFacets} onClear={clearFacets}/>
    );
}
