import {use} from 'react';
import {fetchFacetItems} from './filterFacetData';
import {fetchResults} from './resultsData';
import Layout from './components/Layout';
import ContentWithAsides from './components/ContentWithAsides';
import {
    FacetsSection,
    FacetedSearch,
    HookedSearchFacet,
    HookedNumericRangeFacet,
    HookedFilterFacet,
    HookedSelectedFacets,
    HookedResultsView,
    ResultCardBasic,
    HookedPagination,
    getReadableRange,
} from '@knaw-huc/faceted-search-react';
import type {
    Facets,
    ResultCardBasicProps,
    SearchState,
    SearchResults,
    FilterFacetState,
    FilterFacetItem
} from '@knaw-huc/faceted-search-react';

const facets: Facets = {
    range: {
        label: 'Range',
        valueRenderer: (value) => getReadableRange(value, false)
    },
    name: {
        label: 'Name',
    },
    location: {
        label: 'Location',
    }
};

const nameItemsCache = new Map<string, Promise<FilterFacetItem[]>>();
const locationItemsCache = new Map<string, Promise<FilterFacetItem[]>>();
const resultsCache = new Map<string, Promise<SearchResults<ResultCardBasicProps>>>();

function useItems(state: FilterFacetState) {
    const cacheKey = JSON.stringify(state);
    const cache = state.facetKey === 'name' ? nameItemsCache : locationItemsCache;
    if (!cache.has(cacheKey))
        cache.set(cacheKey, fetchFacetItems(state));

    return use(cache.get(cacheKey)!);
}

function useResults(state: SearchState) {
    const cacheKey = JSON.stringify(state);
    if (!resultsCache.has(cacheKey))
        resultsCache.set(cacheKey, fetchResults(state));

    return use(resultsCache.get(cacheKey)!);
}

export default function Context() {
    const pageSize = 5;

    return (
        <Layout>
            <FacetedSearch facets={facets} searchLabel="Search" pageSize={pageSize}>
                <ContentWithAsides leftAside={<AllFacets/>}>
                    <h2 className="mb-4">Results</h2>

                    <HookedSelectedFacets/>
                    <HookedResultsView<ResultCardBasicProps> useResults={useResults} id={result => result.title}>
                        {results => <ResultCardBasic {...results}/>}
                    </HookedResultsView>
                    <HookedPagination/>
                </ContentWithAsides>
            </FacetedSearch>
        </Layout>
    )
}

function AllFacets() {
    return (
        <FacetsSection>
            <HookedSearchFacet/>
            <HookedNumericRangeFacet facetKey="range" min={0} max={1000} step={1}/>
            <HookedFilterFacet facetKey="name" infoText="Info about this facet." useItems={useItems}/>
            <HookedFilterFacet facetKey="location" infoText="Info about this facet." useItems={useItems}/>
        </FacetsSection>
    );
}
