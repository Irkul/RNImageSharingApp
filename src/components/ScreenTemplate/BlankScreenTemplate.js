import React, { useContext } from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { AppContext } from '../../context/AppContext';
import { AuthContext } from '../../context/AuthContext';
import { PrimaryColors } from '../../theme/colors';

const statusBarHeight = getStatusBarHeight();

const BlankScreenTemplate = (props) => {

    const { isLoading } = useContext(AuthContext);
    const {children, contentStyle} = props;

    return(
        <View style={styles.page_wrapper}>
            <Spinner
                visible={isLoading}
                size="large"
                color={PrimaryColors.Blue}
            />
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
            <View style={{...styles.container, ...contentStyle}}>
                {children}
            </View>
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
});

export default BlankScreenTemplate;