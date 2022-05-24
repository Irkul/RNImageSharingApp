import React, {useEffect, useState, useContext} from 'react';
import {Alert, Pressable, StyleSheet, TextInput, View} from 'react-native';
import BlankScreenTemplate from '../../components/ScreenTemplate/BlankScreenTemplate';
import Text from '../../components/Text';
import Button, {ButtonType} from '../../components/Button';
import { AuthContext } from '../../context';
import {TextType} from '../../theme/typography';
import {unitH, unitW} from '../../theme/constant';
import {PrimaryColors} from '../../theme/colors';

export const RegisterScreen = ({navigation}) => {
    const authContext = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    const registerPressed = async () => {
        const passValidate = validatepassword(password, confirmpassword);
        if (email=="") {
            Alert.alert("Artem 👨🏼‍🦳", "Please input your email");
            return
        }
        if (name=="") {
            Alert.alert("Artem 👨🏼‍🦳", "Please input your name");
            return
        }
        if (!passValidate) {
            Alert.alert("Artem 👨🏼‍🦳", "Please input your password correctly");
            return
        }
        const res = await authContext.createUser({
            name: name,
            email: email,
            password: password
        });

        if (res.error) {
            Alert.alert("Artem 👨🏼‍🦳", res.error);
            return;
        }else{
            navigation.navigate("BottomNavigation", { selectedIndex: 0 });
        }
    }

    const validatepassword = (password, confirmpassword) => {
        // ... compare 
        return (password!="") && (confirmpassword!="") && (password === confirmpassword);
    }
    
    return (
        <BlankScreenTemplate contentStyle={styles.content}>
            <View style={styles.textInputContainer}>
                <Text type={TextType.BODY_1} style={styles.textInputLabel}>
                    Email *
                </Text>
                <TextInput
                    keyboardType='email-address'
                    style={styles.textInput}
                    onChangeText={str => setEmail(str)}
                    value={email}
                />
            </View>
            <View style={styles.textInputContainer}>
                <Text type={TextType.BODY_1} style={styles.textInputLabel}>
                    Name *
                </Text>
                <TextInput
                    keyboardType='default'
                    style={styles.textInput}
                    onChangeText={str => setName(str)}
                    value={name}
                />
            </View>
            <View style={styles.textInputContainer}>
                <Text type={TextType.BODY_1} style={styles.textInputLabel}>
                    Password *
                </Text>
                <TextInput
                    keyboardType='default'
                    style={styles.textInput}
                    onChangeText={str => setPassword(str)}
                    value={password}
                    secureTextEntry={true}
                />
            </View>
            <View style={styles.textInputContainer}>
                <Text type={TextType.BODY_1} style={styles.textInputLabel}>
                    Confirm Password *
                </Text>
                <TextInput
                    keyboardType='default'
                    style={styles.textInput}
                    onChangeText={str => setConfirmPassword(str)}
                    value={confirmpassword}
                    secureTextEntry={true}
                />
            </View>
            <Button
                type={ButtonType.WHITE}
                title={"Register"}
                onPress={registerPressed}
                containerStyle={styles.button}
            />
            <View style={styles.textInputContainer}>
                <Pressable
                    style={styles.backToLogin}
                    onPress={() => navigation.goBack()}
                >
                    <Text type={TextType.BODY_1}>I have an account</Text>
                </Pressable>
            </View>
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
    backToLogin: {
        alignSelf: 'flex-end',
        marginTop: unitH * 80,
        // width: '66%',
        height: unitH * 50,
    },

});