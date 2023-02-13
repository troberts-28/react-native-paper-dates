/// <reference types="react" />
export interface DatePickerModalHeaderProps {
    disableSafeTop?: boolean;
    saveLabel?: string;
    saveLabelDisabled?: boolean;
    uppercase?: boolean;
    onDismiss: () => void;
    onSave: () => void;
    locale: string | undefined;
    closeIcon?: string;
    hideSaveButton?: boolean;
    isLoading?: boolean;
}
export default function DatePickerModalHeader(props: DatePickerModalHeaderProps): JSX.Element;
//# sourceMappingURL=DatePickerModalHeader.d.ts.map