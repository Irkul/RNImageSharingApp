import React, {useEffect, useContext, useState} from 'react';
import {Alert, Pressable, StyleSheet, TextInput, View} from 'react-native';
import BlankScreenTemplate from '../../components/ScreenTemplate/BlankScreenTemplate';
import Text from '../../components/Text';
import Button, {ButtonType} from '../../components/Button';
import { AuthContext } from '../../context';
import {TextType} from '../../theme/typography';
import {unitH, unitW} from '../../theme/constant';
import {PrimaryColors} from '../../theme/colors';

export const LoginScreen = ({navigation}) => {
    const authContext = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginPressed = async () => {
        if (email=="") {
            Alert.alert("Artem 👨🏼‍🦳", "Please input your email");
            return
        }
        if (password=="") {
            Alert.alert("Artem 👨🏼‍🦳", "Please input your password correctly");
            return
        }

        const res = await authContext.signIn(email, password);
        if (res.error) {
            Alert.alert("Artem 👨🏼‍🦳", res.error);
        }else{
            navigation.navigate("BottomNavigation", { selectedIndex: 0 });
        }
        console.log("Login button Psdsdsressed", res);

    }

    const createAccountPressed = () => {
        navigation.navigate("RegisterScreen");
    }

    return (
        <BlankScreenTemplate contentStyle={styles.content}>
            <View style={styles.textInputContainer}>
                <Text type={TextType.BODY_1} style={styles.textInputLabel}>
                    E-mail
                </Text>
                <TextInput
                    keyboardType='email-address'
                    style={styles.textInput}
                    onChangeText={str => setEmail(str)}
                    value={email}
                />
            </View>
            <View style={styles.textInputContainer}>
                <Text type={TextType.BODY_2} style={styles.textInputLabel}>
                    Password 
                </Text>
                <TextInput
                    keyboardType='default'
                    style={styles.textInput}
                    onChangeText={str => setPassword(str)}
                    value={password}
                    secureTextEntry={true}
                />
            </View>
            <Button
                type={ButtonType.WHITE}
                title={"Login"}
                onPress={loginPressed}
                containerStyle={styles.button}
            />
            <Button
                type={ButtonType.WHITE}
                title={"Create Account"}
                onPress={createAccountPressed}
                containerStyle={styles.button}
            />
            
        </BlankScreenTemplate>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingTop: '40%',
    },
    textInputContainer: {
        alignItems: 'flex-start',
        alignSelf: 'center',
        width: '66%',
    },
    textInputLabel: {
        marginBottom: unitH * 20,
    },
    textInputErrorLabel: {
        marginTop: unitH * -60,
        marginBottom: unitH * 20,
        color: PrimaryColors.Red,
    },
    textInput: {
        fontSize: 20,
        width: '100%',
        borderWidth: 0.7,
        marginBottom: unitH * 60,
    },
    button: {
        alignSelf: 'center',
        width: '66%',
        borderWidth: 0.7,
        borderRadius: 0,
        marginTop: unitH * 80,
    },
    forgotPassword: {
        alignSelf: 'center',
        marginTop: unitH * 80,
        width: '66%',
    },
    register: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: unitH * 50,
    }

});