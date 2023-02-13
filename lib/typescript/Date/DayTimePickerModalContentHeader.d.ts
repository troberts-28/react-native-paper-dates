/// <reference types="react" />
import type { ModeType } from './Calendar';
export interface HeaderPickProps {
    moreLabel?: string;
    label?: string;
    emptyLabel?: string;
    saveLabel?: string;
    uppercase?: boolean;
    headerSeparator?: string;
    startLabel?: string;
    endLabel?: string;
    editIcon?: string;
    calendarIcon?: string;
    closeIcon?: string;
}
export interface HeaderContentProps extends HeaderPickProps {
    dayIndex: number;
    hours: number;
    minutes: number;
    duration?: number | undefined | null;
    isLoading?: boolean;
    mode: ModeType;
    collapsed: boolean;
    onToggle?: () => any;
    locale: string | undefined;
    showSaveButton?: boolean;
    saveLabel?: string;
    saveLabelDisabled?: boolean;
    onSave?: () => void;
}
export default function DayTimePickerModalContentHeader(props: HeaderContentProps): JSX.Element;
export declare function HeaderContentSingle({ dayIndex, hours, minutes, duration, color, locale, }: HeaderContentProps & {
    color: string;
}): JSX.Element;
//# sourceMappingURL=DayTimePickerModalContentHeader.d.ts.map