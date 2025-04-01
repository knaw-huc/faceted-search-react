import Facet from "./components/BasicFacet";
import {SearchFacet} from "./components/SearchFacet";
import RangeSlider from "./components/RangeSliderFacet";
import SiteHeader from "./components/SiteHeader";
import ResultsView from "./components/ResultsView";
import {Result} from "./components/ResultsView";




export function App() {

      const facetItemsList1 =  [
        {
          "facetItemLabel": "Assum",
          "facetItemAmount": "12"
        },
        {
          "facetItemLabel": "Berends",
          "facetItemAmount": "48"
        },
        {
          "facetItemLabel": "Bertens",
          "facetItemAmount": "111"
        },
        {
          "facetItemLabel": "Blankhart",
          "facetItemAmount": "312"
        }
      ]
      const facetItemsList2 =  [
        {
          "facetItemLabel": "Abidjan",
          "facetItemAmount": "12",
          "facetItemIsOpen": false, 
          "facetItemLevel": 0
        },
        {
          "facetItemLabel": "Accra",
          "facetItemAmount": "48",
          "facetItemIsOpen": false, 
          "facetItemLevel": 0
        },
        {
          "facetItemLabel": "Europa",
          "facetItemAmount": "121",
          "facetItemIsOpen": false, 
          "facetItemLevel": 0
        },
        {
          "facetItemLabel": "Benelux",
          "facetItemAmount": "87",
          "facetItemIsOpen": true, 
          "facetItemLevel": 1
        },
        {
          "facetItemLabel": "Nederland",
          "facetItemAmount": "45",
          "facetItemIsOpen": true, 
          "facetItemLevel": 2
        },
        {
          "facetItemLabel": "Amsterdam",
          "facetItemAmount": "1",
          "facetItemIsOpen": true, 
          "facetItemLevel": 3
        },
        {
          "facetItemLabel": "Jordaan",
          "facetItemAmount": "",
          "facetItemIsOpen": true, 
          "facetItemLevel": 4
        },
        {
          "facetItemLabel": "Ankara",
          "facetItemAmount": "12",
          "facetItemIsOpen": false, 
          "facetItemLevel": 0
        },
        {
          "facetItemLabel": "Bagdad",
          "facetItemAmount": "55",
          "facetItemIsOpen": false, 
          "facetItemLevel": 0
        }
      ]
      const resultsList: Result[] = [
        {
          "resultsTitle": "What is Community Radio??",
          "resultsMoreSubItems":4,
          "resultsSubitems": [
            {
              "resultsSubitemsFileld1": "mitra@cdp.UUCP",
              "resultsSubitemsFileld2": "05-01-1980",
              "resultsSubitemsFileld3": "18:42:45"
            },
            {
              "resultsSubitemsFileld1": "bobko@igc.apc.org",
              "resultsSubitemsFileld2": "26-03-1991",
              "resultsSubitemsFileld3": "18:42:45"
            },
            {
              "resultsSubitemsFileld1": "mitra@cdp.UUCP",
              "resultsSubitemsFileld2": "05-01-1980",
              "resultsSubitemsFileld3": "18:42:45"
            }

          ]
        },
        {
          "resultsTitle": "Nicaragua Election Radio Reports222",
          "resultsMoreSubItems":2,
          "resultsSubitems": [
            {
              "resultsSubitemsFileld1": "danacf@igc.apc.org11",
              "resultsSubitemsFileld2": "05-01-1980",
              "resultsSubitemsFileld3": "18:42:45"
            },
            {
              "resultsSubitemsFileld1": "bobko@igc.apc.org",
              "resultsSubitemsFileld2": "26-03-1991",
              "resultsSubitemsFileld3": "18:42:45"
            },
            {
              "resultsSubitemsFileld1": "mitra@cdp.UUCP",
              "resultsSubitemsFileld2": "05-01-1980",
              "resultsSubitemsFileld3": "18:42:45"
            }

          ]
        },
        {
          "resultsTitle": "Women's Radio In Ireland",
          "resultsSubitems": [
            {
              "resultsSubitemsFileld1": "Raleigh Myers",
              "resultsSubitemsFileld2": "05-01-1980",
              "resultsSubitemsFileld3": "18:42:45"
            },
            {
              "resultsSubitemsFileld1": "bobko@igc.apc.org",
              "resultsSubitemsFileld2": "26-03-1991",
              "resultsSubitemsFileld3": "18:42:45"
            }

          ]
        }
      ]
      const searchInfo = {
        "selectedFacetItems": [
            {"selectedFacetItemsTitle":"school"},
            {"selectedFacetItemsTitle":"boek"},
            {"selectedFacetItemsTitle":"reis"}
        ]
      }

    
  

  return (
  
      <div className="w-full h-full min-h-screen flex flex-col items-center">
       <SiteHeader siteName="Interface"/>

        <div className="flex flex-col lg:flex-row xl:gap-10 h-full grow max-w-[1300px] w-full mt-8 lg:mb-16">
            <div className="w-full lg:w-96 px-4 pb-6">
                <div className="w-full my-4">
                    <button 
                        className="lg:hidden flex gap-1 items-center bg-neutral-100 rounded-full px-2 py-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            className="w-5 h-5 fill-neutral-800">
                            <path
                                d="M6 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 111.5 0v7.5A.75.75 0 016 12zM18 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0118 12zM6.75 20.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM18.75 18.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 011.5 0zM12.75 5.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM12 21a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0112 21zM3.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0zM12 11.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM15.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0z" />
                        </svg>Search filters
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            className="w-4 h-4 fill-neutral-800">
                            <path fill-rule="evenodd"
                                d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <section id="facets"
                    className="w-full hidden lg:flex flex-col max-w-[300px] absolute lg:relative p-4 lg:p-0 shadow-xl lg:shadow-none bg-neutral-50 lg:bg-white">
                    <div id="closeFacets" className="w-full text-right">
                        <button className="lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                className="w-4 h-4 fill-diploblue-neutral-800">
                                <path fill-rule="evenodd"
                                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    
                    
                    <SearchFacet/>
                    <RangeSlider facetLabel="Range"/>
                    <Facet label="Name" infoText="Info about this facet." filterOrder={true} facetItemsList={facetItemsList1}/>
                    <Facet label="Location" infoText="Info about this facet." filterOrder={false} facetItemsList={facetItemsList2}/>
                    <Facet label="Organisation" infoText="Info about this facet." filterOrder={false} facetItemsList={facetItemsList1}/>
           
                    
                    
                    
                </section>
            </div>
            <div className="grow px-4 pb-20">
            <ResultsView resultsList={resultsList} searchInfo={searchInfo}/>
            </div>
        </div>
    </div>
   
  )
}
