import React, {useEffect, useState, useContext} from 'react';
import {Alert, ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {PERMISSIONS, check, request, RESULTS} from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BlankScreenTemplate from '../../components/ScreenTemplate/BlankScreenTemplate';
import BlurView from '../../components/BlurView';
import Text from '../../components/Text';
import { TextInput } from '../../components/TextInput';
import Button, {ButtonType} from '../../components/Button';
import { AuthContext } from '../../context';
import {TextType} from '../../theme/typography';
import {unitH, unitW} from '../../theme/constant';
import {PrimaryColors, Transparents} from '../../theme/colors';
import LoginScreenTemplate from '../../components/ScreenTemplate/LoginScreenTemplate';

export const RegisterScreen = ({navigation}) => {
    const authContext = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [profilePhoto, setProfilePhoto] = useState();

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
            password: password,
            profilePhoto: profilePhoto,
        });

        if (res.error) {
            Alert.alert("Artem 👨🏼‍🦳", res.error);
            return;
        }else{
            navigation.navigate("BottomNavigation", { selectedIndex: 0 });
        }
    }

    const pickImage = () => {
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
        }).then((image) => {
          console.log(image);
    
          setProfilePhoto(image.path);
          console.log(profilePhoto);
        });
    };

    const addProfilePic = async () => {
        const status = await request(PERMISSIONS.ANDROID.CAMERA);
        console.log(status);

        if (status !== RESULTS.GRANTED) {
            Alert.alert(
                'Camera Permission Denied',
                'Artem needs permission to access your Camera. 👨🏼‍🦳',
                [
                    {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
            );
        }

        pickImage();
    };

    const validatepassword = (password, confirmpassword) => {
        // ... compare 
        return (password!="") && (confirmpassword!="") && (password === confirmpassword);
    }
    
    return (
        <LoginScreenTemplate contentStyle={styles.content}>
            <BlurView style={styles.blurView}>
                <View style={styles.form}>
                    <Pressable style={styles.avatarContainer} onPress={addProfilePic}>
                        {profilePhoto ? <Image
                            resizeMode='contain'
                            source={{ uri: profilePhoto}}
                            style={styles.avatar}
                        /> : <MaterialCommunityIcons name={'plus'} color={PrimaryColors.Black} size={unitH * 200} />}
                    </Pressable>
                    <TextInput
                        containerStyle={styles.textInputContainer}
                        title="E-mail *"
                        keyboardType='email-address'
                        style={styles.textInput}
                        onChangeText={str => setEmail(str)}
                        value={email}
                        // placeholder={"demo@gmail.com"}
                    />
                    <TextInput
                        containerStyle={styles.textInputContainer}
                        title="Name *"
                        keyboardType='default'
                        style={styles.textInput}
                        onChangeText={str => setName(str)}
                        value={name}
                    />
                    <TextInput
                        containerStyle={styles.textInputContainer}
                        title="Password *"
                        keyboardType="default"
                        style={styles.textInput}
                        onChangeText={str => setPassword(str)}
                        value={password}
                        isPassword={true}
                    />
                    <TextInput
                        containerStyle={styles.textInputContainer}
                        title="Confirm Password *"
                        keyboardType="default"
                        style={styles.textInput}
                        onChangeText={str => setConfirmPassword(str)}
                        value={confirmpassword}
                        isPassword={true}
                    />

                    <Button
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
                </View>
            </BlurView>
        </LoginScreenTemplate>
    );
}


const styles = StyleSheet.create({
    // Form fields
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    blurView: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      alignSelf: 'center',
      borderWidth: 0
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
        marginBottom: unitH * 60,
    },
    button: {
        alignSelf: 'center',
        width: '66%',
        marginTop: unitH * 80,
    },
    backToLogin: {
        alignSelf: 'flex-end',
        marginTop: unitH * 80,
        // width: '66%',
        height: unitH * 50,
    },

    avatarContainer: {
        width: unitH * 300,
        height: unitH * 300,
        borderRadius: unitH * 150,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginVertical: 20,
        backgroundColor: Transparents.BlueColor,
    },
    avatar: {
        flex: 1,
        width: unitH * 300,
        height: unitH * 300,
        borderRadius: unitH * 150,
    },
});