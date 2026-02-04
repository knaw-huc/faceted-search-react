import {ReactNode} from 'react';
import {Group, Button} from 'react-aria-components';

export default function RangeInput({fromElement, toElement, buttonIcon}: {
    fromElement: ReactNode;
    toElement: ReactNode;
    buttonIcon?: ReactNode;
}) {
    return (
        <Group
            className="flex items-center box-border rounded border border-neutral-300 overflow-hidden transition min-w-52 w-auto cursor-text mx-3">
            <div className="flex-1 flex items-center justify-between overflow-x-auto overflow-y-clip">
                {fromElement}

                <span aria-hidden="true" className="text-neutral-700">
                    –
                </span>

                {toElement}
            </div>

            {buttonIcon && <Button
                className="relative text-sm text-center cursor-pointer p-1 flex items-center justify-center text-neutral-700 w-6 mr-1 outline-offset-0">
                {buttonIcon}
            </Button>}
        </Group>
    );
}
