import {ReactNode, Suspense} from 'react';
import Spinner from '../utils/Spinner.tsx';

export default function ResultsView({children}: { children: ReactNode }) {
    return (
        <Suspense fallback={<ResultsLoading/>}>
            <ul className="w-full grid grid-cols-[1fr_1fr_4fr_3rem] gap-6">
                {children}
            </ul>
        </Suspense>
    );
}

function ResultsLoading() {
    return (
        <div className="flex flex-row justify-center">
            <Spinner/>
        </div>
    );
}
