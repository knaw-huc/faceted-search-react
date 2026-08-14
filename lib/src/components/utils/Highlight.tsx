import {type ReactNode, Fragment, useMemo} from 'react';
import useHighlight from 'hooks/useHighlight';

export interface HighlightProps {
    text: string;
    startMarker: string;
    endMarker: string;
    render: (text: string, index: number) => ReactNode;
}

export default function Highlight({text, startMarker, endMarker, render}: HighlightProps) {
    const highlight = useHighlight(text, startMarker, endMarker);

    const content = useMemo(() => {
        if (highlight.spans.length === 0)
            return highlight.text;

        const result: ReactNode[] = [];

        let cursor = 0;
        for (let index = 0; index < highlight.spans.length; index++) {
            const {start, end} = highlight.spans[index];

            if (cursor < start) {
                result.push(
                    <Fragment key={`text-${index}`}>
                        {highlight.text.slice(cursor, start)}
                    </Fragment>
                );
            }

            result.push(
                <Fragment key={`highlight-${index}`}>
                    {render(highlight.text.slice(start, end), index)}
                </Fragment>
            );

            cursor = end;
        }

        if (cursor < highlight.text.length) {
            result.push(
                <Fragment key="text-end">
                    {highlight.text.slice(cursor)}
                </Fragment>,
            );
        }

        return result;
    }, [highlight, render]);

    return <>{content}</>;
}
