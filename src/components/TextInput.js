import React from 'react';
import { StyleSheet, TextInput as RNTextInput, View } from 'react-native';
import Text from './Text';
import { PrimaryColors, SecondaryColors } from '../theme/colors';
import {TextStyles, TextType} from '../theme/typography';
import {unitH, unitW} from '../theme/constant';

export const TextInput = ({
    containerStyle,
    title,
    keyboardType,
    placeholder,
    style,
    onChangeText,
    value,
    isPassword,
    ...otherProps}) => {

    return(
        <View style={{...styles.textInputContainer, ...containerStyle}}>
            {title&&<Text type={TextType.BODY_1} style={styles.textInputLabel}>
                {title}
            </Text>}
            <RNTextInput
                keyboardType={keyboardType}
                style={{...styles.textInput, ...style}}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                secureTextEntry={isPassword}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    textInputContainer: {
        alignItems: 'flex-start',
        alignSelf: 'center',
        width: '66%',
    },
    textInput: {
        ...TextStyles[TextType.TEXTINPUT],
        borderWidth: unitH * 10,
        borderRadius: unitH * 40,
        borderColor: PrimaryColors.White,
        backgroundColor: SecondaryColors.LightBlue,
        width: '100%',
        height: unitH * 158,
        paddingVertical: (unitH * (158 - 72)) / 3, // height - fontSize
        paddingHorizontal: unitW * 40,
    },
    textInputLabel: {
        marginBottom: unitH * 20,
    },
    
});


