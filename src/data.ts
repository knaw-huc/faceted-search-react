export const facetItemsList1 = [
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

export const facetItemsList2 = [
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

export const resultsBasic = [
    {
        title: 'Ucto-Webservice',
        link: '#',
        description: 'Ucto is a rule-based tokeniser for multiple languages. This is the webservice for it, for both humans and machines.',
        tags: ['Tool', 'Tagging'],
    },
    {
        title: 'Search-ui',
        link: '#',
        description: 'This repository contains the code for a Search UI to test the functionality of the basic vocabulary-recommender.',
        tags: ['Tool'],
    },
    {
        title: 'Udpipe-service',
        link: '#',
        description: 'UDPipe Frysk is a webservice for lemmatizing, part-of-speech tagging and dependency parsing of (West) Frisian texts using UDPipe (Straka and Straková, 2017). The tool allows for multiple ways of processing a text (the web service facilitates texts, files and web addresses). ',
        tags: ['Tool', 'Annotating'],
    }
];

export const results = [
    {
        title: 'What is Community Radio??',
        link: '#',
        items: [
            {
                columns: [
                    '05-01-1980',
                    '18:42:45',
                    'mitra@cdp.UUCP',
                ],
                mainColumnIndex: 2,
            },
            {
                columns: [
                    '26-03-1991',
                    '18:42:45',
                    'bobko@igc.apc.org',
                ],
                mainColumnIndex: 2,
            },
            {
                columns: [
                    '05-01-1980',
                    '18:42:45',
                    'mitra@cdp.UUCP',
                ],
                mainColumnIndex: 2,
            },
            {
                columns: [
                    '05-01-1980',
                    '18:42:45',
                    'danacf@igc.apc.org11',
                ],
                mainColumnIndex: 2,
            },
            {
                columns: [
                    '26-03-1991',
                    '18:42:45',
                    'bobko@igc.apc.org',
                ],
                mainColumnIndex: 2,
            },
        ],
        maxInitialItemsShown: 3
    }, {
        title: 'Nicaragua Election Radio Reports222',
        link: '#',
        items: [
            {
                columns: [
                    '05-01-1980',
                    '18:42:45',
                    'danacf@igc.apc.org11',
                ],
                mainColumnIndex: 2,
            },
            {
                columns: [
                    '26-03-1991',
                    '18:42:45',
                    'bobko@igc.apc.org',
                ],
                mainColumnIndex: 2,
            },
            {
                columns: [
                    '05-01-1980',
                    '18:42:45',
                    'mitra@cdp.UUCP',
                ],
                mainColumnIndex: 2,
            },
        ],
        maxInitialItemsShown: 3
    },
    {
        title: 'Women\'s Radio In Ireland',
        link: '#',
        items: [
            {
                columns: [
                    '05-01-1980',
                    '18:42:45',
                    'Raleigh Myers',
                ],
                mainColumnIndex: 2,
            },
            {
                columns: [
                    '26-03-1991',
                    '18:42:45',
                    'bobko@igc.apc.org',
                ],
                mainColumnIndex: 2,
            }
        ],
        maxInitialItemsShown: 3
    }
];
