import React, { JSX } from 'react';

interface IProps {
  searchInfo: {
    selectedFacetItems: {
        selectedFacetItemsTitle: string;
        }[]
    }
  }

const SelectedFacetItems: React.FC<IProps> = ({searchInfo}) => {

    const SelectedItemTags = (): JSX.Element[] => {
        return searchInfo.selectedFacetItems.map(selectedFacetItem => {
            return (
              <div className="rounded bg-blue-100 text-blue-900 py-1 px-2 text-sm flex flex-row items-center">
              <span className="mr-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor" className="w-4 h-4 stroke-blue-900">
                      <path stroke-linecap="round" stroke-linejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
  
  
              </span>
              <span>{selectedFacetItem.selectedFacetItemsTitle}</span>
  
              <button className="ml-2"
                  aria-label="Klik om school te verwijderen van zoekfilters">&#10005;</button>
          </div>
            )
        })
    }

  return (
    <section className="flex flex-row gap-2 my-4 justify-center max-h-20 overflow-auto" aria-label="Geselecteerde filters">
      <div className="text-sm italic text-neutral-500 py-1 whitespace-nowrap">Selected filters:</div>
      <div className="flex flex-row gap-2 flex-wrap items-start grow">
        {SelectedItemTags()}
      </div>
      <div className="">
          <button className="rounded-full px-2 py-1 font-bold no-underline inline-flex items-center gap-1 transition bg-neutral-100 hover:bg-neutral-200 whitespace-nowrap text-xs ">Clear filters</button>
      </div>
  </section>
    
  )
}

export default SelectedFacetItems