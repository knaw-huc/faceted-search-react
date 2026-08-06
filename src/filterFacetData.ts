import type {FilterFacetItem, FilterFacetState, Sort} from '../lib';

export const nameFacetData = [
    {
        itemKey: 'assum',
        label: 'Assum',
        amount: 12
    },
    {
        itemKey: 'berends',
        label: 'Berends',
        amount: 48
    },
    {
        itemKey: 'bertens',
        label: 'Bertens',
        amount: 111
    },
    {
        itemKey: 'blankhart',
        label: 'Blankhart',
        amount: 312
    }
];

export const locationFacetData = [
    {
        itemKey: 'abidjan',
        label: 'Abidjan',
        amount: 12
    },
    {
        itemKey: 'accra',
        label: 'Accra',
        amount: 48
    },
    {
        itemKey: 'europa',
        label: 'Europa',
        amount: 121
    },
    {
        itemKey: 'benelux',
        label: 'Benelux',
        amount: 87,
        children: [
            {
                itemKey: 'nederland',
                label: 'Nederland',
                amount: 45,
                children: [
                    {
                        itemKey: 'amsterdam',
                        label: 'Amsterdam',
                        amount: 1,
                        children: [
                            {
                                itemKey: 'jordaan',
                                label: 'Jordaan',
                                amount: 2
                            }, {
                                itemKey: 'bos-en-lommer',
                                label: 'Bos en Lommer',
                                amount: 3
                            }, {
                                itemKey: 'de-pijp',
                                label: 'De Pijp',
                                amount: 2
                            }
                        ]
                    },
                    {
                        itemKey: 'utrecht',
                        label: 'Utrecht',
                        amount: 7,
                        children: [
                            {
                                itemKey: 'oudwijk',
                                label: 'Oudwijk',
                                amount: 7
                            }
                        ]
                    },
                    {
                        itemKey: 'rotterdam',
                        label: 'Rotterdam',
                        amount: 4,
                        children: [
                            {
                                itemKey: 'stadsdriehoek',
                                label: 'Stadsdriehoek',
                                amount: 2
                            }, {
                                itemKey: 'oude-westen',
                                label: 'Oude Westen',
                                amount: 2
                            }
                        ]
                    }
                ]
            },
            {
                itemKey: 'belgie',
                label: 'Belgie',
                amount: 35
            }
        ]
    },
    {
        itemKey: 'ankara',
        label: 'Ankara',
        amount: 12
    },
    {
        itemKey: 'bagdad',
        label: 'Bagdad',
        amount: 55
    }
];

export async function fetchFacetItems(state: FilterFacetState): Promise<FilterFacetItem[]> {
    console.log(`Fetch items called for "${state.facetKey}"`, state);
    await new Promise(resolve => setTimeout(resolve, 750));

    const items = state.facetKey === 'name' ? nameFacetData : locationFacetData;

    return sortItems(filterItems(items, state.textFilter), state.sort);
}

function filterItems(items: FilterFacetItem[], textFilter: string): FilterFacetItem[] {
    if (!textFilter)
        return items;

    const matches = (item: FilterFacetItem): boolean =>
        item.label.toLowerCase().includes(textFilter.toLowerCase()) ||
        (item.children || []).some(matches);

    return items.filter(matches).map(item =>
        item.children ? {...item, children: filterItems(item.children, textFilter)} : item);
}

function sortItems(items: FilterFacetItem[], sort: Sort): FilterFacetItem[] {
    const compare = (a: FilterFacetItem, b: FilterFacetItem) => {
        switch (sort) {
            case 'asc':
                return a.label.localeCompare(b.label);
            case 'desc':
                return b.label.localeCompare(a.label);
            case 'hits':
            default:
                return b.amount - a.amount;
        }
    };

    return [...items].sort(compare).map(item =>
        item.children ? {...item, children: sortItems(item.children, sort)} : item);
}
