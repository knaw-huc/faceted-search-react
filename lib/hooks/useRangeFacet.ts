import useFacet from './useFacet.ts';

interface useRangeFacetReturn {
    value?: [number, number];
    onChange: (min: number, max: number) => void;
}

export default function useRangeFacet(facetKey: string, min: number, max: number): useRangeFacetReturn {
    const [values, setValues] = useFacet(facetKey);

    const value = Array.isArray(values) ? values[0] : values;
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
