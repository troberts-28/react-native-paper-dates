/// <reference types="react" />
export default function AmPmSwitcher({ onChange, hours, }: {
    hours: number;
    onChange: (newHours: number) => any;
}): JSX.Element;
export declare function SwitchButton({ label, onPress, selected, disabled, }: {
    label: string;
    onPress: (() => any) | undefined;
    selected: boolean;
    disabled: boolean;
}): JSX.Element;
