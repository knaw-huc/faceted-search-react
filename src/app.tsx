import FilterFacet, {FilterFacetItem} from '../lib/components/FilterFacet';
import SearchFacet from '../lib/components/SearchFacet';
import RangeFacet from '../lib/components/RangeFacet';
import SiteHeader from '../lib/components/SiteHeader';
import ResultsView from '../lib/components/ResultsView';
import Facet from '../lib/components/Facet.tsx';
import SelectedFacets, {SelectedFacet} from '../lib/components/SelectedFacets.tsx';
import Pagination from '../lib/components/Pagination.tsx';
import ResultCardSubResults, {ResultCardSubResultsProps} from '../lib/components/ResultCardSubResults.tsx';

export default function App() {
    const facetItemsList1: FilterFacetItem[] = [
        {
            itemKey: 'assum',
            label: 'Assum',
            amount: 12,
            isSelected: false
        },
        {
            itemKey: 'berends',
            label: 'Berends',
            amount: 48,
            isSelected: false
        },
        {
            itemKey: 'bertens',
            label: 'Bertens',
            amount: 111,
            isSelected: false
        },
        {
            itemKey: 'blankhart',
            label: 'Blankhart',
            amount: 312,
            isSelected: false
        }
    ];

    const facetItemsList2: FilterFacetItem[] = [
        {
            itemKey: 'abidjan',
            label: 'Abidjan',
            amount: 12,
            isSelected: false
        },
        {
            itemKey: 'accra',
            label: 'Accra',
            amount: 48,
            isSelected: false
        },
        {
            itemKey: 'europa',
            label: 'Europa',
            amount: 121,
            isSelected: false
        },
        {
            itemKey: 'benelux',
            label: 'Benelux',
            amount: 87,
            isSelected: true,
            children: [
                {
                    itemKey: 'nederland',
                    label: 'Nederland',
                    amount: 45,
                    isSelected: true,
                    children: [
                        {
                            itemKey: 'amsterdam',
                            label: 'Amsterdam',
                            amount: 1,
                            isSelected: true,
                            children: [
                                {
                                    itemKey: 'jordaan',
                                    label: 'Jordaan',
                                    amount: 0,
                                    isSelected: true
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            itemKey: 'ankara',
            label: 'Ankara',
            amount: 12,
            isSelected: false
        },
        {
            itemKey: 'bagdad',
            label: 'Bagdad',
            amount: 55,
            isSelected: false
        }
    ];

    const results: ResultCardSubResultsProps[] = [
        {
            title: 'What is Community Radio??',
            link: '#',
            items: [
                {
                    columns: [
                        '05-01-1980',
                        '18:42:45',
                        'mitra@cdp.UUCP',
                    ],
                    mainColumnIndex: 2,
                },
                {
                    columns: [
                        '26-03-1991',
                        '18:42:45',
                        'bobko@igc.apc.org',
                    ],
                    mainColumnIndex: 2,
                },
                {
                    columns: [
                        '05-01-1980',
                        '18:42:45',
                        'mitra@cdp.UUCP',
                    ],
                    mainColumnIndex: 2,
                },
                {
                    columns: [
                        '05-01-1980',
                        '18:42:45',
                        'danacf@igc.apc.org11',
                    ],
                    mainColumnIndex: 2,
                },
                {
                    columns: [
                        '26-03-1991',
                        '18:42:45',
                        'bobko@igc.apc.org',
                    ],
                    mainColumnIndex: 2,
                },
            ],
            maxInitialItemsShown: 3
        }, {
            title: 'Nicaragua Election Radio Reports222',
            link: '#',
            items: [
                {
                    columns: [
                        '05-01-1980',
                        '18:42:45',
                        'danacf@igc.apc.org11',
                    ],
                    mainColumnIndex: 2,
                },
                {
                    columns: [
                        '26-03-1991',
                        '18:42:45',
                        'bobko@igc.apc.org',
                    ],
                    mainColumnIndex: 2,
                },
                {
                    columns: [
                        '05-01-1980',
                        '18:42:45',
                        'mitra@cdp.UUCP',
                    ],
                    mainColumnIndex: 2,
                },
            ],
            maxInitialItemsShown: 3
        },
        {
            title: 'Women\'s Radio In Ireland',
            link: '#',
            items: [
                {
                    columns: [
                        '05-01-1980',
                        '18:42:45',
                        'Raleigh Myers',
                    ],
                    mainColumnIndex: 2,
                },
                {
                    columns: [
                        '26-03-1991',
                        '18:42:45',
                        'bobko@igc.apc.org',
                    ],
                    mainColumnIndex: 2,
                }
            ],
            maxInitialItemsShown: 3
        }
    ]

    const selectedFacets: SelectedFacet[] = [
        {value: 'school', onRemove: () => console.log('Remove school')},
        {value: 'school', onRemove: () => console.log('Remove school')},
        {value: 'reis', onRemove: () => console.log('Remove reis')}
    ];

    return (
        <div className="w-full h-full min-h-screen flex flex-col items-center">
            <SiteHeader name="Interface"/>

            <div className="flex flex-col lg:flex-row xl:gap-10 h-full grow max-w-[1300px] w-full mt-8 lg:mb-16">
                <div className="w-full lg:w-96 px-4 pb-6">
                    <div className="w-full my-4">
                        <button
                            className="lg:hidden flex gap-1 items-center bg-neutral-100 rounded-full px-2 py-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="w-5 h-5 fill-neutral-800">
                                <path
                                    d="M6 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 111.5 0v7.5A.75.75 0 016 12zM18 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0118 12zM6.75 20.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM18.75 18.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 011.5 0zM12.75 5.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM12 21a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0112 21zM3.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0zM12 11.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM15.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0z"/>
                            </svg>
                            Search filters
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="w-4 h-4 fill-neutral-800">
                                <path fillRule="evenodd"
                                      d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                                      clipRule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                    <section id="facets"
                             className="w-full hidden lg:flex flex-col max-w-[300px] absolute lg:relative p-4 lg:p-0 shadow-xl lg:shadow-none bg-neutral-50 lg:bg-white">
                        <div id="closeFacets" className="w-full text-right">
                            <button className="lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="w-4 h-4 fill-diploblue-neutral-800">
                                    <path fillRule="evenodd"
                                          d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                          clipRule="evenodd"/>
                                </svg>
                            </button>
                        </div>


                        <SearchFacet onSearch={query => console.log('Search query', query)}/>

                        <Facet label="Range">
                            <RangeFacet min={0} max={1000} step={1}
                                        onChange={(min, max) => console.log('Range', min, max)}/>
                        </Facet>

                        <Facet label="Name" infoText="Info about this facet.">
                            <FilterFacet items={facetItemsList1}
                                         onTextFilterChange={value => console.log('Name text filter', value)}
                                         onSort={type => console.log('Name sort', type)}
                                         onSelected={key => {
                                             const item = facetItemsList1.find(item => item.itemKey === key);
                                             item && (item.isSelected = !item.isSelected);
                                         }}/>
                        </Facet>

                        <Facet label="Location" infoText="Info about this facet.">
                            <FilterFacet items={facetItemsList2}
                                         onTextFilterChange={value => console.log('Location text filter', value)}
                                         onSort={type => console.log('Location sort', type)}
                                         onSelected={key => {
                                             const item = facetItemsList1.find(item => item.itemKey === key);
                                             item && (item.isSelected = !item.isSelected);
                                         }}/>
                        </Facet>

                        <Facet label="Organisation" infoText="Info about this facet.">
                            <FilterFacet items={facetItemsList1.concat(facetItemsList1)}
                                         maxInitialItems={3}
                                         onTextFilterChange={value => console.log('Organisation text filter', value)}
                                         onSort={type => console.log('Organisation sort', type)}
                                         onSelected={key => {
                                             const item = facetItemsList1.find(item => item.itemKey === key);
                                             item && (item.isSelected = !item.isSelected);
                                         }}/>
                        </Facet>
                    </section>
                </div>

                <div className="grow px-4 pb-20">
                    <h2 className="mb-4">Results</h2>

                    <SelectedFacets selectedFacets={selectedFacets} onClear={() => console.log('Clear facets')}/>

                    <ResultsView>
                        {results.map((result, idx) =>
                            <ResultCardSubResults key={idx} {...result}/>
                        )}
                    </ResultsView>

                    <Pagination current={2} prev="#" next="#" pages={{
                        1: '#',
                        2: '#',
                        3: '#',
                    }}/>
                </div>
            </div>
        </div>
    )
}
