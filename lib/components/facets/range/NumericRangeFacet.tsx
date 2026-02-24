import {startTransition, useEffect, useState} from 'react';
import useTranslate from 'hooks/useTranslate';
import RangeSlider from './RangeSlider';
import RangeInput from './RangeInput';
import NumberInputSlot from './NumberInputSlot';

export interface NumericRangeFacetProps {
    min: number;
    max: number;
    step: number;
    curMin?: number;
    curMax?: number;
    onChange: (min: number, max: number) => void;
}

export default function NumericRangeFacet({
                                              min,
                                              max,
                                              step,
                                              curMin = min,
                                              curMax = max,
                                              onChange
                                          }: NumericRangeFacetProps) {
    const [curMinMax, setCurMinMax] = useState<[number, number]>([curMin, curMax]);
    const {t} = useTranslate();

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurMinMax([curMin, curMax]);
    }, [curMin, curMax]);

    function onRangeChange(min: number, max: number) {
        setCurMinMax([min, max]);
        onRangeChangeCommit(min, max);
    }

    function onRangeChangeCommit(min: number, max: number) {
        startTransition(() => onChange(min, max));
    }

    return (
        <RangeSlider min={min} max={max} step={step} curMinMax={curMinMax}
                     setCurMinMax={setCurMinMax} onChange={onRangeChangeCommit}>
            <RangeInput
                fromElement={<NumberInputSlot label={t('range.min')} min={min} max={curMinMax[1]} step={step}
                                              current={curMinMax[0]}
                                              onChange={value => onRangeChange(value, curMinMax[1])}/>}
                toElement={<NumberInputSlot label={t('range.max')} min={curMinMax[0]} max={max} step={step}
                                            current={curMinMax[1]}
                                            onChange={value => onRangeChange(curMinMax[0], value)}/>}/>
        </RangeSlider>
    );
}
