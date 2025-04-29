import {ReactNode} from 'react';

export default function ResultsView({children}: { children: ReactNode | ReactNode[] }) {
    return (
        <ul className="w-full grid grid-cols-[1fr_1fr_4fr_3rem] gap-6">
            {children}
        </ul>
    );
}
