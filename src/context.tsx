import {facetItemsList1, facetItemsList2, resultsBasic} from './data';
import Layout from './components/Layout';
import ContentWithAsides from './components/ContentWithAsides';
import {
    Facets,
    SearchState,
    FilterFacetItem,
    FacetsSection,
    FacetedSearch,
    HookedSearchFacet,
    HookedNumericRangeFacet,
    HookedFilterFacet,
    HookedFilterFacetItems,
    HookedSelectedFacets,
    HookedResultsView,
    ResultCardBasic,
    HookedPagination,
    getReadableRange,
    useHookedFilterFacet,
    useSearchState,
} from '../lib';

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

async function searchFn(state: SearchState) {
    console.log('Search called', state);
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
        items: resultsBasic,
        total: resultsBasic.length
    };
}

export default function Context() {
    const pageSize = 5;

    return (
        <Layout>
            <FacetedSearch facets={facets} searchFn={searchFn} searchLabel="Search" pageSize={pageSize}>
                <ContentWithAsides leftAside={<AllFacets/>}>
                    <h2 className="mb-4">Results</h2>

                    <HookedSelectedFacets/>
                    <HookedResultsView idKey="title" ResultComponent={ResultCardBasic}/>
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
            <HookedFilterFacet facetKey="name" infoText="Info about this facet.">
                <FacetItems items={facetItemsList1}/>
            </HookedFilterFacet>
            <HookedFilterFacet facetKey="location" infoText="Info about this facet.">
                <FacetItems items={facetItemsList2}/>
            </HookedFilterFacet>
        </FacetsSection>
    );
}

function FacetItems({items}: { items: FilterFacetItem[] }) {
    const state = useSearchState();
    const {selected, textFilter, sort} = useHookedFilterFacet();
    const selectedArr = Object.entries(selected)
        .filter(([, selected]) => selected === true)
        .map(([itemKey]) => itemKey);

    console.log('Filter facet items called', state, selectedArr, textFilter, sort);

    return (
        <HookedFilterFacetItems items={items}/>
    );
}
