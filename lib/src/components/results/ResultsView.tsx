import {type ReactNode, Suspense} from 'react';
import ResultsLoading from 'components/utils/ResultsLoading';

export default function ResultsView({children}: { children: ReactNode }) {
    return (
        <Suspense fallback={<ResultsLoading/>}>
            <ul className="w-full grid grid-cols-[1fr_1fr_4fr_3rem] gap-6">
                {children}
            </ul>
        </Suspense>
    );
}
