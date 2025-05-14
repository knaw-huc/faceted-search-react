import {ReactNode} from 'react';

export default function Layout({children}: { children: ReactNode }) {
    return (
        <div className="w-full h-full min-h-screen flex flex-col items-center">
            {children}
        </div>
    );
}
