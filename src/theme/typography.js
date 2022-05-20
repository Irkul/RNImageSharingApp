import {StyleSheet, TextStyle} from 'react-native';
import {PrimaryColors} from './colors';
import {unitH, unitW} from './constant';

export const TextType = {
  HEADER_1: "HEADER_1",
  HEADER_2: "HEADER_2",
  HEADER_3: "HEADER_3",
  HEADER_4: "HEADER_4",
  HEADER_5: "HEADER_5",
  HEADER_6: "HEADER_6",
  HEADER_7: "HEADER_7",
  HEADER_8: "HEADER_8",
  BODY_1: "BODY_1",
  BODY_2: "BODY_2",
  BODY_3: "BODY_3",
  // BODY_4: "BODY_4",
  // BODY_5: "BODY_5",
  BUTTON_1: "BUTTON_1",
  BUTTON_2: "BUTTON_2",
  BUTTON_3: "BUTTON_3",
  BUTTON_4: "BUTTON_4",
  TEXTINPUT: "TEXTINPUT",
}

const headerBase = {
  color: PrimaryColors.Black,
//   fontFamily: '',
  fontWeight: '500',
  textAlign: 'center',
};

const bodyBase = {
//   fontFamily: '',
  fontWeight: '600',
  textAlign: 'center',
};

const buttonBase = {
  color: PrimaryColors.Black,
//   fontFamily: '',
  fontWeight: '600',
  textAlign: 'center',
};

export const TextStyles = StyleSheet.create({
  [TextType.HEADER_1]: {
    ...headerBase,
    fontSize: 150 * unitH,
  },
  [TextType.HEADER_2]: {
    ...headerBase,
    fontSize: 100 * unitH,
  },
  [TextType.HEADER_3]: {
    ...headerBase,
    fontSize: 80 * unitH,
  },
  [TextType.HEADER_4]: {
    ...headerBase,
    fontSize: 80 * unitH,
    fontWeight: 'bold',
  },
  [TextType.HEADER_5]: {
    ...headerBase,
    fontSize: 48 * unitH,
    fontWeight: 'bold',
  },
  [TextType.HEADER_6]: {
    ...headerBase,
    fontSize: 48 * unitH,
    fontWeight: '600',
  },
  [TextType.HEADER_7]:{
    ...headerBase,
    fontSize: 66 * unitH,
    fontWeight: '600',
  },
  [TextType.HEADER_8]:{
    ...headerBase,
    fontSize: 30 * unitH,
    fontWeight: '500',
  },
  [TextType.BODY_1]: {
    ...bodyBase,
    fontSize: 36 * unitH,
  },
  [TextType.BODY_2]: {
    ...bodyBase,
    fontSize: 36 * unitH,
    fontWeight: 'bold',
  },
  [TextType.BODY_3]: {
    ...bodyBase,
    fontSize: 72 * unitH,
    fontWeight: '500',
  },
  [TextType.BUTTON_1]: {
    ...buttonBase,
    fontSize: 60 * unitH,
  },
  [TextType.BUTTON_2]: {
    ...buttonBase,
    fontSize: 36 * unitH,
    fontWeight: 'bold',
  },
  [TextType.BUTTON_3]: {
    ...buttonBase,
    fontSize: 52 * unitH,
    fontWeight: 'bold',
  },
  [TextType.BUTTON_4]: {
    ...buttonBase,
    fontSize: 70 * unitH,
    fontWeight: 'bold',
  },
  [TextType.TEXTINPUT]: {
    ...bodyBase,
    textAlign: 'left',
    fontSize: 72 * unitH,
  }
});
