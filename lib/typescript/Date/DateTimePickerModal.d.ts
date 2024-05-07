import * as React from 'react';
import { DateTimePickerModalContentProps } from './DateTimePickerModalContent';
interface DateTimePickerModalProps extends DateTimePickerModalContentProps {
    visible: boolean;
    animationType?: 'slide' | 'fade' | 'none';
    disableStatusBar?: boolean;
    disableStatusBarPadding?: boolean;
}
export declare function DateTimePickerModal(props: DateTimePickerModalProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof DateTimePickerModal>;
export default _default;
