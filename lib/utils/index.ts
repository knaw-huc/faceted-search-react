export const getReadableRange = (value: string): string => value.split(':').map(v => {
    const num = Number(v);
    return isNaN(num) ? v : num.toLocaleString();
}).join(' - ');
