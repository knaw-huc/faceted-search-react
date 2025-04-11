import {ReactNode, useState} from 'react';

export interface FacetProps {
    label: string;
    infoText?: string;
    startOpen?: boolean;
    allowToggle?: boolean;
    children: ReactNode | ReactNode[];
}

export default function Facet({label, infoText, startOpen = true, allowToggle = true, children}: FacetProps) {
    return (
        <div className="mb-10 w-full max-w-[400px]" aria-label={`Facet for ${label}`}>
            <div className="flex justify-between items-center mb-1">
                <div className="font-semibold" tabIndex={0}>
                    {label}
                </div>

                <div className="flex justify-end">
                    <a href="#next" className="sr-only">
                        Skip {label} and go to next facet
                    </a>

                    {infoText && <FacetInfo text={infoText}/>}
                    {allowToggle && <ToggleShowHide startOpen={startOpen}/>}
                </div>
            </div>

            {children}
        </div>
    );
}

function FacetInfo({text}: { text: string }) {
    return (
        <div className="relative">
            <button
                className="peer p-1 rounded-full bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center"
                aria-label="Click for a description about the facet">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 stroke-neutral-500">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                </svg>
            </button>

            <div
                className="hidden peer-hover:flex hover:flex w-[250px] flex-col bg-neutral-800 text-white text-sm drop-shadow-lg absolute -translate-x-52 p-4 rounded-sm">
                {text}
            </div>
        </div>
    );
}

function ToggleShowHide({startOpen}: { startOpen: boolean }) {
    const [isOpen, setOpen] = useState(startOpen);

    return (
        <button
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center translate-x-2"
            aria-label={`Click to ${isOpen ? 'close' : 'open'} the facet`}
            onClick={_ => setOpen(isOpen => !isOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                 className="w-3 h-3 fill-neutral-900">
                <path fillRule="evenodd"
                      d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                      clipRule="evenodd"/>
            </svg>
        </button>
    );
}
