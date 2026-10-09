import {type ReactNode} from 'react';

export default function ContentWithAsides({children, leftAside, rightAside}: {
    children: ReactNode;
    leftAside?: ReactNode;
    rightAside?: ReactNode;
}) {
    return (
        <div className="content-with-asides">
            {leftAside && <div className="aside">
                {leftAside}
            </div>}

            <div className="main">
                {children}
            </div>

            {rightAside && <div className="aside">
                {rightAside}
            </div>}
        </div>
    );
}
