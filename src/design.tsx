import {useState} from 'react';
import {results, resultsBasic} from './data';
import {nameFacetData, locationFacetData} from './filterFacetData';
import Layout from './components/Layout';
import SiteHeader from './components/SiteHeader';
import ContentWithAsides from './components/ContentWithAsides';
import {
    Facet,
    FacetsSection,
    FilterFacet,
    FilterFacetItems,
    Pagination,
    NumericRangeFacet,
    DateRangeFacet,
    ResultCardBasic,
    ResultCardSubResults,
    ResultsView,
    SearchFacet,
    SelectedFacets
} from '../lib';

const selectedFacets = [
    {itemKey: 'bus', label: 'bus', onRemove: () => console.log('Remove bus')},
    {itemKey: 'school', label: 'school', onRemove: () => console.log('Remove school')},
    {itemKey: 'reis', label: 'reis', onRemove: () => console.log('Remove reis')}
];

const navigation = [
    {label: 'Home', href: '#home'},
    {label: 'About', href: '#about'},
    {label: 'Search', href: '#search'},
];

function Facets() {
    const [nameSelected, setNameSelected] = useState<Set<string>>(new Set());
    const [locationSelected, setLocationSelected] = useState<Set<string>>(new Set());

    return (
        <FacetsSection>
            <SearchFacet onSearch={query => console.log('Search query', query)}/>

            <Facet label="Numeric range">
                <NumericRangeFacet min={0} max={1000} step={1}
                                   onChange={(min, max) => console.log('Numeric range', min, max)}/>
            </Facet>

            <Facet label="Date range">
                <DateRangeFacet min="2020-01-01" max="2025-12-31"
                                onChange={(min, max) => console.log('Date range', min, max)}/>
            </Facet>

            <Facet label="Name" infoText="Info about this facet.">
                <FilterFacet sort="hits" onSort={type => console.log('Name sort', type)}
                             onTextFilterChange={value => console.log('Name text filter', value)}>
                    <FilterFacetItems items={nameFacetData} maxInitialItems={3} selected={nameSelected}
                                      onSelect={state => setNameSelected(state)}/>
                </FilterFacet>
            </Facet>

            <Facet label="Location" infoText="Info about this facet.">
                <FilterFacet sort="asc" onSort={type => console.log('Location sort', type)}
                             onTextFilterChange={value => console.log('Location text filter', value)}>
                    <FilterFacetItems items={locationFacetData} selected={locationSelected}
                                      onSelect={state => setLocationSelected(state)}/>
                </FilterFacet>
            </Facet>
        </FacetsSection>
    );
}

export default function Design() {
    return (
        <Layout>
            <SiteHeader name="DEMO" navigation={navigation}/>

            <ContentWithAsides leftAside={<Facets/>}>
                <h2 className="mb-4">Results</h2>

                <SelectedFacets selectedFacets={selectedFacets}
                                onClear={() => console.log('Clear facets')}/>

                <div className="flex flex-col gap-4">
                    <ResultsView>
                        {resultsBasic.map((resultBasic, idx) =>
                            <ResultCardBasic key={`b${idx}`} {...resultBasic}/>
                        )}
                    </ResultsView>

                    <ResultsView>
                        {results.map((result, idx) =>
                            <ResultCardSubResults key={`r${idx}`} {...result}/>
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
