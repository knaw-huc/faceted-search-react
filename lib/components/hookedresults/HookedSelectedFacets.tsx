import {SelectedFacets} from 'components/results';
import useSelectedFacets from 'hooks/useSelectedFacets';

export default function HookedSelectedFacets() {
    const [selectedFacets, clearFacets] = useSelectedFacets();

    return (
        <SelectedFacets selectedFacets={selectedFacets} onClear={clearFacets}/>
    );
}
