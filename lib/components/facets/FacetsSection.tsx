import {ReactNode, useState} from 'react';
import useTranslate from 'hooks/useTranslate';

export default function FacetsSection({children}: { children: ReactNode }) {
    const [showFacets, setShowFacets] = useState(false);

    return (
        <>
            <div className="w-full my-4">
                <FacetsToggleButton toggleFacets={() => setShowFacets(showFacets => !showFacets)}/>
            </div>

            <section
                className={`w-full ${!showFacets && ' hidden'} lg:flex flex-col max-w-(--site-max-width) absolute lg:relative p-4 lg:p-0 shadow-xl lg:shadow-none bg-neutral-50 lg:bg-white`}>
                <div className="w-full text-right">
                    <FacetsCloseButton closeFacets={() => setShowFacets(false)}/>
                </div>

                {children}
            </section>
        </>
    );
}

function FacetsToggleButton({toggleFacets}: { toggleFacets: () => void }) {
    const {t} = useTranslate();

    return (
        <button className="lg:hidden flex gap-1 items-center bg-neutral-100 rounded-full px-2 py-1"
                onClick={toggleFacets}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                 className="w-5 h-5 fill-neutral-800">
                <path
                    d="M6 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 111.5 0v7.5A.75.75 0 016 12zM18 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0118 12zM6.75 20.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM18.75 18.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 011.5 0zM12.75 5.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM12 21a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0112 21zM3.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0zM12 11.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM15.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0z"/>
            </svg>

            {t('facets.toggle')}

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                 className="w-4 h-4 fill-neutral-800">
                <path fillRule="evenodd"
                      d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                      clipRule="evenodd"/>
            </svg>
        </button>
    );
}

function FacetsCloseButton({closeFacets}: { closeFacets: () => void }) {
    return (
        <button className="lg:hidden" onClick={closeFacets}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                 className="w-4 h-4 fill-diploblue-neutral-800">
                <path fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"/>
            </svg>
        </button>
    );
}