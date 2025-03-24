import React, { JSX } from 'react';
import FacetItem from "../components/BasicFacetItem";
import iconSort09 from '../assets/Icon-sort-09.svg';
import iconSortAz from '../assets/Icon-sort-az.svg';
import iconSortZa from '../assets/Icon-sort-za.svg';



interface IProps {
    label?: string;
    infoText?: string;
    filterOrder: boolean;
    facetItemsList: {
        facetItemLabel?: string;
        facetItemAmount?: string;
        facetItemLevel?: number;
        facetItemIsOpen?: boolean;
    }[]
  }






const Facet: React.FC<IProps> = ({ label, infoText, filterOrder, facetItemsList}) => {
   
    function FacetFilters({filterOrder}: {filterOrder: boolean}) {
        if (filterOrder) {
            return (
                <div className="pb-1 flex gap-2 justify-between items-center border- border-neutral-300 mt-2">
                <div className="pb-1 w-3/5 flex items-center">
                    <label for="facet-filter" className="hidden">Filter on facet items</label>
                    <input
                        className=" py-1 px-3 text-xs w-full rounded border border-neutral-600 placeholder:italic text-neutral-700"
                        type="search" id="facet-filter" name="f" placeholder="Type to filter"/>
                </div>
                <div className="flex justify-end gap-1 w-2/5">
                    <button
                        className="py-1 px-2 text-xs rounded bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center"
                        aria-label="Order from A to Z">
                        <img src={iconSortAz} alt="" className="h-4"/>
                    </button>
                    <button
                        className="py-1 px-2 text-xs rounded bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center"
                        aria-label="Order from Z to A">
                        <img src={iconSortZa} alt="" className="h-4"/>
                    </button>
                    <button
                        className="py-1 px-2 text-xs rounded bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center"
                        aria-label="Order by the amount of results">
                        <img src={iconSort09} alt="" className="h-4"/>
                    </button>
                </div>
            </div>
            );
        }
        
    }
    

    const renderList = (): JSX.Element[] => {
        return facetItemsList.map(facetItem => {
            return (
                <FacetItem facetItemLabel={facetItem.facetItemLabel} facetItemAmount={facetItem.facetItemAmount} facetItemLevel={facetItem.facetItemLevel} facetItemIsOpen={facetItem.facetItemIsOpen}/>
            )
        })
    }

  return (
        <div className="mb-10 w-full max-w-[400px]" aria-label={`Facet voor ${label}`}>{filterOrder}
            <div className="flex justify-between items-center mb-1">
                <div className="font-semibold" tabIndex={0}>{label}</div>
                <div className="flex justify-end"> <a href="#next" className="sr-only">Skip {label} and go to next
                        facet</a>

                    <div className="relative">
                        <button
                            className="peer p-1 rounded-full bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center"
                            aria-label="Click for a description about the facet">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke-width="1.5" stroke="currentColor" className="w-5 h-5 stroke-neutral-500">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                        </button>
                        <div
                            className="hidden peer-hover:flex hover:flex w-[250px] flex-col bg-neutral-800 text-white text-sm drop-shadow-lg absolute -translate-x-52 p-4 rounded-sm">
                            {infoText}</div>
                    </div>
                    <button
                        className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center translate-x-2"
                        aria-label="Click to close the facet">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            className="w-3 h-3 fill-neutral-900">
                            <path fill-rule="evenodd"
                                d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
    
    <FacetFilters filterOrder={filterOrder}/>

    <div className="max-h-48 overflow-y-auto">

        {renderList()} 
          
    </div>
    <div className="flex justify-end">
        <button className="text-xs flex flex-row text-sky-700 items-center justify-start gap-1">All
            items
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                className="w-4 h-4 fill-bg-sky-700">
                <path fill-rule="evenodd"
                    d="M20.03 4.72a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 11.69l6.97-6.97a.75.75 0 011.06 0zm0 6a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06L12 17.69l6.97-6.97a.75.75 0 011.06 0z"
                    clip-rule="evenodd" />
            </svg>
        </button>
    </div>
</div>
  )
}



export default Facet


