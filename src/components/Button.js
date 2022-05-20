import React from 'react';
import {
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Text from './Text';
import {TextType} from '../theme/typography';
import {PrimaryColors, SecondaryColors} from '../theme/colors';
import {unitH, unitW} from '../theme/constant';

export const ButtonType = {
  PRIMARY,
  SECONDARY,
  WHITE,
}

export default function Button({
  title,
  type,
  disabled = false,
  containerStyle,
  onPress,
  onLayout,
}) {
  return (
    <AlexPressable
      onLayout={onLayout}
      disabled={disabled}
      style={[styles.pressableStyle, pressableStyles[type], containerStyle]}
      onPress={onPress}>
      <Text
        type={TextType.BUTTON_1}
        style={{
          ...styles.textStyle,
          color:
            type == ButtonType.WHITE
              ? PrimaryColors.Black
              : PrimaryColors.White,
        }}>
        {title}
      </Text>
    </AlexPressable>
  );
}

export const BorderRoundedButton = ({
  title,
  onPress,
  style,
}) => {
  return (
    <AlexPressable
      style={[styles.borderRoundedButton, style]}
      onPress={onPress}>
      <Text type={TextType.BUTTON_2} style={styles.textStyle}>
        {title}
      </Text>
    </AlexPressable>
  );
};

export const Separator = ({style}) => {
  return <View style={[styles.separator, style]} />;
};

export const ButtonRow = ({
  children,
  style,
}) => {
  return <View style={[styles.buttonRow, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  pressableStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 158 * unitH,
    borderRadius: (158 * unitH) / 2,
  },
  textStyle: {
    alignSelf: 'center',
    color: PrimaryColors.White,
  },
  separator: {
    width: unitW * 54,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  borderRoundedButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: unitH * 110,
    width: unitW * 524,
    borderRadius: (unitH * 110) / 2,
    borderWidth: 1,
    borderColor: PrimaryColors.Sand,
  },
});

const pressableStyles = StyleSheet.create({
  [ButtonType.PRIMARY]: {
    backgroundColor: PrimaryColors.Red,
  },
  [ButtonType.SECONDARY]: {
    backgroundColor: 'transparent',
    borderColor: SecondaryColors.Gray,
    borderWidth: 1, //3
  },
  [ButtonType.WHITE]: {
    backgroundColor: PrimaryColors.White,
  },
});
