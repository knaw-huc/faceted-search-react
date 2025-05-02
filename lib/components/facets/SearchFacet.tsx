import {useId, useState} from 'react';

export interface SearchFacetProps {
    initialQuery?: string;
    onSearch: (query: string) => void;
}

export default function SearchFacet({initialQuery, onSearch}: SearchFacetProps) {
    const id = useId();
    const [query, setQuery] = useState(initialQuery || '');

    return (
        <div className="mb-6">
            <label htmlFor={id} className="font-semibold block pb-1">
                Search for text
            </label>

            <div className="flex flex-row w-full">
                <input className="py-1 px-3 w-full rounded-l border-l  border-t  border-b  border-neutral-300"
                       type="search" id={id} name="q" value={query}
                       onChange={e => setQuery(e.target.value)}
                       onKeyUp={e => e.key === 'Enter' && onSearch(query)}/>

                <button className="bg-(--color-support-001) py-1 px-3 rounded-r border border-(--color-support-001)"
                        aria-label="Search" onClick={_ => onSearch(query)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="w-6 h-6 fill-white">
                        <path fillRule="evenodd"
                              d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                              clipRule="evenodd"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}
