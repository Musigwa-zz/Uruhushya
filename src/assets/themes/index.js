import { Dimensions } from 'react-native';
import { DefaultTheme, configureFonts } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

export const genColor = (opacity = 1) => ({
  primary: `rgba(24, 64, 133, ${opacity})`,
  accent: `rgba(255, 255, 255, ${opacity})`,
  text: `rgba(0, 0, 0, ${opacity})`,
  primaryDark: `rgba(0, 46, 128, ${opacity})`,
  accentDark: `rgba(204, 204, 204, ${opacity})`,
  error: `rgba(186, 0, 13, ${opacity})`,
  secondary: `rgba(255, 255, 255, ${opacity})`,
  darkText: `rgba(29, 57, 77,${opacity})`,
  darkBlue: '#1D394D',
  white: '#FFFFFF',
});

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'SF-Pro-Text',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'SF-Pro-Text-Medium',
      fontWeight: 'normal',
    },
  },
};

export const illustrations = {
  names: ['medicine', 'questions', 'shopping', 'work', 'directions'],
  urls: ['https://www.manypixels.co/gallery/', 'https://undraw.co'],
};
export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: genColor().primary,
    primaryLight: genColor(0.4).primary,
    text: genColor().text,
    accent: genColor().accent,
    background: genColor().accent,
    surface: genColor().accent,
    disabled: genColor(0.5).text,
    border: genColor(0.4).text,
    placeholder: genColor(0.2).text,
    backdrop: genColor().accentDark,
    error: genColor().error,
    secondary: genColor().secondary,
  },
  fonts: configureFonts(fontConfig),
  roundness: 5,
  dimensions: (percentile = 100) => ({
    width: (width * percentile) / 100,
    height: (height * percentile) / 100,
  }),
};
