import React, {useEffect, useContext, useState} from 'react';
import {Alert, Pressable, StyleSheet, View} from 'react-native';
import LoginScreenTemplate from '../../components/ScreenTemplate/LoginScreenTemplate';
import { TextInput } from '../../components/TextInput';
import BlurView from '../../components/BlurView';
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
        <LoginScreenTemplate contentStyle={styles.content}>
            <BlurView style={styles.blurView}>
                <View style={styles.form}>
                    <TextInput
                        containerStyle={styles.textInputContainer}
                        title="E-mail"
                        keyboardType="email-address"
                        style={styles.textInput}
                        onChangeText={str => setEmail(str)}
                        value={email}
                        placeholder={"demo@gmail.com"}
                    />
                    <TextInput
                        containerStyle={styles.textInputContainer}
                        title="Password"
                        keyboardType="default"
                        style={styles.textInput}
                        onChangeText={str => setPassword(str)}
                        value={password}
                        isPassword={true}
                    />
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
                        containerStyle={styles.RegisterButton}
                    />
                </View>
            </BlurView>
        </LoginScreenTemplate>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingTop: '40%',
    },
    blurView: {
        position: 'absolute',
        alignSelf: 'center',
        width: '80%',
        height: '60%',
        top: '20%',
    },
    form: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center'  
    },
    textInputContainer: {
        alignItems: 'flex-start',
        alignSelf: 'center',
        width: '66%',
    },
    textInput: {
        fontSize: 20,
        width: '100%',
        marginBottom: unitH * 60,
        color: PrimaryColors.White,
    },
    button: {
        alignSelf: 'center',
        width: '66%',
        marginTop: unitH * 80,
    },
    RegisterButton: {
        alignSelf: 'center',
        width: '66%',
        marginTop: unitH * 80,
        backgroundColor: PrimaryColors.Blue
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