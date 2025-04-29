import {Fragment} from 'react';

export interface PaginationProps {
    current: number;
    pages: { [page: number]: string };
    prev?: string;
    next?: string;
}

export default function Pagination({current, pages, prev, next}: PaginationProps) {
    return (
        <div className="pb-20">
            <nav className="flex gap-4 w-full justify-center mt-10">
                {prev &&
                    <a className="rounded-full px-3 py-2 text-sm font-bold no-underline inline-flex items-center gap-1 transition bg-neutral-100 hover:bg-neutral-200 mr-4"
                       href={prev}>
                        Previous
                    </a>}

                {Object.entries(pages).map(([page, href]) => <Fragment key={page}>
                    {parseInt(page) !== current &&
                        <a className="rounded-full px-3 py-2 text-sm font-bold no-underline inline-flex items-center gap-1 transition bg-neutral-100 hover:bg-neutral-200"
                           href={href}>
                            {page}
                        </a>}

                    {parseInt(page) === current &&
                        <div className="bg-(--color-support-001) text-white rounded font-bold p-2 min-w-10 text-center">
                            {page}
                        </div>}
                </Fragment>)}

                {next &&
                    <a className="rounded-full px-3 py-2 text-sm font-bold no-underline inline-flex items-center gap-1 transition bg-neutral-100 hover:bg-neutral-200 ml-4"
                       href={next}>
                        Next
                    </a>}
            </nav>
        </div>
    );
}
