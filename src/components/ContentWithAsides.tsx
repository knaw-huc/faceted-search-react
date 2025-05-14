import {ReactNode} from 'react';

export default function ContentWithAsides({children, leftAside, rightAside}: {
    children: ReactNode;
    leftAside?: ReactNode;
    rightAside?: ReactNode;
}) {
    return (
        <div className="flex flex-col lg:flex-row xl:gap-10 h-full grow max-w-(--site-max-width) w-full mt-8 lg:mb-16">
            {leftAside && <div className="w-full lg:w-96 px-4 pb-6">
                {leftAside}
            </div>}

            <div className="grow px-4 pb-20">
                {children}
            </div>

            {rightAside && <div className="w-full lg:w-96 px-4 pb-6">
                {rightAside}
            </div>}
        </div>
    );
}
