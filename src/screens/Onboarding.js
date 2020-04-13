import React from 'react';
import { StyleSheet } from 'react-native';
import Boarding from 'react-native-onboarding-swiper';
import { Avatar, withTheme } from 'react-native-paper';

import info from '../assets/images/ask.png';
import hospital from '../assets/images/hospital.png';
import work from '../assets/images/work.png';
import shopping from '../assets/images/shopping.png';

import { LOGIN } from '../constants/routeNames';

const styles = StyleSheet.create({
  container: { justifyContent: 'flex-start', marginTop: 40, padding: 10 },
  avatar: {
    borderRadius: null,
    borderWidth: null,
    backgroundColor: 'transparent',
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 5,
  },
  subtitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
const Onboarding = ({ navigation, theme }) => {
  const { colors } = theme;
  return (
    <Boarding
      pages={[
        {
          image: (
            <Avatar.Image size={350} style={styles.avatar} source={info} />
          ),
          backgroundColor: 'white',
          title: 'Ni ryari wasaba uruhushya?',
          subtitle:
            'Mu kwirinda ikwirakwizwa rya coronavirus, usabwe kuguma mu rugo. Cyereka niba urwaye, ushaka guhaha ibiribwa, kwaka serivisi za banki cyangwa izindi serivisi zihutirwa wasaba uruhushya.',
        },
        {
          image: (
            <Avatar.Image size={350} style={styles.avatar} source={hospital} />
          ),
          backgroundColor: 'white',
          title: 'Ukeneye kujya kwivuza',
          subtitle:
            "Niba ufite ikibazo cy'ubuzima ukeneye kubonana n'abaganga, cyangwa ufitanye gahunda na muganga (rendex-vous), ushobora gusaba uruhushya rwo kujya kwivuza ukamenyekanisha n'ivuriro uribugane.",
        },
        {
          image: (
            <Avatar.Image size={350} style={styles.avatar} source={shopping} />
          ),
          backgroundColor: 'white',
          title: 'Ukeneye guhaha ibiribwa',
          subtitle:
            'Mu gihe ukeneye guhaha ibyo kurya cyangwa kunywa byo kumarana igihe kirekire, ushobora gusaba uruhushya rwo kujya ku isoko ubonaho ibyo kurya ushaka.',
        },
        {
          image: (
            <Avatar.Image size={300} style={styles.avatar} source={work} />
          ),
          backgroundColor: 'white',
          title: "Kujya muri servisi y'ingenzi",
          subtitle:
            "Indi servisi yihutirwa nko kujya kuri banki, cyangwa akazi k'ubutabazi kahawe uburenganzira bwo gukomeza kuko gafite uruhare rw'ingenzi mu mibereho y'abantu.",
        },
      ]}
      nextLabel={'Komeza'}
      showSkip={false}
      containerStyles={styles.container}
      titleStyles={styles.title}
      subTitleStyles={{ ...styles.subtitle, color: colors.disabled }}
      onDone={() => navigation.navigate(LOGIN)}
      bottomBarColor={'rgba(38, 176, 86,0.4)'}
      bottomBarHighlight={false}
    />
  );
};

export default withTheme(Onboarding);
