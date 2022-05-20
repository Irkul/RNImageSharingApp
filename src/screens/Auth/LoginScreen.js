import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import BlankScreenTemplate from '../../components/ScreenTemplate/BlankScreenTemplate';
import Text from '../../components/Text';
import {TextType} from '../../theme/typography';
import {unitH, unitW} from '../../theme/constant';
import {PrimaryColors} from '../../theme/colors';

export const LoginScreen = () => {
    return (
        <BlankScreenTemplate>
            <View style={styles.textInputContainer}>
                <Text type={TextType.BODY_1} style={styles.textInputLabel}>
                    Email
                </Text>
                {/* <TextInput
                    keyboardType='email-address'
                    style={styles.textInput}
                    onChange={() => {}}
                    value={""}
                /> */}
            </View>
            <View style={styles.textInputContainer}>
                <Text type={TextType.BODY_1} style={styles.textInputLabel}>
                    Password
                </Text>
                {/* <TextInput
                    keyboardType='default'
                    style={styles.textInput}
                    onChange={() => {}}
                    value={""}
                    secureTextEntry={true}
                /> */}
            </View>
        </BlankScreenTemplate>
    );
}

const styles = StyleSheet.create({
    // Form fields
    textInputContainer: {
        alignItems: 'flex-start',
        width: '66%',
        marginBottom: unitH * 80,
    },
    textInputLabel: {
        color: PrimaryColors.White,
        marginBottom: unitH * 10,
    },
    textInput: {
        fontSize: 40,
    },

});