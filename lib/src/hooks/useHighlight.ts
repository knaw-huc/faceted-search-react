import {useMemo} from 'react';
import getHighlight, {type HighlightedText} from 'utils/getHighlight';

export default function useHighlight(text: string, startMarker: string, endMarker: string): HighlightedText {
    return useMemo(() => getHighlight(text, startMarker, endMarker), [text, startMarker, endMarker]);
}
