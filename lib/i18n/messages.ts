import { defineMessages } from "react-intl";
import { uiId } from "./ids";

/**
 * These are library-tied messages and meant to be overridden by applications using the faceted-search-react library
 */
export const uiMessages = defineMessages({

    /* Facet.tsx */
    facetLabel: { id: uiId('facetLabel'), defaultMessage: 'Facet for {label}' },
    skipLabelAndGoToNextFacet: { id: uiId('skipLabelAndGoToNextFacet'), defaultMessage: 'Skip {label} and go to next facet' },
    clickForFacetDescription: { id: uiId('clickForFacetDescription'), defaultMessage: 'Click for facet description' },
    clickToCloseFacet: { id: uiId('clickToCloseFacet'), defaultMessage: 'Click to close facet' },
    clickToOpenFacet: { id: uiId('clickToOpenFacet'), defaultMessage: 'Click to open facet' },
    orderFromAToZ: { id: uiId('orderFromAToZ'), defaultMessage: 'Order from A to Z' },
    orderFromZToA: { id: uiId('orderFromZToA'), defaultMessage: 'Order from Z to A' },
    orderByAmountOfResults: { id: uiId('orderByAmountOfResults'), defaultMessage: 'Order by amount of results' },
    amountOfResults: { id: uiId('amountOfResults'), defaultMessage: 'Amount of results' },

    /* FilterFacet.tsx */
    filterOnFacetItems: { id: uiId('filterOnFacetItems'), defaultMessage: 'Filter on facet items' },
    filterOnFacetItemsPlaceHolder: { id: uiId('filterOnFacetItemsPlaceHolder'), defaultMessage: 'Type to filter' },

    /* SearchFacet.tsx */
    search: {id: uiId('search'), defaultMessage: 'Search'},
    searchForText: { id: uiId('searchForText'), defaultMessage: 'Search for text' },

    /* SelectedFacets.tsx */
    selectedFilters: { id: uiId('selectedFilters'), defaultMessage: 'Selected filters:' },
    clickToRemoveFromSelectedFilters: { id: uiId('clickToRemoveFromSelectedFilters'), defaultMessage: 'Click to remove from selected filters' },
    clearFilters: { id: uiId('clearFilters'), defaultMessage: 'Clear filters' },

    /* Pagination.tsx */
    paginationFirstPage: { id: uiId('paginationFirstPage'), defaultMessage: 'Go to first page' },
    paginationLastPage: { id: uiId('paginationLastPage'), defaultMessage: 'Go to last page' },
    paginationPreviousPage: { id: uiId('paginationPreviousPage'), defaultMessage: 'Go to previous page' },
    paginationNextPage: { id: uiId('paginationNextPage'), defaultMessage: 'Go to next page' },
    paginationNthPage: { id: uiId('paginationNthPage'), defaultMessage: 'Go to page {page}' },

    /* ResultCardSubResults.tsx */
    seeNMoreItems: { id: uiId('seeNMoreItems'), defaultMessage: 'See {moreItems} more items' },

    /* FacetsSection.tsx */
    searchFilters: { id: uiId('searchFilters'), defaultMessage: 'Search filters' },

    /* RangeFacet.tsx */
    rangeMinimum: { id: uiId('rangeMinimum'), defaultMessage: 'Range minimum' },
    rangeMaximum: { id: uiId('rangeMaximum'), defaultMessage: 'Range maximum' },
    changeRange: { id: uiId('changeRange'), defaultMessage: 'Change range' },
});
