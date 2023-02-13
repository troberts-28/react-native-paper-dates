import * as React from 'react';
declare const _default: React.ForwardRefExoticComponent<Pick<Pick<import("react-native").TextInputProps & React.RefAttributes<import("react-native").TextInput> & {
    mode?: "flat" | "outlined" | undefined;
    left?: React.ReactNode;
    right?: React.ReactNode;
    disabled?: boolean | undefined;
    label?: import("react-native-paper/lib/typescript/components/TextInput/types").TextInputLabelProp | undefined;
    placeholder?: string | undefined;
    error?: boolean | undefined;
    onChangeText?: Function | undefined;
    selectionColor?: string | undefined;
    underlineColor?: string | undefined;
    activeUnderlineColor?: string | undefined;
    outlineColor?: string | undefined;
    activeOutlineColor?: string | undefined;
    dense?: boolean | undefined;
    multiline?: boolean | undefined;
    numberOfLines?: number | undefined;
    onFocus?: ((args: any) => void) | undefined;
    onBlur?: ((args: any) => void) | undefined;
    render?: ((props: import("react-native-paper/lib/typescript/components/TextInput/types").RenderProps) => React.ReactNode) | undefined;
    value?: string | undefined;
    style?: import("react-native").StyleProp<import("react-native").TextStyle>;
    theme: ReactNativePaper.Theme;
} & React.RefAttributes<{
    focus: () => void;
    clear: () => void;
    blur: () => void;
    isFocused: () => boolean;
    setNativeProps: (nativeProps: object) => void;
}>, "label" | "style" | "children" | "pointerEvents" | "allowFontScaling" | "numberOfLines" | "onLayout" | "onPressIn" | "onPressOut" | "testID" | "nativeID" | "maxFontSizeMultiplier" | "selectionColor" | "textBreakStrategy" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "left" | "right" | "ref" | "key" | "hitSlop" | "removeClippedSubviews" | "collapsable" | "needsOffscreenAlphaCompositing" | "renderToHardwareTextureAndroid" | "focusable" | "shouldRasterizeIOS" | "isTVSelectable" | "hasTVPreferredFocus" | "tvParallaxProperties" | "tvParallaxShiftDistanceX" | "tvParallaxShiftDistanceY" | "tvParallaxTiltAngle" | "tvParallaxMagnification" | "onStartShouldSetResponder" | "onMoveShouldSetResponder" | "onResponderEnd" | "onResponderGrant" | "onResponderReject" | "onResponderMove" | "onResponderRelease" | "onResponderStart" | "onResponderTerminationRequest" | "onResponderTerminate" | "onStartShouldSetResponderCapture" | "onMoveShouldSetResponderCapture" | "onTouchStart" | "onTouchMove" | "onTouchEnd" | "onTouchCancel" | "onTouchEndCapture" | "value" | "mode" | "textAlign" | "render" | "textAlignVertical" | "disabled" | "onBlur" | "onFocus" | "multiline" | "error" | "placeholder" | "onContentSizeChange" | "onScroll" | "scrollEnabled" | "autoCapitalize" | "autoCorrect" | "autoFocus" | "blurOnSubmit" | "caretHidden" | "contextMenuHidden" | "defaultValue" | "editable" | "keyboardType" | "maxLength" | "onChange" | "onChangeText" | "onEndEditing" | "onSelectionChange" | "onSubmitEditing" | "onTextInput" | "onKeyPress" | "placeholderTextColor" | "returnKeyType" | "secureTextEntry" | "selectTextOnFocus" | "selection" | "inputAccessoryViewID" | "clearButtonMode" | "clearTextOnFocus" | "dataDetectorTypes" | "enablesReturnKeyAutomatically" | "keyboardAppearance" | "passwordRules" | "rejectResponderTermination" | "selectionState" | "spellCheck" | "textContentType" | "autoComplete" | "importantForAutofill" | "disableFullscreenUI" | "inlineImageLeft" | "inlineImagePadding" | "returnKeyLabel" | "underlineColorAndroid" | "showSoftInputOnFocus" | "underlineColor" | "activeUnderlineColor" | "outlineColor" | "activeOutlineColor" | "dense"> & {
    theme?: import("@callstack/react-theme-provider").$DeepPartial<ReactNativePaper.Theme> | undefined;
} & {
    mask: string;
}, "label" | "style" | "children" | "pointerEvents" | "allowFontScaling" | "numberOfLines" | "onLayout" | "onPressIn" | "onPressOut" | "testID" | "nativeID" | "maxFontSizeMultiplier" | "selectionColor" | "textBreakStrategy" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessibilityHint" | "accessibilityValue" | "onAccessibilityAction" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "left" | "right" | "key" | "hitSlop" | "removeClippedSubviews" | "collapsable" | "needsOffscreenAlphaCompositing" | "renderToHardwareTextureAndroid" | "focusable" | "shouldRasterizeIOS" | "isTVSelectable" | "hasTVPreferredFocus" | "tvParallaxProperties" | "tvParallaxShiftDistanceX" | "tvParallaxShiftDistanceY" | "tvParallaxTiltAngle" | "tvParallaxMagnification" | "onStartShouldSetResponder" | "onMoveShouldSetResponder" | "onResponderEnd" | "onResponderGrant" | "onResponderReject" | "onResponderMove" | "onResponderRelease" | "onResponderStart" | "onResponderTerminationRequest" | "onResponderTerminate" | "onStartShouldSetResponderCapture" | "onMoveShouldSetResponderCapture" | "onTouchStart" | "onTouchMove" | "onTouchEnd" | "onTouchCancel" | "onTouchEndCapture" | "value" | "mode" | "textAlign" | "render" | "textAlignVertical" | "disabled" | "onBlur" | "onFocus" | "multiline" | "error" | "placeholder" | "onContentSizeChange" | "onScroll" | "scrollEnabled" | "autoCapitalize" | "autoCorrect" | "autoFocus" | "blurOnSubmit" | "caretHidden" | "contextMenuHidden" | "defaultValue" | "editable" | "keyboardType" | "maxLength" | "onChange" | "onChangeText" | "onEndEditing" | "onSelectionChange" | "onSubmitEditing" | "onTextInput" | "onKeyPress" | "placeholderTextColor" | "returnKeyType" | "secureTextEntry" | "selectTextOnFocus" | "selection" | "inputAccessoryViewID" | "clearButtonMode" | "clearTextOnFocus" | "dataDetectorTypes" | "enablesReturnKeyAutomatically" | "keyboardAppearance" | "passwordRules" | "rejectResponderTermination" | "selectionState" | "spellCheck" | "textContentType" | "autoComplete" | "importantForAutofill" | "disableFullscreenUI" | "inlineImageLeft" | "inlineImagePadding" | "returnKeyLabel" | "underlineColorAndroid" | "showSoftInputOnFocus" | "underlineColor" | "activeUnderlineColor" | "outlineColor" | "activeOutlineColor" | "dense" | "mask" | "theme"> & React.RefAttributes<unknown>>;
export default _default;
//# sourceMappingURL=TextInputMask.d.ts.map