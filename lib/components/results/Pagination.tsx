import {ChevronDoubleRightIcon, ChevronDoubleLeftIcon, ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";
import {useIntl} from "react-intl";
import {uiMessages} from "../../i18n/messages.ts";

export interface PaginationProps {
    current: number;
    pages: { [page: number]: string };
    prev?: string;
    next?: string;
    first?: string;
    last?: string;
}

export default function Pagination({current, pages, prev, next, first, last}: PaginationProps) {
    const intl = useIntl();

    return (
        <div className="pb-20">
            <nav className="flex gap-4 w-full justify-center mt-10">
                {first && <a className="rounded-full px-3 py-2 text-sm font-bold no-underline inline-flex items-center gap-1 transition bg-neutral-100 hover:bg-neutral-200"
                             href={first}
                             title={intl.formatMessage(uiMessages.paginationFirstPage)}
                             aria-label={intl.formatMessage(uiMessages.paginationFirstPage)}>
                    <ChevronDoubleLeftIcon className='w-6 h-6 fill-neutral-900' />
                </a>}

                {prev &&
                    <a className="rounded-full px-3 py-2 text-sm font-bold no-underline inline-flex items-center gap-1 transition bg-neutral-100 hover:bg-neutral-200 mr-4"
                       href={prev}
                       title={intl.formatMessage(uiMessages.paginationPreviousPage)}
                       aria-label={intl.formatMessage(uiMessages.paginationPreviousPage)}>
                        <ChevronLeftIcon className='w-6 h-6 fill-neutral-900' />
                    </a>}

                {Object.entries(pages).map(([page, href]) =>
                    <Page key={page} page={parseInt(page, 10)} href={href} current={current}/>)}

                {next &&
                    <a className="rounded-full px-3 py-2 text-sm font-bold no-underline inline-flex items-center gap-1 transition bg-neutral-100 hover:bg-neutral-200 ml-4"
                       href={next}
                       title={intl.formatMessage(uiMessages.paginationNextPage)}
                       aria-label={intl.formatMessage(uiMessages.paginationNextPage)}>
                        <ChevronRightIcon className='w-6 h-6 fill-neutral-900' />
                    </a>}

                {last && <a className="rounded-full px-3 py-2 text-sm font-bold no-underline inline-flex items-center gap-1 transition bg-neutral-100 hover:bg-neutral-200"
                            href={last}
                            title={intl.formatMessage(uiMessages.paginationLastPage)}
                            aria-label={intl.formatMessage(uiMessages.paginationLastPage)}>
                    <ChevronDoubleRightIcon className='w-6 h-6 fill-neutral-900' />
                </a>}
            </nav>
        </div>
    );
}

function Page({page, href, current}: { page: number, href: string, current: number }) {
    const intl = useIntl();

    return (
        <>
            {page !== current &&
                <a className="rounded-full px-3 py-2 text-sm font-bold no-underline inline-flex items-center gap-1 transition bg-neutral-100 hover:bg-neutral-200"
                   href={href}
                    title={intl.formatMessage(uiMessages.paginationNthPage, { page })}>
                    {page}
                </a>}

            {page === current &&
                <div className="bg-(--color-support-001) text-white rounded font-bold p-2 min-w-10 text-center">
                    {page}
                </div>}
        </>
    );
}
