import * as React from 'react';
import { BaseCalendarProps, CalendarDate, CalendarDates } from './Calendar';
import { HeaderPickProps } from './DateTimePickerModalContentHeader';
export declare type LocalState = {
    startDate: CalendarDate;
    endDate: CalendarDate;
    date: CalendarDate;
    dates: CalendarDates;
};
export interface DateTimePickerModalContentProps extends HeaderPickProps, BaseCalendarProps {
    inputFormat?: string;
    locale: string;
    onDismiss: () => any;
    disableSafeTop?: boolean;
    saveLabelDisabled?: boolean;
    date?: CalendarDate;
    hours?: number | undefined;
    minutes?: number | undefined;
    duration?: number | undefined | null;
    canChooseEndTime?: boolean;
    isLoading?: boolean;
    onConfirm: (params: {
        date: CalendarDate;
        duration?: number;
    }) => void;
    dateMode?: 'start' | 'end';
}
export declare function DatePickerModalContent(props: DateTimePickerModalContentProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof DatePickerModalContent>;
export default _default;
//# sourceMappingURL=DateTimePickerModalContent.d.ts.map