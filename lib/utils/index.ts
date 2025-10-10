export const getReadableRange = (value: string, formatNumbers: boolean = true, seperator: string = '-'): string => value.split(':').map(v => {
    const num = Number(v);
    return formatNumbers && !isNaN(num) ? num.toLocaleString() : v;
}).join(` ${seperator} `);
