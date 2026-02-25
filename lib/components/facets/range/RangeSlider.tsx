import {CSSProperties, ReactNode} from 'react';
import {Slider, SliderTrack, SliderThumb} from 'react-aria-components';
import Histogram, {HistogramItem} from './Histogram';

export interface RangeSliderProps {
    min: number;
    max: number;
    step: number;
    items?: HistogramItem[];
    curMinMax: [number, number];
    setCurMinMax: (minMax: [number, number]) => void;
    onChange: (min: number, max: number) => void;
    children: ReactNode;
}

export default function RangeSlider({
                                        min,
                                        max,
                                        step,
                                        items,
                                        curMinMax,
                                        setCurMinMax,
                                        onChange,
                                        children
                                    }: RangeSliderProps) {
    function onValueCommit(value: [number, number]) {
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
        <Slider aria-label="Range slider" value={curMinMax} minValue={min} maxValue={max} step={step}
                onChange={setCurMinMax} onChangeEnd={onValueCommit}>
            {items && <Histogram items={items}/>}
            <RangeSliderTrack/>
            {children}
        </Slider>
    );
}

function RangeSliderTrack() {
    return (
        <SliderTrack className="bg-neutral-200 h-2 rounded mx-3">
            {({state}) => <>
                <div className="bg-(--color-support-002) absolute h-full w-(--size) inset-s-(--start,0)"
                     style={{
                         '--start': state.getThumbPercent(0) * 100 + '%',
                         '--size': (state.getThumbPercent(1) - state.getThumbPercent(0)) * 100 + '%'
                     } as CSSProperties}/>

                {['min', 'max'].map((key, idx) =>
                    <SliderThumb key={key} index={idx}
                                 className="mt-1 bg-white ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-1 focus-visible:ring-1 focus-visible:outline-hidden"/>
                )}
            </>}
        </SliderTrack>
    );
}
