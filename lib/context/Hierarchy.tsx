import {type ReactNode, createContext, useMemo} from 'react';

export interface Index {
    roots: string[];
    parents: Map<string, string | null>;
    children: Map<string, string[]>;
}

function buildIndex<I>(items: I[], getKey: (item: I) => string, getChildren: (item: I) => I[] | undefined): Index {
    function visit(items: I[], p: string | null) {
        for (const item of items) {
            const key = getKey(item);
            parents.set(key, p);

            const childItems = getChildren(item) ?? [];
            children.set(key, childItems.map(getKey));

            visit(childItems, key);
        }
    }

    const parents = new Map<string, string | null>();
    const children = new Map<string, string[]>();

    visit(items, null);

    return {roots: items.map(getKey), parents, children};
}

export const HierarchyContext = createContext<{
    selected: Set<string>,
    setSelected: (selected: Set<string>) => void,
    index: Index
} | null>(null);

export default function Hierarchy<I>({items, selected, setSelected, getKey, getChildren, children}: {
    items: I[];
    selected: Set<string>;
    setSelected: (selected: Set<string>) => void;
    getKey: (item: I) => string;
    getChildren: (item: I) => I[] | undefined;
    children: ReactNode;
}) {
    const index = useMemo(() => buildIndex(items, getKey, getChildren), [items, getKey, getChildren]);

    return (
        <HierarchyContext.Provider value={{selected, setSelected, index}}>
            {children}
        </HierarchyContext.Provider>
    );
}
