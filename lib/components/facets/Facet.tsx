import {ReactNode, useState} from 'react';
import iconArrowDown from 'assets/icon-arrow-down.svg';
import {useIntl} from "react-intl";
import {uiMessages} from "../../i18n/messages.ts";

export interface FacetProps {
    label: string;
    infoText?: string;
    startOpen?: boolean;
    allowToggle?: boolean;
    children: ReactNode;
}

export default function Facet({label, infoText, startOpen = true, allowToggle = true, children}: FacetProps) {
    const [isOpen, setOpen] = useState(startOpen);
    const intl = useIntl();

    return (
        <div className="mb-10 w-full max-w-[400px]" aria-label={intl.formatMessage(uiMessages.facetLabel, { label })}>
            <div className="flex justify-between items-center mb-1">
                <div className="font-semibold" tabIndex={0}>
                    {label}
                </div>

                <div className="flex justify-end">
                    <a href="#next" className="sr-only">
                        {intl.formatMessage(uiMessages.skipLabelAndGoToNextFacet, { label })}
                    </a>

                    {infoText && <FacetInfo text={infoText}/>}
                    {allowToggle && <ToggleShowHide isOpen={isOpen}
                                                    onToggle={() => setOpen(isOpen => !isOpen)}/>}
                </div>
            </div>

            {isOpen && children}
        </div>
    );
}

function FacetInfo({text}: { text: string }) {
    const intl = useIntl();

    return (
        <div className="relative">
            <button
                className="peer p-1 rounded-full bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center"
                aria-label={intl.formatMessage(uiMessages.clickForFacetDescription)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 stroke-neutral-500">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                </svg>
            </button>

            <div
                className="hidden peer-hover:flex hover:flex w-[250px] flex-col bg-neutral-800 text-white text-sm drop-shadow-lg absolute -translate-x-52 p-4 rounded-sm z-10">
                {text}
            </div>
        </div>
    );
}

function ToggleShowHide({isOpen, onToggle}: { isOpen: boolean, onToggle: () => void }) {
    const intl = useIntl();
    return (
        <button
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center translate-x-2"
            aria-label={isOpen ? intl.formatMessage(uiMessages.clickToCloseFacet) : intl.formatMessage(uiMessages.clickToOpenFacet)}
            title={isOpen ? intl.formatMessage(uiMessages.clickToCloseFacet) : intl.formatMessage(uiMessages.clickToOpenFacet)}
            onClick={onToggle}>
            <img src={iconArrowDown} alt="" className={`w-3 h-3 fill-neutral-900 ${!isOpen ? 'rotate-180' : ''}`}/>
        </button>
    );
}
