import {useCallback} from 'react';
import {Highlight} from 'components/utils';
import ResultCard from './ResultCard';

export interface ResultCardBasicProps {
    title: string;
    link: string;
    description?: string;
    tags?: string[];
    startMarker?: string;
    endMarker?: string;
}

export default function ResultCardBasic({
                                            title,
                                            link,
                                            description,
                                            tags,
                                            startMarker,
                                            endMarker
                                        }: ResultCardBasicProps) {
    const renderHighlight = useCallback((text: string) => <mark>{text}</mark>, []);

    return (
        <ResultCard>
            <a href={link} className="w-full no-underline flex flex-col col-span-4">
                <div className={`p-2 text-lg col-span-4 font-bold ${description ? 'border-b border-neutral-200' : ''}`}>
                    <h3>{title}</h3>
                </div>

                {description && <div className="p-2 text-neutral-700">
                    {startMarker && endMarker &&
                        <Highlight text={description} startMarker={startMarker} endMarker={endMarker}
                                   render={renderHighlight}/>}

                    {(!startMarker || !endMarker) && description}
                </div>}

                {tags && tags.length > 0 && <div className="p-2 flex gap-2">
                    {tags.map(tag => <div key={tag} className="bg-(--color-support-002) p-1 text-sm text-white">
                        {tag}
                    </div>)}
                </div>}
            </a>
        </ResultCard>
    );
}
