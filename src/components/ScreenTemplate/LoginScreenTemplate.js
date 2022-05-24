import React, { useContext, useEffect, useState } from 'react';
import {ImageBackground, StyleSheet, ScrollView, StatusBar, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { AppContext } from '../../context/AppContext';
import { AuthContext } from '../../context/AuthContext';
import { PrimaryColors } from '../../theme/colors';
import {unitH, unitW} from '../../theme/constant';

const statusBarHeight = getStatusBarHeight();

const LoginScreenTemplate = (props) => {

    const { isLoading } = useContext(AuthContext);
    const {children, contentStyle} = props;

    const [loading, setLoading] = useState(isLoading);

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading]);

    const loginImage = require('../../../assets/loginImage.png');

    return(
        <View style={styles.page_wrapper}>
            <Spinner
                visible={loading}
                size="large"
                color={PrimaryColors.Blue}
            />
            {!loading&&<>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
                <ImageBackground style={styles.backgroundViewContainer} source={loginImage} resizeMode='cover'>
                    <View style={styles.blueRectangle} /> 

                    {children}
                </ImageBackground>
            </>}
        </View>
    )
}

const styles = StyleSheet.create({
    page_wrapper:{
        backgroundColor: '#ffffff',
        flex: 1,
        paddingTop: statusBarHeight,
        position: 'relative',
    },
    container:{
        flex:1
    },
    backgroundViewContainer: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    blueRectangle: {
        position: 'absolute',
        marginTop: unitH * 350,
        width: unitH * 350,
        height: unitH * 350,
        backgroundColor: 'blue',
        transform: [{rotate: '154deg'}]
    },
    pinkCircle: {
        position: 'absolute',
        marginTop: unitH * 1050,
        width: unitH * 350,
        height: unitH * 350,
        borderRadius: unitH * 175,
        backgroundColor: 'pink',
    },
    redCircle: {
        position: 'absolute',
        marginTop: unitH * 1750,
        width: unitH * 350,
        height: unitH * 350,
        borderRadius: unitH * 175,
        backgroundColor: 'Red',
    },
});

export default LoginScreenTemplate;