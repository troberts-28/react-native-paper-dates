import * as React from 'react';
import { HeaderPickProps } from './DayTimePickerModalContentHeader';
export interface DayTimePickerModalContentProps extends HeaderPickProps {
    inputFormat?: string;
    locale: string;
    onDismiss: () => any;
    isLoading?: boolean;
    disableSafeTop?: boolean;
    saveLabelDisabled?: boolean;
    hideDayPicker?: boolean;
    hideTimePicker?: boolean;
    dayIndex?: number | undefined;
    hours?: number | undefined;
    minutes?: number | undefined;
    duration?: number | undefined | null;
    onChange?: (params: {
        dayIndex: number;
        hours: number;
        minutes: number;
    }) => void;
    onConfirm: (params: {
        dayIndex: number;
        hours: number;
        minutes: number;
    }) => void;
}
export declare function DateTimePickerModalContent(props: DayTimePickerModalContentProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof DateTimePickerModalContent>;
export default _default;
//# sourceMappingURL=DayTimePickerModalContent.d.ts.map