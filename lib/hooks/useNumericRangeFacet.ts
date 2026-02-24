import useFacet from './useFacet';

interface useNumericRangeFacetReturn {
    label: string;
    value?: [number, number];
    onChange: (min: number, max: number) => void;
}

export default function useNumericRangeFacet(facetKey: string, min: number, max: number): useNumericRangeFacetReturn {
    const [label, values, setValues] = useFacet(facetKey, '');

    const value = values[0];
    const hasValues = value.includes(':');
    const [minValue, maxValue] = value.split(':').map(Number);

    return {
        label,
        value: hasValues ? [
            minValue < min ? min : minValue,
            maxValue > max ? max : maxValue
        ] : undefined,
        onChange: (min: number, max: number) => setValues(`${min}:${max}`),
    };
}
