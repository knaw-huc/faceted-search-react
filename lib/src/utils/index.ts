export const getReadableRange = (value: string, formatNumbers: boolean = true, seperator: string = '-'): string => value.split(':').map(v => {
    const num = Number(v);
    return formatNumbers && !isNaN(num) ? num.toLocaleString() : v;
}).join(` ${seperator} `);

export {default as getHighlight, type HighlightedText, type Offsets} from './getHighlight';
