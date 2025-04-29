import FilterFacet, {FilterFacetItem} from '../lib/components/FilterFacet';
import SearchFacet from '../lib/components/SearchFacet';
import RangeFacet from '../lib/components/RangeFacet';
import ResultsView from '../lib/components/ResultsView';
import Facet from '../lib/components/Facet.tsx';
import SelectedFacets, {SelectedFacet} from '../lib/components/SelectedFacets.tsx';
import Pagination from '../lib/components/Pagination.tsx';
import ResultCardSubResults, {ResultCardSubResultsProps} from '../lib/components/ResultCardSubResults.tsx';
import ResultCardBasic, {ResultCardBasicProps} from '../lib/components/ResultCardBasic.tsx';
import Layout from '../lib/components/Layout.tsx';
import ContentWithAsides from '../lib/components/ContentWithAsides.tsx';
import FacetsSection from '../lib/components/FacetsSection.tsx';
import '../lib/index.css';

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

const resultsBasic: ResultCardBasicProps[] = [
    {
        title: 'Ucto-Webservice',
        link: '#',
        description: 'Ucto is a rule-based tokeniser for multiple languages. This is the webservice for it, for both humans and machines.',
        tags: [
            {
                columns: [
                    'Tool'
                ],
                mainColumnIndex: 2,
            },
            {
                columns: [
                    'Tagging'
                ],
                mainColumnIndex: 2,
            }
        ],
        maxInitialItemsShown: 2
    },
    {
        title: 'Search-ui',
        link: '#',
        description: 'This repository contains the code for a Search UI to test the functionality of the basic vocabulary-recommender.',
        tags: [
            {
                columns: [
                    'Tool'
                ],
                mainColumnIndex: 2,
            }
        ],
        maxInitialItemsShown: 2
    },
    {
        title: 'Udpipe-service',
        link: '#',
        description: 'UDPipe Frysk is a webservice for lemmatizing, part-of-speech tagging and dependency parsing of (West) Frisian texts using UDPipe (Straka and Straková, 2017). The tool allows for multiple ways of processing a text (the web service facilitates texts, files and web addresses). ',
        tags: [
            {
                columns: [
                    'Tool'
                ],
                mainColumnIndex: 2,
            },
            {
                columns: [
                    'Annotating'
                ],
                mainColumnIndex: 2,
            }
        ],
        maxInitialItemsShown: 2
    }
]

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

export default function App() {
    return (
        <Layout>
            <ContentWithAsides leftAside={<Facets/>}>
                <h2 className="mb-4">Results</h2>

                <SelectedFacets selectedFacets={selectedFacets} onClear={() => console.log('Clear facets')}/>

                <ResultsView>
                    {resultsBasic.map((resultBasic, idx) =>
                        <ResultCardBasic key={idx} {...resultBasic}/>
                    )}
                </ResultsView>

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
            </ContentWithAsides>
        </Layout>
    )
}

function Facets() {
    return (
        <FacetsSection>
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
        </FacetsSection>
    );
}
