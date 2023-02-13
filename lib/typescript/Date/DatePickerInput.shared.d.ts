import type { ValidRangeType } from './Calendar';
import type * as React from 'react';
import type { TextInput } from 'react-native-paper';
export declare type DatePickerInputProps = {
    inputMode: 'start' | 'end';
    locale: string;
    onChange: (date: Date | undefined) => void;
    value: Date | undefined;
    validRange?: ValidRangeType | undefined;
    withModal?: boolean;
    withDateFormatInLabel?: boolean;
    calendarIcon?: string;
} & Omit<React.ComponentProps<typeof TextInput>, 'value' | 'onChange' | 'onChangeText'>;
//# sourceMappingURL=DatePickerInput.shared.d.ts.map