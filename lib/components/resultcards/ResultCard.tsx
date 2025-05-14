import {ReactNode, Suspense} from 'react';
import GhostLines from '../utils/GhostLines.tsx';

export default function ResultCard({children}: { children: ReactNode }) {
    return (
        <li className="col-span-4 grid grid-cols-subgrid bg-neutral-50 border border-neutral-200 hover:bg-white hover:border-neutral-200 rounded w-full cursor-pointer">
            <Suspense fallback={<GhostLines/>}>
                {children}
            </Suspense>
        </li>
    );
}
