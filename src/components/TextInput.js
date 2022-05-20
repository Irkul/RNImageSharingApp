import React, {useContext, forwardRef} from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import {PrimaryColors} from '../theme/colors';
import {unitH, unitW} from '../theme/constant';
import {TextStyles, TextType} from '../theme/typography';

const TextInput = ({placeholderTextColor, style, onChangeText, ...otherProps}, ref) => {

    return (
        <RNTextInput
            ref={ref}
            placeholderTextColor={PrimaryColors.Gray}
            onChangeText={text => {
                if (onChangeText) {
                    onChangeText(text);
                }
            }}
            style={[styles.textInput, style]}
            {...otherProps}
        />
    );
}

const styles = StyleSheet.create({
  textInput: {
    ...TextStyles[TextType.TEXTINPUT],
    height: unitH * 158,
    width: '100%',
    paddingVertical: (unitH * (158 - 72)) / 3, // height - fontSize
    paddingHorizontal: unitW * 40,
    borderRadius: 5,
    backgroundColor: PrimaryColors.White,
    color: PrimaryColors.Red,
  },
});

export default TextInput;
