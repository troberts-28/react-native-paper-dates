import * as React from 'react';
import { DarkTheme } from 'react-native-paper';
declare function EmptyDayPure(): JSX.Element;
export declare const EmptyDay: React.MemoExoticComponent<typeof EmptyDayPure>;
declare function Day(props: {
    theme: typeof DarkTheme;
    textColorOnPrimary: string;
    day: number;
    month: number;
    year: number;
    selected: boolean;
    inRange: boolean;
    leftCrop: boolean;
    rightCrop: boolean;
    primaryColor: string;
    selectColor: string;
    isToday: boolean;
    disabled: boolean;
    onPressDate: (date: Date) => any;
}): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Day>;
export default _default;
//# sourceMappingURL=Day.d.ts.map