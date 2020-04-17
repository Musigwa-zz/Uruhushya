import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import Boarding from 'react-native-app-intro-slider';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { withTheme } from 'react-native-paper';
import Icon from '../components/Icons';

import info from '../assets/images/question.png';
import hospital from '../assets/images/medicine.png';
import work from '../assets/images/work.png';
import shopping from '../assets/images/shopping.png';

import { AUTH } from '../constants/routeNames';

const slides = [
  {
    key: 1,
    title: 'Ni ryari wasaba uruhushya?',
    subtitle:
      'Mu kwirinda ikwirakwizwa rya coronavirus, usabwe kuguma mu rugo. Cyereka niba urwaye, ushaka guhaha ibiribwa, kwaka serivisi za banki cyangwa izindi serivisi zihutirwa wasaba uruhushya.',
    image: info,
  },
  {
    key: 2,
    title: 'Ukeneye kujya kwivuza',
    subtitle:
      "Niba ufite ikibazo cy'ubuzima ukeneye kubonana n'abaganga, cyangwa ufitanye gahunda na muganga (rendex-vous), ushobora gusaba uruhushya rwo kujya kwivuza ukamenyekanisha n'ivuriro uribugane.",
    image: hospital,
  },
  {
    key: 3,
    title: 'Ukeneye guhaha ibiribwa',
    subtitle:
      'Mu gihe ukeneye guhaha ibyo kurya cyangwa kunywa byo kumarana igihe kirekire, ushobora gusaba uruhushya rwo kujya ku isoko ubonaho ibyo kurya ushaka.',
    image: shopping,
  },
  {
    key: 4,
    title: "Kujya muri servisi y'ingenzi",
    subtitle:
      "Indi servisi yihutirwa nko kujya kuri banki, cyangwa akazi k'ubutabazi kahawe uburenganzira bwo gukomeza kuko gafite uruhare rw'ingenzi mu mibereho y'abantu.",
    image: work,
  },
];

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: wp('3%'),
    paddingBottom: hp('8%'),
  },
  avatar: {
    borderRadius: null,
    borderWidth: null,
    backgroundColor: 'transparent',
    width: wp('90%'),
    height: hp('40%'),
  },
  title: {
    fontWeight: 'bold',
    fontSize: hp('3.1%'),
    textAlign: 'center',
    marginBottom: hp('3%'),
  },
  subtitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: hp('3.4%'),
    fontSize: hp('2.1%'),
  },
  buttonCircle: {
    width: hp('6%'),
    height: hp('6%'),
    borderRadius: hp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const Onboarding = ({ navigation, theme }) => {
  const { colors } = theme;
  return (
    <Boarding
      keyExtractor={({ key }) => String(key)}
      renderItem={({ item }) => (
        <View style={[styles.container, { backgroundColor: colors.secondary }]}>
          <Image source={item.image} style={styles.avatar} />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={[styles.subtitle, { color: colors.disabled }]}>
              {item.subtitle}
            </Text>
          </View>
        </View>
      )}
      data={slides}
      activeDotStyle={{ backgroundColor: colors.primary }}
      renderDoneButton={() => (
        <View
          style={[styles.buttonCircle, { backgroundColor: colors.primary }]}>
          <Icon
            name="md-done-all"
            color={colors.secondary}
            size={24}
            type="ionicon"
            onPress={() => navigation.navigate(AUTH)}
          />
        </View>
      )}
      renderNextButton={() => (
        <View
          style={[styles.buttonCircle, { backgroundColor: colors.primary }]}>
          <Icon
            name="md-arrow-round-forward"
            color={colors.secondary}
            size={24}
            type="ionicon"
          />
        </View>
      )}
    />
  );
};

export default withTheme(Onboarding);
