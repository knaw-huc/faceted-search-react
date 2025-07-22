import {facetItemsList1, facetItemsList2, resultsBasic} from './data';
import Layout from './components/Layout';
import ContentWithAsides from './components/ContentWithAsides';
import {
    Sort,
    Facets,
    SearchState,
    FacetsSection,
    FacetedSearch,
    HookedSearchFacet,
    HookedRangeFacet,
    HookedFilterFacet,
    HookedSelectedFacets,
    HookedResultsView,
    ResultCardBasic,
    HookedPagination,
    getReadableRange,
} from '../lib';

const facets: Facets = {
    range: {
        label: 'Range',
        getReadable: getReadableRange
    },
    name: {
        label: 'Name',
    },
    location: {
        label: 'Location',
    }
};

async function searchFn(state: SearchState) {
    console.log('Search called', state);
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
        items: resultsBasic,
        total: resultsBasic.length
    };
}

async function loadFilterFacetItemsList1Fn(state?: SearchState, selected?: string[], textFilter?: string, sort?: Sort) {
    console.log('Filter facet items list 1 called', state, selected, textFilter, sort);
    await new Promise(resolve => setTimeout(resolve, 2000));
    return facetItemsList1;
}

async function loadFilterFacetItemsList2Fn(state?: SearchState, selected?: string[], textFilter?: string, sort?: Sort) {
    console.log('Filter facet items list 2 called', state, selected, textFilter, sort);
    await new Promise(resolve => setTimeout(resolve, 2000));
    return facetItemsList2;
}

export default function Context() {
    const pageSize = 5;

    function Facets() {
        return (
            <FacetsSection>
                <HookedSearchFacet/>
                <HookedRangeFacet facetKey="range" min={0} max={1000} step={1}/>
                <HookedFilterFacet facetKey="name" infoText="Info about this facet."
                                   fetchItemsFn={loadFilterFacetItemsList1Fn}/>
                <HookedFilterFacet facetKey="location" infoText="Info about this facet."
                                   fetchItemsFn={loadFilterFacetItemsList2Fn}/>
            </FacetsSection>
        );
    }

    return (
        <Layout>
            <FacetedSearch facets={facets} searchFn={searchFn} searchLabel="Search" pageSize={pageSize}>
                <ContentWithAsides leftAside={<Facets/>}>
                    <h2 className="mb-4">Results</h2>

                    <HookedSelectedFacets/>
                    <HookedResultsView idKey="title" ResultComponent={ResultCardBasic}/>
                    <HookedPagination/>
                </ContentWithAsides>
            </FacetedSearch>
        </Layout>
    )
}

