import {Suspense} from 'react';
import {Pagination} from 'components/results';
import usePagination from 'hooks/usePagination';
import useSearchResults from 'hooks/useSearchResults';

function getUrlForPage(page: number): string {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());
    return url.toString();
}

export default function HookedPagination() {
    return (
        <Suspense>
            <SuspendedPagination/>
        </Suspense>
    );
}

function SuspendedPagination() {
    const {total} = useSearchResults();
    const {page, pageSize, getPrevPages, getNextPages} = usePagination();

    const totalPages = Math.ceil(total / pageSize);
    const prevPages: [number, string][] = getPrevPages(4).map((p => [p, getUrlForPage(p)]));
    const nextPages: [number, string][] = getNextPages(totalPages, 4).map((p => [p, getUrlForPage(p)]));

    const prev = prevPages.length > 0 ? prevPages[prevPages.length - 1][1] : undefined;
    const next = nextPages.length > 0 ? nextPages[0][1] : undefined;

    const first = prevPages.length > 0 ? getUrlForPage(1) : undefined;
    const last = nextPages.length > 0 ? getUrlForPage(totalPages) : undefined;

    const pages = {
        ...Object.fromEntries(prevPages),
        [page]: getUrlForPage(page),
        ...Object.fromEntries(nextPages)
    };

    return (
        <Pagination current={page} prev={prev} next={next} pages={pages} first={first} last={last} />
    );
}
