import {useState} from 'react';
import {facetItemsList1, facetItemsList2, results, resultsBasic} from './data';
import Layout from './components/Layout';
import SiteHeader from './components/SiteHeader';
import ContentWithAsides from './components/ContentWithAsides';
import {
    Facet,
    FacetsSection,
    FilterFacet,
    Pagination,
    RangeFacet,
    ResultCardBasic,
    ResultCardSubResults,
    ResultsView,
    SearchFacet,
    SelectedFacets
} from '../lib';

const selectedFacets = [
    {value: 'school', onRemove: () => console.log('Remove school')},
    {value: 'school', onRemove: () => console.log('Remove school')},
    {value: 'reis', onRemove: () => console.log('Remove reis')}
];

const navigation = [
    {label: 'Home', href: '#'},
    {label: 'About', href: '#'},
    {label: 'Search', href: '#'}
];

export default function Design() {
    const [facetItemsList1State, setFacetItemsList1State] = useState({
        'assum': false,
        'berends': false,
        'bertens': false,
        'blankhart': false
    });

    const [facetItemsList2State, setFacetItemsList2State] = useState({
        'abidjan': false,
        'accra': false,
        'europa': false,
        'benelux': false,
        'nederland': false,
        'amsterdam': false,
        'jordaan': false,
        'ankara': false,
        'bagdad': false
    });

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
                                 selected={facetItemsList1State}
                                 onTextFilterChange={value => console.log('Name text filter', value)}
                                 onSort={type => console.log('Name sort', type)}
                                 onSelect={state => setFacetItemsList1State(state as any)}/>
                </Facet>

                <Facet label="Location" infoText="Info about this facet.">
                    <FilterFacet items={facetItemsList2}
                                 selected={facetItemsList2State}
                                 onTextFilterChange={value => console.log('Location text filter', value)}
                                 onSort={type => console.log('Location sort', type)}
                                 onSelect={state => setFacetItemsList2State(state as any)}/>
                </Facet>

                <Facet label="Organisation" infoText="Info about this facet.">
                    <FilterFacet items={facetItemsList1.concat(facetItemsList1)}
                                 selected={{}}
                                 maxInitialItems={3}
                                 onTextFilterChange={value => console.log('Organisation text filter', value)}
                                 onSort={type => console.log('Organisation sort', type)}
                                 onSelect={_ => console.log('Changed organisation')}/>
                </Facet>
            </FacetsSection>
        );
    }

    return (
        <Layout>
            <SiteHeader name="DEMO" navigation={navigation}/>

            <ContentWithAsides leftAside={<Facets/>}>
                <h2 className="mb-4">Results</h2>

                <SelectedFacets selectedFacets={selectedFacets} onClear={() => console.log('Clear facets')}/>

                <div className="flex flex-col gap-4">
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
                </div>

                <Pagination current={2} prev="#" next="#" pages={{
                    1: '#',
                    2: '#',
                    3: '#',
                }}/>
            </ContentWithAsides>
        </Layout>
    )
}

