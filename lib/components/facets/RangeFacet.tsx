import {useId, useState} from 'react';
import {Root, Track, Range, Thumb} from '@radix-ui/react-slider';
import useTranslate from 'hooks/useTranslate';

export interface RangeFacetProps {
    min: number;
    max: number;
    step: number;
    startMin?: number;
    startMax?: number;
    onChange: (min: number, max: number) => void;
}

export default function RangeFacet({min, max, step, startMin = min, startMax = max, onChange}: RangeFacetProps) {
    const [curMinMax, setCurMinMax] = useState([startMin, startMax]);
    const {t} = useTranslate();

    const minId = useId();
    const maxId = useId();

    function onValueCommit(value: number[]) {
        if (value[0] < min) {
            value[0] = min;
        }
        if (value[1] > max) {
            value[1] = max;
        }
        setCurMinMax(value);
        onChange(value[0], value[1]);
    }

    return (
        <div className="mt-2">
            <Root value={curMinMax} min={min} max={max} step={step}
                  onValueChange={setCurMinMax} onValueCommit={onValueCommit}
                  className="relative flex w-full touch-none items-center select-none">
                <Track className="bg-neutral-200 relative h-2 rounded grow overflow-hidden w-full">
                    <Range className="bg-neutral-600 absolute h-full"/>
                </Track>

                {['min', 'max'].map(key =>
                    <Thumb key={key}
                           className="bg-white ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-2 focus-visible:ring-2 focus-visible:outline-hidden"/>
                )}
            </Root>

            <div className="flex justify-between mt-2">
                <div className="flex flex-col">
                    <label htmlFor={minId} className="text-sm font-bold">{t('range.min')}</label>
                    <input type="number" name="min" value={curMinMax[0]} id={minId}
                           onChange={e => onValueCommit([parseInt(e.target.value), curMinMax[1]])}
                           className="w-32 text-left text-sm border border-neutral-200 p-1 rounded"/>
                </div>

                <div className="flex flex-col">
                    <label htmlFor={maxId} className="text-sm font-bold text-right">{t('range.max')}</label>
                    <input type="number" name="max" value={curMinMax[1]} id={maxId}
                           onChange={e => onValueCommit([curMinMax[0], parseInt(e.target.value)])}
                           className="w-32 text-right text-sm border border-neutral-200 p-1 rounded"/>
                </div>
            </div>
        </div>
    );
}
