# Faceted Search React

Faceted Search React is a library for building faceted search interfaces in React applications. It provides reusable
components and hooks for filtering, sorting, and displaying search results.

Install the package using:
`npm install @knaw-huc/faceted-search-react`

Build the package using:
`npm run build`

Run a demo application using:
`npm run dev`

The demo application showcases the design. By providing the hash `#context` the components and hooks provided by the
library are showcased.

## How to use this library

This library provides a set of reusable basic components for use in a faceted search interface. It also allows setting
up a search implementation using a `FacetedSearch` context:

```tsx
import {FacetedSearch} from '@knaw-huc/faceted-search-react';

function App() {
    return (
        <FacetedSearch searchFn={searchFn} pageSize={pageSize}>
            <YourAppComponents/>
        </FacetedSearch>
    );
}
```

The `searchFn` is a function that takes a `SearchState` object with the current search state and returns the search
results (or a promise of search results): `SearchResults<R>`. The `pageSize` is the number of results to show per page.

```ts
interface SearchState {
    facetValues: Record<string, string[]>;
    page: number;
    sort?: string;
}

interface SearchResults<R> {
    items: R[];
    total: number;
}
```

Within the `FacetedSearch` context, you can use the provided hooks to build your search interface. The library also
provides hooked components that bind the basic components with these hooks.

## Using the basic components

### Component `FacetsSection`

The `FacetsSection` component is a container for displaying multiple facets in a section. On mobile devices, it hides
the section behind a button.

| Parameter  | Value type  | Required? | Default value | Description                                       |
|------------|-------------|-----------|---------------|---------------------------------------------------|
| `children` | `ReactNode` | ✓         |               | The content to display inside the facets section. |

### Component `Facet`

The `Facet` component is a reusable UI component designed to display a collapsible section with a label, optional
informational text, and child content. It supports toggling visibility and provides accessibility features.

| Parameter     | Value type  | Required? | Default value | Description                                                     |
|---------------|-------------|-----------|---------------|-----------------------------------------------------------------|
| `label`       | `string`    | ✓         |               | The label displayed at the top of the facet.                    |
| `infoText`    | `string`    |           |               | Optional text providing additional information about the facet. |
| `startOpen`   | `boolean`   |           | `true`        | Determines whether the facet starts in an open state.           |
| `allowToggle` | `boolean`   |           | `true`        | Allows toggling the visibility of the facet content.            |
| `children`    | `ReactNode` | ✓         |               | The content to display inside the facet when it is open.        |

### Component `SearchFacet`

The `SearchFacet` component includes a search input field. It allows users to filter search results based on a search
term. It is designed to be used within a `FacetsSection`. Though not to be used within a `Facet` component, it can be
used alongside other facets.

| Parameter      | Value type                | Required? | Default value | Description                                                 |
|----------------|---------------------------|-----------|---------------|-------------------------------------------------------------|
| `initialQuery` | `string`                  |           |               | The initial search query to show in the search input field. |
| `onSearch`     | `(query: string) => void` | ✓         |               | Callback function to handle search input changes.           |

### Component `FilterFacet`

The `FilterFacet` component is designed to display a list of filter options that users can select to refine their search
results. It supports hierarchical filters. The component is designed to be used within a `FacetsSection` and a `Facet`
and can be used alongside other facets.

| Parameter            | Value type                                        | Required? | Default value | Description                                                                                      |
|----------------------|---------------------------------------------------|-----------|---------------|--------------------------------------------------------------------------------------------------|
| `items`              | `FilterFacetItem[] \| Promise<FilterFacetItem[]>` | ✓         |               | The facet items to render. May be passed as a promise to indicate the results are still loading. |
| `selected`           | `Selected`                                        | ✓         |               | An object that keeps track of the selected facet items.                                          |
| `maxInitialItems`    | `number`                                          |           |               | The maximum number of items to show initially.                                                   |
| `showAmount`         | `boolean`                                         |           | `true`        | Whether to show per item for how many search results it applies.                                 |
| `itemsClosed`        | `boolean`                                         |           | `false`       | Whether to hide the child items in a hierarchical structure.                                     |
| `onSelect`           | `(selected: Selected) => void`                    | ✓         |               | Callback function to handle changes in the selected items.                                       |
| `onTextFilterChange` | `(value: string) => void`                         |           |               | Callback function to handle changes in the text filter input.                                    |
| `onSort`             | `(type: Sort) => void`                            |           |               | Callback function to handle sorting change by the user.                                          |

```ts
interface FilterFacetItem {
    itemKey: string;
    label: string;
    amount: number;
    children?: FilterFacetItem[];
}

type SelectedState = boolean | 'indeterminate';
type Selected = { [itemKey: string]: SelectedState };
type Sort = 'asc' | 'desc' | 'hits';
```

### Component `RangeFacet`

The `RangeFacet` component is designed to display a range filter that allows users to select a range of values. The
component is designed to be used within a `FacetsSection` and a `Facet` and can be used alongside other facets.

| Parameter  | Value type                           | Required? | Default value | Description                                |
|------------|--------------------------------------|-----------|---------------|--------------------------------------------|
| `min`      | `number`                             | ✓         |               | The minimum of the allowed range.          |
| `max`      | `number`                             | ✓         |               | The maximum of the allowed range.          |
| `step`     | `number`                             | ✓         |               | The step size for the range.               |
| `startMin` | `number`                             |           | `min`         | The initial minimum value.                 |
| `startMax` | `number`                             |           | `max`         | The initial maximum value.                 |
| `onChange` | `(min: number, max: number) => void` | ✓         |               | Callback function to handle range changes. |

### Component `SelectedFacets`

The `SelectedFacets` component displays the currently selected facets and allows users to clear them.

| Parameter        | Value type        | Required? | Default value | Description                                 |
|------------------|-------------------|-----------|---------------|---------------------------------------------|
| `selectedFacets` | `SelectedFacet[]` | ✓         |               | A list of selected facets to display.       |
| `onClear`        | `() => void`      | ✓         |               | Callback function to clear selected facets. |

```ts
interface SelectedFacet {
    facet?: string;
    value: string;
    onRemove: () => void;
}
```

### Component `Pagination`

The `Pagination` component is designed to display pagination controls for navigating through search results.

| Parameter     | Value type                   | Required? | Default value | Description                        |
|---------------|------------------------------|-----------|---------------|------------------------------------|
| `currentPage` | `number`                     | ✓         |               | The current page number.           |
| `pages`       | `{ [page: number]: string }` | ✓         |               | The pages to render and the links. |
| `prev`        | `string`                     |           |               | The link to the previous page.     |
| `next`        | `string`                     |           |               | The link to the next page.         |

### Component `ResultsView`

The `ResultsView` is a container for search results. It will show a loading state if the results are still being loaded.

| Parameter  | Value type  | Required? | Default value | Description                                     |
|------------|-------------|-----------|---------------|-------------------------------------------------|
| `children` | `ReactNode` | ✓         |               | The content to display inside the results view. |

### Component `ResultCard`

The `ResultCard` container is designed to hold a single search result card. It will show a loading state if the results
are still being loaded. It is used within the `ResultsView` to display individual search results in a card format.

| Parameter  | Value type  | Required? | Default value | Description                                    |
|------------|-------------|-----------|---------------|------------------------------------------------|
| `children` | `ReactNode` | ✓         |               | The content to display inside the result card. |

### Component `ResultCardBasic`

The `ResultCardBasic` component is a basic implementation of a search result card. It is designed to be used within
the `ResultCard` and displays the title, description and the tags.

| Parameter     | Value type | Required? | Default value | Description                                        |
|---------------|------------|-----------|---------------|----------------------------------------------------|
| `title`       | `string`   | ✓         |               | The title of this search result.                   |
| `link`        | `string`   | ✓         |               | The link to the detail page of this search result. |
| `description` | `string`   | ✓         |               | The description of this search result.             |
| `tags`        | `string[]` |           |               | The tags for this search result.                   |

### Component `ResultCardSubResults`

The `ResultCardSubResults` component is designed to display sub-results within a search result card. It is designed to
be used within the `ResultCard`.

| Parameter              | Value type                   | Required? | Default value | Description                                          |
|------------------------|------------------------------|-----------|---------------|------------------------------------------------------|
| `title`                | `string`                     | ✓         |               | The title of this search result.                     |
| `link`                 | `string`                     | ✓         |               | The link to the detail page of this search result.   |
| `items`                | `ResultCardSubResultsItem[]` | ✓         |               | A list with the sub results to render.               |
| `maxInitialItemsShown` | `number`                     |           |               | The maximum number of sub-results to show initially. |

```ts
interface ResultCardSubResultsItem {
    columns: string[];
    mainColumnIndex: number;
    onClick?: () => void;
}
```

## Using the search implementation hooks

### Hook `useSearchState`

The `useSearchState` hook is used to obtain the current search state `SearchState`.

```ts
interface SearchState {
    facetValues: Record<string, string[]>;
    page: number;
    sort?: string;
}
```

### Hook `useFacet`

The `useFacet` hook is used to register and manage the state of a specific facet.

| Parameter      | Value type                            | Description                                                        |
|----------------|---------------------------------------|--------------------------------------------------------------------|
| `facetKey`     | `string`                              | The key of the facet to manage.                                    |
| `label`        | `string`                              | The human readable label for the facet.                            |
| `getReadable`  | `((value: string) => string) \| null` | Callback function to get a human readable value for a given value. |
| `defaultValue` | `string \| string[]`                  | The default value(s) for this facet.                               |

The hook returns two values:

1. `string | string[]`: The current value(s) for this facet.
2. `(value: string | string[]) => void`: A function to set the value(s) for this facet.

### Hook `useFacets`

The `useFacets` hook is used to work with the state of all facets in the search interface. It returns the following
values:

1. `Record<string, Facet>`: An object containing all registered facets, where the keys are the facet keys and the values
   are objects with the facet's label and a function to get a human-readable value for a given value.
2. `Record<string, string[]>`: An object containing the current values for all facets, where the keys are the facet keys
   and the values are arrays of selected values.
3. `(facetKey: string, value: string) => void`: A function to add a value for a specific facet.
4. `(facetKey: string, value: string) => void`: A function to remove a value for a specific facet.
5. `() => void`: A function to clear all selected facets.

```ts
interface Facet {
    label: string;
    getReadable: ((value: string) => string) | null;
}
```

### Hook `useSearchFacet`

The `useSearchFacet` hook is used to register and manage the state of a search facet. It provides functionality to
fetch search results based on the current search state and the search term.

| Parameter  | Value type | Description                                    |
|------------|------------|------------------------------------------------|
| `facetKey` | `string`   | The key of the search facet to manage.         |
| `label`    | `string`   | The human readable label for the search facet. |

The hook returns an object `useSearchFacetReturn` with the current search term and a function to change the search term.

```ts
interface useSearchFacetReturn {
    query: string;
    onSearch: (query: string) => void;
}
```

### Hook `useFilterFacet`

The `useFilterFacet` hook is used to register and manage the state of a filter facet. It provides functionality to fetch
items whenever the search state, the selected items, the text filter or the sorting changes.

| Parameter      | Value type     | Description                                            |
|----------------|----------------|--------------------------------------------------------|
| `facetKey`     | `string`       | The key of the filter facet to manage.                 |
| `label`        | `string`       | The human readable label for the filter facet.         |
| `fetchItemsFn` | `FetchItemsFn` | Callback function to fetch all the filter facet items. |

The hook returns an object `useFilterFacetReturn` with the items to display, the selected items and functions to
interact with the filter facet.

```ts
type FetchItemsFn = (state: SearchState, selected: string[], textFilter?: string, sort?: Sort) => FilterFacetItem[] | Promise<FilterFacetItem[]>;

interface useFilterFacetReturn {
    items: FilterFacetItem[] | Promise<FilterFacetItem[]>;
    selected: Selected;
    onSelect: (selected: Selected) => void;
    onTextFilterChange: (textFilter: string) => void;
    onSort: (sort: Sort) => void;
}

interface FilterFacetItem {
    itemKey: string;
    label: string;
    amount: number;
    children?: FilterFacetItem[];
}

type Selected = { [itemKey: string]: SelectedState };
type SelectedState = boolean | 'indeterminate';
type Sort = 'asc' | 'desc' | 'hits';
```

### Hook `useRangeFacet`

The `useRangeFacet` hook is used to register and manage the state of a range facet. It provides functionality to set and
get the current range values.

| Parameter  | Value type | Description                                   |
|------------|------------|-----------------------------------------------|
| `facetKey` | `string`   | The key of the range facet to manage.         |
| `label`    | `string`   | The human readable label for the range facet. |
| `min`      | `number`   | The minimum value of the range.               |
| `max`      | `number`   | The maximum value of the range.               |

The hook returns an object `useRangeFacetReturn` with the current range and a function to change the range.

```ts
interface useRangeFacetReturn {
    value?: [number, number];
    onChange: (min: number, max: number) => void;
}
```

### Hook `useSearchResults`

The `useSearchResults` hook is used to fetch the search results `SearchResults` based on the current search state.

```ts
interface SearchResults<R> {
    items: R[];
    total: number;
}
```

### Hook `usePagination`

The `usePagination` hook is used to manage the pagination state of the search results. It returns a `Pagination` object
with the current page, page size, and functions to navigate through the pages.

```ts
interface Pagination {
    page: number;
    pageSize: number;
    setPage: (page: number) => void;
    getPrevPages: (max: number) => number[];
    getNextPages: (total: number, max: number) => number[];
}
```

## Using the search implementation components

### Component `HookedSearchFacet`

The `HookedSearchFacet` component is a wrapper around the `SearchFacet` component that uses the `useSearchFacet` hook to
manage the search state. It provides a search input field that allows users to filter search results based on a search
term.

| Parameter  | Value type | Required? | Default value | Description                                  |
|------------|------------|-----------|---------------|----------------------------------------------|
| `facetKey` | `string`   | ✓         |               | The key of the search facet to manage.       |
| `label`    | `string`   | ✓         |               | The label displayed at the top of the facet. |

### Component `HookedFilterFacet`

The `HookedFilterFacet` component is a wrapper around the `FilterFacet` component that uses the `useFilterFacet` hook
to manage the filter state. It provides a list of filter options that users can select to refine their search results.

| Parameter         | Value type     | Required? | Default value | Description                                                      |
|-------------------|----------------|-----------|---------------|------------------------------------------------------------------|
| `facetKey`        | `string`       | ✓         |               | The key of the filter facet to manage.                           |
| `label`           | `string`       | ✓         |               | The human readable label for the filter facet.                   |
| `infoText`        | `string`       |           |               | Optional text providing additional information about the facet.  |
| `fetchItemsFn`    | `FetchItemsFn` | ✓         |               | Callback function to fetch all the filter facet items.           |
| `maxInitialItems` | `number`       |           |               | The maximum number of items to show initially.                   |
| `showAmount`      | `boolean`      |           |               | Whether to show per item for how many search results it applies. |
| `itemsClosed`     | `boolean`      |           |               | Whether to hide the child items in a hierarchical structure.     |
| `allowFilter`     | `boolean`      |           | `true`        | Whether to allow filtering of the items.                         |
| `allowSort`       | `boolean`      |           | `true`        | Whether to allow sorting of the items.                           |
| `startOpen`       | `boolean`      |           | `true`        | Determines whether the facet starts in an open state.            |
| `allowToggle`     | `boolean`      |           | `true`        | Allows toggling the visibility of the facet content.             |

```ts
type FetchItemsFn = (state: SearchState, selected: string[], textFilter?: string, sort?: Sort) => FilterFacetItem[] | Promise<FilterFacetItem[]>;
type Sort = 'asc' | 'desc' | 'hits';

interface FilterFacetItem {
    itemKey: string;
    label: string;
    amount: number;
    children?: FilterFacetItem[];
}
```

### Component `HookedRangeFacet`

The `HookedRangeFacet` component is a wrapper around the `RangeFacet` component that uses the `useRangeFacet` hook to
manage the range state. It provides a range input that allows users to select a range of values.

| Parameter     | Value type | Required? | Default value | Description                                                     |
|---------------|------------|-----------|---------------|-----------------------------------------------------------------|
| `facetKey`    | `string`   | ✓         |               | The key of the range facet to manage.                           |
| `label`       | `string`   | ✓         |               | The label displayed at the top of the facet.                    |
| `infoText`    | `string`   |           |               | Optional text providing additional information about the facet. |
| `min`         | `number`   | ✓         |               | The minimum of the allowed range.                               |
| `max`         | `number`   | ✓         |               | The maximum of the allowed range.                               |
| `step`        | `number`   | ✓         |               | The step size for the range.                                    |
| `startMin`    | `number`   |           | `min`         | The initial minimum value.                                      |
| `startMax`    | `number`   |           | `max`         | The initial maximum value.                                      |
| `allowToggle` | `boolean`  |           | `true`        | Allows toggling the visibility of the facet content.            |
| `startOpen`   | `boolean`  |           | `true`        | Determines whether the facet starts in an open state.           |

### Component `HookedSelectedFacets`

The `HookedSelectedFacets` component is a wrapper around the `SelectedFacets` component that uses the `useFacets` hook
to manage the selected facets. It displays the currently selected facets and allows users to clear them.

### Component `HookedPagination`

The `HookedPagination` component is a wrapper around the `Pagination` component that uses the `usePagination` hook to
manage the pagination state and the `useSearchResults` hook to determine the total search result size. It provides
pagination controls for navigating through search results.

### Component `HookedResultsView`

The `HookedResultsView` component is a wrapper around the `ResultsView` component that uses the `useSearchResults` hook
to fetch the search results.

| Parameter         | Value type             | Required? | Default value | Description                                               |
|-------------------|------------------------|-----------|---------------|-----------------------------------------------------------|
| `idKey`           | `keyof R`              | ✓         |               | The key of the results that identifies a specific result. |
| `ResultComponent` | `FunctionComponent<R>` | ✓         |               | The search result card component to render the results.   |

