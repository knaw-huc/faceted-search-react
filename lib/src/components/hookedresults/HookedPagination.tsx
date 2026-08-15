import {Pagination} from 'components/results';
import usePagination from 'hooks/usePagination';

function getUrlForPage(page: number): string {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());
    return url.toString();
}

export default function HookedPagination() {
    const {page, pageSize, total, getPrevPages, getNextPages} = usePagination();

    if (total === 0)
        return null;

    const totalPages = Math.ceil(total / pageSize);
    const prevPages: [number, string][] = getPrevPages(4).map((p => [p, getUrlForPage(p)]));
    const nextPages: [number, string][] = getNextPages(totalPages, 4).map((p => [p, getUrlForPage(p)]));

    const prev = prevPages.length > 0 ? prevPages[prevPages.length - 1][1] : undefined;
    const next = nextPages.length > 0 ? nextPages[0][1] : undefined;

    const pages = {
        ...Object.fromEntries(prevPages),
        [page]: getUrlForPage(page),
        ...Object.fromEntries(nextPages)
    };

    return (
        <Pagination current={page} prev={prev} next={next} pages={pages}/>
    );
}
