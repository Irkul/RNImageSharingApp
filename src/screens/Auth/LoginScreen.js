import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import BlankScreenTemplate from '../../components/ScreenTemplate/BlankScreenTemplate';
import Text from '../../components/Text';
import Button, {ButtonType} from '../../components/Button';
import {TextType} from '../../theme/typography';
import {unitH, unitW} from '../../theme/constant';
import {PrimaryColors} from '../../theme/colors';

export const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginPressed = () => {
        console.log("Login button Psdsdsressed");

    }

    return (
        <BlankScreenTemplate contentStyle={styles.content}>
            <View style={styles.textInputContainer}>
                <Text type={TextType.BODY_1} style={styles.textInputLabel}>
                    Email
                </Text>
                <TextInput
                    keyboardType='email-address'
                    style={styles.textInput}
                    onChange={str => setEmail(str)}
                    value={email}
                />
            </View>
            <View style={styles.textInputContainer}>
                <Text type={TextType.BODY_1} style={styles.textInputLabel}>
                    Password
                </Text>
                <TextInput
                    keyboardType='default'
                    style={styles.textInput}
                    onChange={str => setPassword(str)}
                    value={password}
                    secureTextEntry={true}
                />
            </View>
            <Button
                type={ButtonType.WHITE}
                title={"Log In"}
                onPress={loginPressed}
                containerStyle={styles.button}
            />
            
            <Pressable
                style={styles.forgotPassword}
                onPress={()=>{
                    console.log("E#");
                }}
            >
                <Text type={TextType.BODY_1}>Did you forget your password?</Text>
            </Pressable>

            <Pressable
                style={styles.register}
                onPress={()=>{
                    navigation.navigate("RegisterScreen");
                }}
            >
                <Text type={TextType.BODY_1}>Do you have an account? Please register</Text>
            </Pressable>
        </BlankScreenTemplate>
    );
}

const styles = StyleSheet.create({
    // Form fields
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    textInputContainer: {
        alignItems: 'flex-start',
        alignSelf: 'center',
        width: '66%',
    },
    textInputLabel: {
        marginBottom: unitH * 20,
    },
    textInput: {
        fontSize: 20,
        width: '100%',
        borderWidth: 1,
        marginBottom: unitH * 60,
    },
    button: {
        alignSelf: 'center',
        width: '66%',
        borderWidth: 1,
        borderRadius: 0,
        marginTop: unitH * 80,
    },
    forgotPassword: {
        alignSelf: 'center',
        marginTop: unitH * 80,
        width: '66%',
        // height: unitH * 100,
    },
    register: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: unitH * 50,
    }

});