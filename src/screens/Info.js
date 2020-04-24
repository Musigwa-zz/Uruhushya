import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import Boarding from 'react-native-app-intro-slider';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import Icon from '../components/Icons';

import virus from '../assets/images/virus.png';
import wash from '../assets/images/wash.png';
import doctor from '../assets/images/doctor.png';
import time from '../assets/images/time.png';
import cough from '../assets/images/cough.png';

const slides = [
  {
    key: 1,
    title: "Korona virusi (Covid-19) n'iki?",
    subtitle:
      "Ni agakoko kinjira mu mubiri w'umuntu kakangiza ibihaha bikamutera guhumeka bigoranye kugeza aho ahobora no kubura ubuzima. ubwoko bushya bwa coronavirus bwahawe izina rya Covid-19 buri mu bwoko bwa za virus, udukoko duto cyane tutaboneshwa amaso, bita corona.",
    image: virus,
  },
  {
    key: 2,
    title: "Ibimenyetso byayo n'ibihe?",
    subtitle:
      "Niba ufite ikibazo cy'ubuzima ukeneye kubonana n'abaganga, cyangwa ufitanye gahunda na muganga (rendex-vous), ushobora gusaba uruhushya rwo kujya kwivuza ukamenyekanisha n'ivuriro uribugane.",
    image: cough,
  },
  {
    key: 3,
    title: 'Ibaho igihe kingana gute?',
    subtitle:
      "Iyo iyi virusi igeze ku kintu runaka, ishobora kumaraho hagati y'amasaha 8 - 10 ku hantu horohereye nko ku giti kidatunganyije, iponji (sponge), igikarito, n'amasaha arenze kuri ayo ku bintu bikomeye nk'ikirahuri, plastike, icyuma, urubaho…",
    image: time,
  },
  {
    key: 4,
    title: 'Ese nakwirinda nte kuyandura?',
    subtitle:
      "\u2713\tKaraba intoki buri gihe n'isabune nyinshi n'amazi\n\u2713\tHorana imiti yagenewe kwica imyanda mu gihe udafite amazi n'isabune hafi yawe\n\u2713\tWikwikora ku mazuru, umunwa n'amaso n'intoki zisa nabi\n\u2713\tIrinde kwegera cyane (nturenge metero 1) umuntu ukorora cyangwa witsamura\n\u2713\tNiba ufite biriya bimenyetso guma mu nzu kandi wishyire mu kato. Hamagara nomero itishyurwa (114)",
    image: wash,
  },
  {
    key: 5,
    title: 'Ese uyirwaye yavurwa agakira?',
    subtitle:
      "Yego. Kugeza ubu 80% by'abayanduye bayikira badakeneye ubuvuzi budasanzwe. Ibimenyetso byayo ni byo bivurwa bigakira mu gihe iyi virus igenda ipfa mu mubiri igashira. Kimwe n'uko nta muti cyangwa urukingo biraboneka bivura virus itera ibicurane bisanzwe, coronavirus nayo ntirabonerwa umuti cyangwa urukingo.",
    image: doctor,
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
    height: hp('25%'),
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
class Info extends Component {
  render() {
    const { navigation, theme } = this.props;
    const { colors } = theme;
    return (
      <Boarding
        keyExtractor={({ key }) => String(key)}
        renderItem={({ item }) => (
          <View
            style={[styles.container, { backgroundColor: colors.secondary }]}>
            <Image source={item.image} style={styles.avatar} />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.title}>{item.title}</Text>
              <View>
                <Text style={[styles.subtitle, { color: colors.disabled }]}>
                  {item.subtitle}
                </Text>
              </View>
            </View>
          </View>
        )}
        data={slides}
        activeDotStyle={{ backgroundColor: colors.primary }}
        showSkipButton={false}
        showPrevButton={false}
        showNextButton={false}
        renderDoneButton={() => (
          <TouchableOpacity
            style={[styles.buttonCircle, { backgroundColor: colors.primary }]}
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}>
            <Icon
              name="md-done-all"
              color={colors.secondary}
              size={24}
              type="ionIcon"
            />
          </TouchableOpacity>
        )}
        renderNextButton={() => (
          <View
            style={[styles.buttonCircle, { backgroundColor: colors.primary }]}>
            <Icon
              name="md-arrow-round-forward"
              color={colors.secondary}
              size={24}
              type="ionIcon"
            />
          </View>
        )}
      />
    );
  }
}

const mapStateToProps = ({ userData }) => ({ userData });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Info));
