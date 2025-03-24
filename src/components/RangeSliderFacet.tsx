import '../components/RangeSlider.css';

interface IProps {
    facetLabel: string;

  }


const RangeSlider: React.FC<IProps> = ({facetLabel}) => {
    return (
        <div className="mb-10 w-full max-w-[400px]" aria-label={`Facet voor ${facetLabel}`}>
            <div className="flex justify-between items-center mb-1">
                <div className="font-semibold" tabIndex={0}>{facetLabel}</div>
                <div className="flex justify-end"> <a href="#next" className="sr-only">Skip and go to next facet</a>

                    <button
                        className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center translate-x-2"
                        aria-label="Click to close the facet">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            className="w-3 h-3 fill-neutral-900">
                            <path fill-rule="evenodd"
                                d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="range mt-2">
                <div className="range-slider bg-neutral-200 relative h-2 rounded"> <span
                        className="range-selected bg-neutral-600 absolute h-full left-[30%] right-[30%]"></span>

                </div>
                <div className="range-input relative">
                    <input type="range" className="min absolute -top-3 w-full appearance-none bg-transparent"
                        min="0" max="1000" value="300" step="1"/>
                    <input type="range" className="max absolute -top-3 w-full appearance-none bg-transparent"
                        min="0" max="1000" value="700" step="1"/>
                </div>
                <div className="range-price flex justify-between mt-2">
                    <div className="flex flex-col">
                        <label for="min" className="text-sm font-bold">Min</label>
                        <input type="number" name="min" value="300"
                            className="w-32 text-left text-sm border border-neutral-200 p-1 rounded"/>
                    </div>
                    <div className="flex flex-col">
                        <label for="max" className="text-sm font-bold text-right">Max</label>
                        <input type="number" name="max" value="700"
                            className="w-32 text-right text-sm border border-neutral-200 p-1 rounded"/>
                    </div>
                </div>
            </div>
        </div>

    
      )
}

export default RangeSlider;