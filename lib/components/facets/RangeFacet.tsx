import {useEffect, useId, useRef} from 'react';
import './RangeFacet.module.css';

export interface RangeFacetProps {
    min: number;
    max: number;
    step: number;
    startMin?: number;
    startMax?: number;
    onChange: (min: number, max: number) => void;
}

export default function RangeFacet({min, max, step, startMin = min, startMax = max}: RangeFacetProps) {
    const minId = useId();
    const maxId = useId();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const rangeMin = 100;
        const range = ref.current.querySelector('.range-selected');
        const rangeInput = ref.current.querySelectorAll<HTMLInputElement>('.range-input input');
        const rangePrice = ref.current.querySelectorAll<HTMLInputElement>('.range-price input');

        rangeInput.forEach(input => {
            input.addEventListener('input', e => {
                let minRange = parseInt(rangeInput[0].value);
                let maxRange = parseInt(rangeInput[1].value);
                if (maxRange - minRange < rangeMin) {
                    // @ts-ignore
                    if (e.target?.className === 'min') {
                        // @ts-ignore
                        rangeInput[0].value = maxRange - rangeMin;
                    }
                    else {
                        // @ts-ignore
                        rangeInput[1].value = minRange + rangeMin;
                    }
                }
                else {
                    // @ts-ignore
                    rangePrice[0].value = minRange;
                    // @ts-ignore
                    rangePrice[1].value = maxRange;
                    // @ts-ignore
                    range.style.left = (minRange / rangeInput[0].max) * 100 + '%';
                    // @ts-ignore
                    range.style.right = 100 - (maxRange / rangeInput[1].max) * 100 + '%';
                }
            });
        });

        rangePrice.forEach(input => {
            input.addEventListener('input', e => {
                let minPrice = rangePrice[0].value;
                let maxPrice = rangePrice[1].value;
                // @ts-ignore
                if (maxPrice - minPrice >= rangeMin && maxPrice <= rangeInput[1].max) {
                    // @ts-ignore
                    if (e.target?.className === 'min') {
                        rangeInput[0].value = minPrice;
                        // @ts-ignore
                        range.style.left = (minPrice / rangeInput[0].max) * 100 + '%';
                    }
                    else {
                        rangeInput[1].value = maxPrice;
                        // @ts-ignore
                        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + '%';
                    }
                }
            });
        });
    });

    return (
        <div className="range mt-2" ref={ref}>
            <div className="range-slider bg-neutral-200 relative h-2 rounded">
                <span className="range-selected bg-neutral-600 absolute h-full left-[30%] right-[30%]"></span>
            </div>

            <div className="range-input relative">
                <input type="range" className="min absolute -top-3 w-full appearance-none bg-transparent"
                       min={min} max={max} value="300" step={step}/>

                <input type="range" className="max absolute -top-3 w-full appearance-none bg-transparent"
                       min={min} max={max} value="700" step={step}/>
            </div>

            <div className="range-price flex justify-between mt-2">
                <div className="flex flex-col">
                    <label htmlFor={minId} className="text-sm font-bold">Min</label>
                    <input type="number" name="min" value={startMin} id={minId}
                           className="w-32 text-left text-sm border border-neutral-200 p-1 rounded"/>
                </div>

                <div className="flex flex-col">
                    <label htmlFor={maxId} className="text-sm font-bold text-right">Max</label>
                    <input type="number" name="max" value={startMax} id={maxId}
                           className="w-32 text-right text-sm border border-neutral-200 p-1 rounded"/>
                </div>
            </div>
        </div>
    );
}
