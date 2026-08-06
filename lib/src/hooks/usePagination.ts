import useSearchContext from './useSearchContext';

interface Pagination {
    page: number;
    pageSize: number;
    setPage: (page: number) => void;
    getPrevPages: (max: number) => number[];
    getNextPages: (total: number, max: number) => number[];
}

function getPages(noPages: number, startPage: number = 1): number[] {
    return Array.from({length: noPages}, (_, i) => i + startPage);
}

function getPrevPages(curPage: number, maxPages: number = 4): number[] {
    const minPage = curPage - maxPages > 0 ? maxPages : curPage - 1;
    return getPages(minPage, curPage - minPage);
}

function getNextPages(curPage: number, totalPages: number, maxPages: number = 4): number[] {
    const maxPage = curPage + maxPages < totalPages ? maxPages : totalPages - curPage;
    return getPages(maxPage, curPage + 1);
}

export default function usePagination(): Pagination {
    const page = useSearchContext(s => s.state.page);
    const pageSize = useSearchContext(s => s.pageSize);
    const setPage = useSearchContext(s => s.setPage);

    return {
        page,
        pageSize,
        setPage,
        getPrevPages: (max: number = 4) => getPrevPages(page, max),
        getNextPages: (total: number, max: number = 4) => getNextPages(page, total, max),
    };
}
