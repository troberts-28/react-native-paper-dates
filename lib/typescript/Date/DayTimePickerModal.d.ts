import * as React from 'react';
import { DayTimePickerModalContentProps } from './DayTimePickerModalContent';
interface DayTimePickerModalProps extends DayTimePickerModalContentProps {
    visible: boolean;
    animationType?: 'slide' | 'fade' | 'none';
    disableStatusBar?: boolean;
    disableStatusBarPadding?: boolean;
}
export declare function DayTimePickerModal(props: DayTimePickerModalProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof DayTimePickerModal>;
export default _default;
