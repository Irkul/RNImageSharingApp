import React from 'react';
import {Text as RNText, TextProps} from 'react-native';
import {TextType, TextStyles} from '../theme/typography';

export default function Text({children, type, style, ...otherProps}) {
  return (
    <RNText style={[TextStyles[type], style]} {...otherProps}>
      {children}
    </RNText>
  );
}
