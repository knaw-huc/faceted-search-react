import useFacet from './useFacet';

interface useRangeFacetReturn {
    label: string;
    value?: [number, number];
    onChange: (min: number, max: number) => void;
}

export default function useRangeFacet(facetKey: string, min: number, max: number): useRangeFacetReturn {
    const [label, values, setValues] = useFacet(facetKey, '');

    const value = values[0];
    const hasValues = !value.includes(':');
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
