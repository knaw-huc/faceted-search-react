import {useCallback, useContext, useMemo} from 'react';
import {HierarchyContext, type Index} from 'context/Hierarchy';

interface HierarchyReturn {
    toggle: (key: string) => void;
    isSelected: (key: string) => boolean;
    isPartial: (key: string) => boolean;
}

type NodeState = 'none' | 'selected' | 'partial';

function toggle(key: string, leaves: Set<string>, lookup: Map<string, NodeState>, index: Index,
                setSelected: (next: Set<string>) => void) {
    function visit(key: string) {
        const children = index.children.get(key) ?? [];
        if (children.length === 0) {
            if (isSelected) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return;
        }

        for (const child of children) {
            visit(child);
        }
    }

    const next = new Set(leaves);
    const isSelected = lookup.get(key) === 'selected';
    visit(key);

    const minimal = buildMinimalSelection(next, index);
    setSelected(minimal);
}

function buildLookup(selected: Set<string>, index: Index) {
    function visit(key: string): NodeState {
        const childIds = index.children.get(key) ?? [];
        if (childIds.length === 0) {
            const state: NodeState = selected.has(key) ? 'selected' : 'none';
            lookup.set(key, state);
            return state;
        }

        let noSelected = 0, noPartial = 0;
        for (const child of childIds) {
            const state = visit(child);

            if (state === 'selected') {
                noSelected++;
            } else if (state === 'partial') {
                noPartial++;
            }
        }

        const state: NodeState = noSelected === childIds.length && noPartial === 0
            ? 'selected'
            : (noSelected > 0 || noPartial > 0 ? 'partial' : 'none');
        lookup.set(key, state);
        return state;
    }

    const lookup = new Map<string, NodeState>();
    for (const key of index.roots) {
        visit(key);
    }

    return lookup;
}

function buildLeavesSelection(selected: Set<string>, index: Index): Set<string> {
    function visit(key: string) {
        const children = index.children.get(key) ?? [];
        if (children.length === 0) {
            leaves.add(key);
            return;
        }

        for (const child of children) {
            visit(child);
        }
    }

    const leaves = new Set<string>();
    for (const key of selected) {
        visit(key);
    }

    return leaves;
}

function buildMinimalSelection(leaves: Set<string>, index: Index): Set<string> {
    function visit(key: string): boolean {
        const children = index.children.get(key) ?? [];
        if (children.length === 0) {
            if (leaves.has(key)) {
                minimal.add(key);
                return true;
            }
            return false;
        }

        let allSelected = true;
        for (const child of children) {
            if (!visit(child)) {
                allSelected = false;
            }
        }

        if (allSelected) {
            for (const child of children) {
                removeSubtree(child);
            }

            minimal.add(key);
            return true;
        }

        return false;
    }

    function removeSubtree(key: string) {
        minimal.delete(key);
        for (const child of index.children.get(key) ?? []) {
            removeSubtree(child);
        }
    }

    const minimal = new Set<string>();
    for (const root of index.roots) {
        visit(root);
    }

    return minimal;
}

export default function useHierarchy(): HierarchyReturn {
    const ctx = useContext(HierarchyContext);
    if (!ctx) {
        throw new Error('Missing Hierarchy.Provider in the tree');
    }

    const {selected, setSelected, index} = ctx;

    const leaves = useMemo(() => buildLeavesSelection(selected, index), [selected, index]);
    const lookup = useMemo(() => buildLookup(leaves, index), [leaves, index]);

    return {
        toggle: useCallback((key: string) => toggle(key, leaves, lookup, index, setSelected), [leaves, lookup, index, setSelected]),
        isSelected: useCallback((key: string) => lookup.get(key) === 'selected', [lookup]),
        isPartial: useCallback((key: string) => lookup.get(key) === 'partial', [lookup]),
    };
}
