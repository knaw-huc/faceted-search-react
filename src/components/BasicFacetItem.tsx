import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { ChevronRightIcon } from '@heroicons/react/24/solid'



interface IProps {
    facetItemLabel?: string;
    facetItemAmount?: string;
    facetItemLevel?: number;
    facetItemIsOpen?: boolean
  }

  function ChevronIcon({facetItemIsOpen}: {facetItemIsOpen: boolean}) {
    if (facetItemIsOpen) {
      return <ChevronRightIcon className="w-3 h-3 fill-neutral-900"/>;
    }
    return <ChevronDownIcon className="w-3 h-3 fill-neutral-900"/>;
  }

  


const FacetItem: React.FC<IProps> = ({ facetItemLabel, facetItemAmount, facetItemLevel, facetItemIsOpen}) => {

  const widthValue = 2*facetItemLevel;

  return (
    <div className="flex flex-row justify-between gap-2 w-full mb-1 items-center">
        <div className="flex flex-row items-center w-full">
        <button className={`ml-${widthValue} mr-2`}>
            <ChevronIcon facetItemIsOpen={facetItemIsOpen}/>
        </button>
            <input className="w-4 h-4 mr-2  block" type="checkbox" id="1Berends" name="1Berends"
                value="Berends"/>
            <label for="1Berends" className="flex justify-between w-full">
                <div className="grow">{facetItemLabel}</div>
                <div className="grow" aria-label="Amount of results"></div>
                <div className="text-sm text-neutral-500">{facetItemAmount}</div>
            </label>
        </div>
    </div>

  )
}



export default FacetItem


