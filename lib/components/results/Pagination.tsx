import {TranslateFn} from "../../store/FacetedSearchStore.ts";

export type PaginationLabelContent = Record<string, string>;

export interface PaginationProps {
    current: number;
    pages: { [page: number]: string };
    prev?: string;
    next?: string;
    translate?: TranslateFn;
}

export default function Pagination({current, pages, prev, next, translate}: PaginationProps) {
    return (
        <div className="pb-20">
            <nav className="flex gap-4 w-full justify-center mt-10">
                {prev &&
                    <a className="rounded-full px-3 py-2 text-sm font-bold no-underline inline-flex items-center gap-1 transition bg-neutral-100 hover:bg-neutral-200 mr-4"
                       href={prev}>
                        {translate? translate('pagination:previousPage') : 'Previous'}
                    </a>}

                {Object.entries(pages).map(([page, href]) =>
                    <Page key={page} page={parseInt(page, 10)} href={href} current={current}/>)}

                {next &&
                    <a className="rounded-full px-3 py-2 text-sm font-bold no-underline inline-flex items-center gap-1 transition bg-neutral-100 hover:bg-neutral-200 ml-4"
                       href={next}>
                        {translate ? translate('pagination:nextPage') : 'Next'}
                    </a>}
            </nav>
        </div>
    );
}

function Page({page, href, current}: { page: number, href: string, current: number }) {
    return (
        <>
            {page !== current &&
                <a className="rounded-full px-3 py-2 text-sm font-bold no-underline inline-flex items-center gap-1 transition bg-neutral-100 hover:bg-neutral-200"
                   href={href}>
                    {page}
                </a>}

            {page === current &&
                <div className="bg-(--color-support-001) text-white rounded font-bold p-2 min-w-10 text-center">
                    {page}
                </div>}
        </>
    );
}
