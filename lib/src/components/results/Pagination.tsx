import type {MouseEvent} from 'react';
import useTranslate from 'hooks/useTranslate';

export interface PaginationProps {
    current: number;
    pages: { [page: number]: string };
    prev?: string;
    next?: string;
    onPageChange?: (page: number) => void;
}

export default function Pagination({current, pages, prev, next, onPageChange}: PaginationProps) {
    const {t} = useTranslate();

    function handlePageClick(page: number, e: MouseEvent) {
        if (!onPageChange)
            return;

        e.preventDefault();
        onPageChange(page);
    }

    return (
        <div className="pb-20">
            <nav className="flex gap-4 w-full justify-center mt-10">
                {prev &&
                    <a className="rounded-full px-3 py-2 text-sm font-bold no-underline inline-flex items-center gap-1 transition bg-neutral-100 hover:bg-neutral-200 mr-4"
                       href={prev} onClick={e => handlePageClick(current - 1, e)}>
                        {t('pagination.previous')}
                    </a>}

                {Object.entries(pages).map(([page, href]) =>
                    <Page key={page} page={parseInt(page, 10)} href={href} current={current}
                          onPageChange={handlePageClick}/>)}

                {next &&
                    <a className="rounded-full px-3 py-2 text-sm font-bold no-underline inline-flex items-center gap-1 transition bg-neutral-100 hover:bg-neutral-200 ml-4"
                       href={next} onClick={e => handlePageClick(current + 1, e)}>
                        {t('pagination.next')}
                    </a>}
            </nav>
        </div>
    );
}

function Page({page, href, current, onPageChange}: {
    page: number,
    href: string,
    current: number,
    onPageChange: (page: number, event: MouseEvent) => void
}) {
    return (
        <>
            {page !== current &&
                <a className="rounded-full px-3 py-2 text-sm font-bold no-underline inline-flex items-center gap-1 transition bg-neutral-100 hover:bg-neutral-200"
                   href={href} onClick={e => onPageChange(page, e)}>
                    {page}
                </a>}

            {page === current &&
                <div className="bg-(--color-support-001) text-white rounded font-bold p-2 min-w-10 text-center">
                    {page}
                </div>}
        </>
    );
}
