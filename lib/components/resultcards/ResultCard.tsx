import {ReactNode} from 'react';

export default function ResultCard({children}: { children: ReactNode | ReactNode[] }) {
    return (
        <li className="col-span-4 grid grid-cols-subgrid bg-neutral-50 border border-neutral-200 hover:bg-white hover:border-neutral-200 rounded w-full cursor-pointer">
            {children}
        </li>
    );
}
