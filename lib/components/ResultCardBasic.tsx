import {useState} from 'react';

export interface ResultCardBasicProps {
    title: string;
    link: string;
    description: string;
    tags: ResultCardTagProps[];
    maxInitialItemsShown?: number;
}

export interface ResultCardTagProps {
    columns: string[];
    mainColumnIndex: number;
}

export default function ResultCardBasic({title, link, description, tags, maxInitialItemsShown}: ResultCardBasicProps) {
    const moreItems = maxInitialItemsShown ? Math.max(0, tags.length - maxInitialItemsShown) : 0;
    const [showAllItems, setShowAllItems] = useState(moreItems == 0);

    return (
        <li className="col-span-4 grid grid-cols-subgrid bg-neutral-50 border border-neutral-200 hover:bg-white hover:border-neutral-200 rounded w-full cursor-pointer">
            <a href={link} className="w-full no-underline flex flex-col col-span-4">
                <div className="p-2 border-b border-neutral-200 text-lg col-span-4 font-bold">
                    <h3>{title}</h3>
                </div>

                <div className='p-2 text-neutral-700'>
                    {description}
                </div>

                <div className='p-2 flex gap-2'>
                {(showAllItems ? tags : tags.slice(0, maxInitialItemsShown)).map((tag, idx) =>
                    <ResultCardTag key={idx} {...tag}/>)}
                </div>

                

                {moreItems > 0 && !showAllItems && <button
                    className="col-span-4 p-2 flex gap-2 justify-end last:border-b-0 border-neutral-200 items-center w-full text-sm hover:bg-neutral-100 text-neutral-600"
                    onClick={_ => setShowAllItems(true)}>
                    See {moreItems} more reactions
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                         fill="currentColor" className="w-4 h-4 fill-neutral-600">
                        <path fillRule="evenodd"
                              d="M20.03 4.72a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 11.69l6.97-6.97a.75.75 0 011.06 0zm0 6a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06L12 17.69l6.97-6.97a.75.75 0 011.06 0z"
                              clipRule="evenodd"/>
                    </svg>
                </button>}
            </a>
        </li>
    );
}

function ResultCardTag({columns, mainColumnIndex}: ResultCardTagProps) {
    return (
        <div
            className="bg-(--color-support-002) p-1 text-sm"
            >
            {columns.map((column, idx) =>
                <div key={idx}
                     className={idx !== mainColumnIndex ? '' : ''}>
                    {column}
                </div>)}

        </div>
    );
}
