import type {SearchState} from './FacetedSearchStore';

export default function areStatesEqual(a: SearchState, b: SearchState): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
}
