import {useState} from 'react';
import {ChevronRightIcon} from '@heroicons/react/24/solid';
import ResultCard from './ResultCard.tsx';

export interface ResultCardSubResultsProps {
    title: string;
    link: string;
    items: ResultCardSubResultsItemProps[];
    maxInitialItemsShown?: number;
}

export interface ResultCardSubResultsItemProps {
    columns: string[];
    mainColumnIndex: number;
    onClick?: () => void;
}

export default function ResultCardSubResults({title, link, items, maxInitialItemsShown}: ResultCardSubResultsProps) {
    const moreItems = maxInitialItemsShown ? Math.max(0, items.length - maxInitialItemsShown) : 0;
    const [showAllItems, setShowAllItems] = useState(moreItems == 0);

    return (
        <ResultCard>
            <a href={link} className="w-full no-underline grid grid-cols-subgrid col-span-4">
                <div className="p-2 border-b border-neutral-200 text-lg col-span-4">
                    <h3>{title}</h3>
                </div>

                {(showAllItems ? items : items.slice(0, maxInitialItemsShown)).map((item, idx) =>
                    <ResultCardSubResultsItem key={idx} {...item}/>)}

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
        </ResultCard>
    );
}

function ResultCardSubResultsItem({columns, mainColumnIndex, onClick}: ResultCardSubResultsItemProps) {
    return (
        <button
            className="grid grid-cols-subgrid col-span-4 p-2 border-b last:border-b-0 border-neutral-200  items-center w-full text-left hover:bg-neutral-100"
            onClick={onClick}>
            {columns.map((column, idx) =>
                <div key={idx}
                     className={idx !== mainColumnIndex ? 'text-sm text-neutral-600' : ''}>
                    {column}
                </div>)}

            <div className="flex justify-end">
                <ChevronRightIcon className="w-6 h-6 fill-neutral-900"/>
            </div>
        </button>
    );
}
