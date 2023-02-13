import * as React from 'react';
declare function EmptyDayPure(): JSX.Element;
export declare const EmptyDay: React.MemoExoticComponent<typeof EmptyDayPure>;
declare function DayOfWeek(props: {
    dayIndex: number;
    selected: boolean;
    onPressDay: (dayIndex: number) => any;
    primaryColor: string;
    disabled: boolean;
    textColorOnPrimary: string;
}): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof DayOfWeek>;
export default _default;
//# sourceMappingURL=DayOfWeek.d.ts.map