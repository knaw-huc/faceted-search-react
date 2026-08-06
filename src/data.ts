import type {ResultCardBasicProps, ResultCardSubResultsProps} from '../lib';

export const resultsBasic: ResultCardBasicProps[]  = [
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

export const results: ResultCardSubResultsProps[]  = [
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
