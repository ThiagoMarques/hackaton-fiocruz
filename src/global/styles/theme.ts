import { Dimensions, Platform } from 'react-native';

const defaultFont =
  Platform.OS === 'android' ? 'SF-Compact-Text-Regular' : 'SF Compact Text';
export const Colors = {
  primary: '#132238',
  secondary: '#0D1624',
  secondaryTranslucent: 'rgba(13, 22, 36, 0.52)',
};
export default {
  colors: {
    black: '#000',
    white: '#fff',
    bg: '#e5f1f7',
    primary: '#0079b2',
    primaryLight: '#d4edf4',
    secondary: '#00486a',
    success: '#12a454',
    danger: '#e83f5b',
    dark: '#121214',
    light: '#f1f1f1',
    blue300: '#0099c5',
    blue500: '#003047',
    blue800: '#001823',
    gray500: '#a8a8b3',
    gray800: '#29292e',
  },
  fonts: {
    regular: 'Roboto_400Regular',
    bold: 'Roboto_700Bold',
  },
  default: {
    fontSize: 14,
    color: 'white',
    fontFamily: defaultFont,
    lineHeight: 20,
  },
  tag: {
    fontSize: 10,
    color: 'white',
    fontFamily: defaultFont,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: defaultFont,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    fontFamily: defaultFont,
  },
  buttonLabel: {
    fontSize: 14,
    color: 'white',
    fontWeight: '200',
    fontFamily: defaultFont,
  },
  numberProfile: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: defaultFont,
  },
  unitProfile: {
    fontSize: 14,
    color: 'white',
    fontFamily: defaultFont,
  },
  listCellStyle: {
    training: {
      borderRadius: 24,
      borderWidth: 0,
      borderColor: '#FFFFFF',
      height: 104,
    },
    message: {
      borderRadius: 24,
      borderWidth: 2,
      borderColor: '#FFFFFF',
      height: 104,
    },
    dailyTraining: {
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#d6d7da',
    },
  },
  backgroundStyle: {
    login: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    tabs: {
      backgroundColor: Colors.primary,
    },
    default: {
      opacity: 0.97,
      backgroundColor: Colors.primary,
    },
  },
  bButtonStyle: {
    default: {
      borderRadius: 24,
      borderWidth: 2,
      borderColor: '#FFFFFF',
      height: 48,
    },
    trainingInstructions: {
      borderRadius: 24,
      borderWidth: 0,
      borderColor: '#FFFFFF',
      height: 48,
    },
  },
  tagStyle: {
    default: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#FFFFFF',
      height: 20,
    },
  },
};
