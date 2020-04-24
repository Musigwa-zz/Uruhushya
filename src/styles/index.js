import { StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: null,
    borderWidth: null,
    backgroundColor: 'transparent',
  },
  inputWrapper: {
    width: '100%',
    height: hp('6%'),
    marginTop: hp('1.1%'),
    borderWidth: 0.3,
    borderRadius: 5,
  },
});
