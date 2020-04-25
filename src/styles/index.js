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
    marginTop: hp('3%'),
    borderWidth: 0.3,
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp('1%'),
  },
  description: {
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: hp('3.4%'),
    fontSize: hp('2.1%'),
    margin: hp('0.9%'),
  },
  menuWrapper: {
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  menu: {
    justifyContent: 'space-evenly',
    marginTop: hp('2.2%'),
    alignItems: 'center',
    width: wp('45%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    borderRadius: hp('2%'),
  },
  menuText: {
    textAlign: 'center',
    fontSize: hp('2.8%'),
    fontWeight: 'bold',
  },
});
