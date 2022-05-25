import React, { useContext, useEffect, useState } from 'react';
import {ImageBackground, StyleSheet, SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { AppContext } from '../../context/AppContext';
import { AuthContext } from '../../context/AuthContext';
import { PrimaryColors, SecondaryColors } from '../../theme/colors';
import {unitH, unitW} from '../../theme/constant';

const LoginScreenTemplate = (props) => {

    const { isLoading } = useContext(AuthContext);
    const {children, contentStyle} = props;

    const [loading, setLoading] = useState(isLoading);

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading]);

    const loginImage = require('../../../assets/loginImage.png');
    // const loginImage = require('../../../assets/SkyBlueImage.png');


    return(
        <SafeAreaView style={styles.container}>
            <Spinner
                visible={loading}
                size="large"
                color={PrimaryColors.Blue}
            />
            {!loading&&<>
                <ImageBackground
                    style={styles.backgroundViewContainer}
                    source={loginImage}
                    resizeMode='cover'
                    blurRadius={50}
                >
                    <ScrollView style={styles.container}>
                        {children}
                    </ScrollView>
                </ImageBackground>
            </>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    backgroundViewContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    blueRectangle: {
        alignSelf: 'center',
        marginTop: unitH * 350,
        width: unitH * 350,
        height: unitH * 350,
        backgroundColor: SecondaryColors.Blue,
        opacity: 0.3,
        transform: [{rotate: '154deg'}]
    },
    pinkCircle: {
        alignSelf: 'center',
        marginTop: unitH * 350,
        width: unitH * 350,
        height: unitH * 350,
        borderRadius: unitH * 175,
        backgroundColor: PrimaryColors.Red,
    },
    redCircle: {
        alignSelf: 'center',
        marginTop: unitH * 350,
        width: unitH * 350,
        height: unitH * 350,
        borderRadius: unitH * 175,
        backgroundColor: SecondaryColors.Red,
    },
});

export default LoginScreenTemplate;