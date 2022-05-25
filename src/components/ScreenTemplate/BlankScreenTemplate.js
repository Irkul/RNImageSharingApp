import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, ScrollView, StatusBar, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { AppContext } from '../../context/AppContext';
import { AuthContext } from '../../context/AuthContext';
import { PrimaryColors } from '../../theme/colors';

const statusBarHeight = getStatusBarHeight();

const BlankScreenTemplate = (props) => {

    const { isLoading } = useContext(AuthContext);
    const {children, contentStyle} = props;

    const [loading, setLoading] = useState(isLoading);

    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading]);

    return(
        <View style={styles.page_wrapper}>
            <Spinner
                visible={loading}
                size="large"
                color={PrimaryColors.Blue}
            />
            {!loading&&<>
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
                <ScrollView style={{...styles.container, ...contentStyle}}>
                    {children}
                </ScrollView>
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
        // flex:1
    },
});

export default BlankScreenTemplate;