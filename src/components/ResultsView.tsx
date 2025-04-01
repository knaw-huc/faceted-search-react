import React, { JSX } from 'react';
import ResultCardSubResults from "./ResultCardSubResults";
import SelectedFacetItems from "./SelectedFacetItems";

export interface Result {
    resultsTitle: string;
    resultsMoreSubItems?: number;
    resultsSubitems: {
        resultsSubitemsFileld1: string | undefined;
        resultsSubitemsFileld2: string | undefined;
        resultsSubitemsFileld3: string | undefined;
    };
}

interface IProps {
    resultsList: Result[];
    searchInfo: {
        selectedFacetItems: {
            selectedFacetItemsTitle: string;
            }[]
        }
    }

const ResultsView: React.FC<IProps> = ({resultsList, searchInfo}) => {

    const ResultsListUL = (): JSX.Element[] => {
        return resultsList.map(resultsListItem => {
            return (
                <ResultCardSubResults resultsTitle={resultsListItem.resultsTitle}  resultsMoreSubItems={resultsListItem.resultsMoreSubItems} resultsSubitems={resultsListItem.resultsSubitems}/>
            )
        })
    }

  return (
    <>
    <h2 className="mb-4">Results</h2>

    <SelectedFacetItems searchInfo={searchInfo}/>

    <ul className="w-full grid grid-cols-[1fr_1fr_4fr_3rem] gap-6" id="results">
        <ResultsListUL/>
    </ul> 

    <div className="pb-20">
        <nav className="flex gap-4 w-full justify-center mt-10"> <a href="#"
                className="rounded-full px-3 py-2 text-sm font-bold no-underline inline-flex items-center gap-1 transition bg-neutral-100 hover:bg-neutral-200 mr-4">Previous</a>

            <a href="#"
                className="rounded-full px-3 py-2 text-sm font-bold no-underline inline-flex items-center gap-1 transition bg-neutral-100 hover:bg-neutral-200">1</a>
            <div className="bg-neutral-700 text-white rounded font-bold p-2 min-w-10 text-center">2
            </div> <a href="#"
                className="rounded-full px-3 py-2 text-sm font-bold no-underline inline-flex items-center gap-1 transition bg-neutral-100 hover:bg-neutral-200">3</a>

            <a href="#"
                className="rounded-full px-3 py-2 text-sm font-bold no-underline inline-flex items-center gap-1 transition bg-neutral-100 hover:bg-neutral-200 ml-4">Next</a>
        </nav>
    </div>
</>
  )
}

export default ResultsView