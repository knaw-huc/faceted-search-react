import {ReactNode, useContext} from 'react';
import {ChevronDownIcon} from '@heroicons/react/24/solid';
import {
    Disclosure,
    DisclosurePanel,
    Button,
    TooltipTrigger,
    Tooltip,
    OverlayArrow,
    DisclosureStateContext
} from 'react-aria-components';
import useTranslate from 'hooks/useTranslate';

export interface FacetProps {
    label: string;
    infoText?: string;
    startOpen?: boolean;
    allowToggle?: boolean;
    children: ReactNode;
}

export default function Facet({label, infoText, startOpen = true, allowToggle = true, children}: FacetProps) {
    return (
        <Disclosure className="mb-10 w-full max-w-[400px]" aria-label={`Facet for ${label}`}
                    isDisabled={!allowToggle} defaultExpanded={startOpen}>
            <FacetHeader label={label} infoText={infoText} allowToggle={allowToggle}/>

            <DisclosurePanel className="h-(--disclosure-panel-height) motion-safe:transition-[height] overflow-clip pt-2">
                {children}
            </DisclosurePanel>
        </Disclosure>
    );
}

function FacetHeader({label, infoText, allowToggle}: { label: string, infoText?: string; allowToggle: boolean }) {
    const {isExpanded} = useContext(DisclosureStateContext)!;
    const {t} = useTranslate();

    return (
        <div className="flex justify-between items-center mb-1" aria-label={t('facet.aria', {label})}>
            <div className="font-semibold" tabIndex={0}>
                {label}
            </div>

            <div className="flex justify-end">
                <a href="#next" className="sr-only">
                    {t('facet.skip', {label})}
                </a>

                {infoText && <FacetInfo text={infoText}/>}

                {allowToggle &&
                    <Button slot="trigger"
                            aria-label={isOpen ? t('facet.toggle.close') : t('facet.toggle.open')}
                            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center translate-x-2">
                        <ChevronDownIcon className={`w-3 h-3 fill-neutral-900 ${!isExpanded ? 'rotate-180' : ''}`}/>
                    </Button>}
            </div>
        </div>
    );
}

function FacetInfo({text}: { text: string }) {
    const {t} = useTranslate();

    return (
        <TooltipTrigger delay={0} closeDelay={0}>
            <Button
                className="p-1 rounded-full bg-neutral-100 hover:bg-neutral-200 transition flex items-center justify-center"
                aria-label={t('facet.info.aria')}>
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                     className="w-5 h-5 stroke-neutral-500">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
                </svg>
            </Button>

            <Tooltip offset={4}
                     className="w-[250px] flex-col bg-neutral-800 text-white text-sm drop-shadow-lg p-4 rounded-sm">
                <OverlayArrow>
                    <svg width={8} height={8} viewBox="0 0 8 8"
                         className="block fill-neutral-800 stroke-neutral-800 group-placement-bottom:rotate-180 group-placement-left:-rotate-90 group-placement-right:rotate-90">
                        <path d="M0 0 L4 4 L8 0"/>
                    </svg>
                </OverlayArrow>

                {text}
            </Tooltip>
        </TooltipTrigger>
    );
}
