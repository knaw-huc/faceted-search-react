import useFacet from './useFacet';

interface useDateRangeFacetReturn {
    label: string;
    value?: [string, string];
    onChange: (min: string, max: string) => void;
}

export default function useDateRangeFacet(facetKey: string, min: string, max: string): useDateRangeFacetReturn {
    const [label, values, setValues] = useFacet(facetKey, '');

    const value = values[0];
    const hasValues = value.includes(':');
    const [minValue, maxValue] = value.split(':');

    return {
        label,
        value: hasValues
            ? [minValue ?? min, maxValue ?? max]
            : undefined,
        onChange: (min: string, max: string) => setValues(`${min}:${max}`),
    };
}
