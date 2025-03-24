import React, { JSX } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid'

interface IProps {
    resultsTitle: string;
    resultsMoreSubItems?: number;
    resultsSubitems?: {
        resultsSubitemsFileld1?: string;
        resultsSubitemsFileld2?: string;
        resultsSubitemsFileld3?: string;
  }
}


const ResultCardSubResults: React.FC<IProps> = ({resultsTitle, resultsMoreSubItems, resultsSubitems}) => {


    const resultSubItemsList = (): JSX.Element[] => {
        return resultsSubitems.map(resultsSubitem => {
            return (
                <button className="grid grid-cols-subgrid col-span-4 p-2 border-b last:border-b-0 border-neutral-200  items-center w-full text-left hover:bg-neutral-100">
                    <div className="text-sm text-neutral-600">{resultsSubitem.resultsSubitemsFileld2}</div>
                    <div className="text-sm text-neutral-600">{resultsSubitem.resultsSubitemsFileld3}</div>
                    <div className="">{resultsSubitem.resultsSubitemsFileld1}</div>

                    <div className="flex justify-end">
                    <ChevronRightIcon className="w-6 h-6 fill-neutral-900"/>
                    </div>
                </button>
            )
        })
    }

  return (
      <li className="col-span-4 grid grid-cols-subgrid bg-neutral-50 border border-neutral-200 hover:bg-white hover:border-neutral-200 rounded w-full cursor-pointer">
        <a href="data-detail2.html" className="w-full no-underline grid grid-cols-subgrid col-span-4 ">
            <div className="p-2 border-b border-neutral-200 text-lg col-span-4">
                <h3>{resultsTitle}</h3>
            </div>

            {resultSubItemsList()} 

            
            <button
                className="col-span-4 p-2 flex gap-2 justify-end last:border-b-0 border-neutral-200  items-center w-full text-sm hover:bg-neutral-100 text-neutral-600">See 
                {resultsMoreSubItems} more reactions <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                    fill="currentColor" className="w-4 h-4 fill-neutral-600">
                    <path fill-rule="evenodd"
                        d="M20.03 4.72a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 11.69l6.97-6.97a.75.75 0 011.06 0zm0 6a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06L12 17.69l6.97-6.97a.75.75 0 011.06 0z"
                        clip-rule="evenodd" />
                </svg>
            </button>
        </a>

    </li>
  )
}

export default ResultCardSubResults