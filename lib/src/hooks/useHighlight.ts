import {useMemo} from 'react';

export interface HighlightedText {
    text: string;
    spans: Offsets[];
}

export interface Offsets {
    start: number;
    end: number;
}

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default function useHighlight(text: string, startMarker: string, endMarker: string): HighlightedText {
    return useMemo(() => {
        if (!startMarker || !endMarker)
            throw new Error('Missing start and/or end marker');

        if (startMarker === endMarker)
            throw new Error('Start and end marker must be different');

        const spans: Offsets[] = [];
        const markersRegExp = new RegExp(`${escapeRegex(startMarker)}|${escapeRegex(endMarker)}`, 'g');

        let removed = 0, start = -1;
        for (const match of text.matchAll(markersRegExp)) {
            const offset = match.index - removed;
            removed += 1;

            if (match[0] === startMarker) {
                if (start !== -1)
                    throw new Error(`Nested start marker at ${offset}`);

                start = offset;
            } else {
                if (start === -1)
                    throw new Error(`End marker without start at ${offset}`);

                spans.push({start, end: offset});
                start = -1;
            }
        }

        if (start !== -1)
            throw new Error(`Unclosed start marker at ${start}`);

        return {text: text.replace(markersRegExp, ''), spans};
    }, [text, startMarker, endMarker]);
}
