import React, {useState} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

import { PrimaryColors, Transparents } from '../theme/colors';
import {unitH, unitW} from '../theme/constant';


export default function BlurView({children, style, ...otherProps}) {
  const loginImage = require('../../assets/loginImage.png');
  // const loginImage = require('../../assets/SkyBlueImage.png');

  return (
    <View style={{...styles.container, ...style}}>
      <ImageBackground
        style={styles.blurView}
        source={loginImage}
        resizeMode='cover'
        blurRadius={50}
      >
        {children}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: unitH * 10,
        borderRadius: unitH * 40,
        borderColor: PrimaryColors.White,
        // backgroundColor: Transparents.SkyBlue,
    },
    blurView: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      // backgroundColor: Transparents.SkyBlue,
      opacity: 0.9,
    },

});