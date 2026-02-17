import {NumberField, Group, Input, Button} from 'react-aria-components';
import {ChevronUpIcon, ChevronDownIcon} from '@heroicons/react/16/solid';

export default function NumberInputSlot({label, min, max, step, current, onChange}: {
    label: string;
    min: number;
    max: number;
    step: number,
    current: number,
    onChange: (value: number) => void
}) {
    return (
        <NumberField aria-label={label} minValue={min} maxValue={max} step={step} value={current} onChange={onChange}>
            <Group
                className="group flex items-center h-9 box-border bg-white overflow-hidden">
                <Input
                    className="w-20 px-3 py-0 min-h-9 flex-1 min-w-0 border-0 bg-white text-sm text-neutral-800 [-webkit-tap-highlight-color:transparent]"/>

                <div className="flex flex-col h-full">
                    <StepperButton isIncrement={true}/>
                    <StepperButton isIncrement={false}/>
                </div>
            </Group>
        </NumberField>
    );
}

function StepperButton({isIncrement}: { isIncrement: boolean }) {
    return (
        <Button slot={isIncrement ? 'increment' : 'decrement'}
                className="flex py-0 px-0.5 flex-1 box-border text-neutral-500 bg-transparent pressed:bg-neutral-100 [-webkit-tap-highlight-color:transparent]">
            {isIncrement ?
                <ChevronUpIcon aria-hidden className="w-4 h-4"/> :
                <ChevronDownIcon aria-hidden className="w-4 h-4"/>}
        </Button>
    );
}
