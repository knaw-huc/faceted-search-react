import type {ResultCardBasicProps, SearchState, SearchResults} from '@knaw-huc/faceted-search-react';
import {resultsBasic} from './data';

const pageSize = 5;

const allResults: ResultCardBasicProps[] = Array.from({length: 12}, (_, i) => {
    const base = resultsBasic[i % resultsBasic.length];
    return {...base, title: `${base.title} ${i + 1}`};
});

export async function fetchResults(state: SearchState): Promise<SearchResults<ResultCardBasicProps>> {
    console.log('Fetch results called', state);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const matched = filterResults(allResults, state);
    const from = (state.page - 1) * pageSize;

    return {
        items: matched.slice(from, from + pageSize),
        total: matched.length,
    };
}

function filterResults(results: ResultCardBasicProps[], state: SearchState): ResultCardBasicProps[] {
    const query = state.query?.toLowerCase();
    if (!query)
        return results;

    return results.filter(result =>
        result.title.toLowerCase().includes(query) ||
        (result.description || '').toLowerCase().includes(query));
}
