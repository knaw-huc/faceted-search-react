import useFacet from './useFacet';

interface useRangeFacetReturn {
    value?: [number, number];
    onChange: (min: number, max: number) => void;
}

const getReadableValue = (value: string): string =>
    value.split(':').map(v => {
        const num = Number(v);
        return isNaN(num) ? v : num.toLocaleString();
    }).join(' - ');

export default function useRangeFacet(facetKey: string, label: string, min: number, max: number): useRangeFacetReturn {
    const [values, setValues] = useFacet(facetKey, label, getReadableValue, '');

    const value = values[0];
    const hasValues = !value.includes(':');
    const [minValue, maxValue] = value.split(':').map(Number);

    return {
        value: hasValues ? [
            minValue < min ? min : minValue,
            maxValue > max ? max : maxValue
        ] : undefined,
        onChange: (min: number, max: number) => setValues(`${min}:${max}`),
    };
}
