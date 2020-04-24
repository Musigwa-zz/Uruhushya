import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Title, Text } from 'react-native-paper';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import style from '../styles';

import Icon from '../components/Icons';
import { REQUEST, INFO, PROFILE } from '../constants/routeNames';
import { getReasons, getTransports } from '../redux/actions/passRequest';

const menu = [
  {
    color: (opacity = 1) => `rgba(156, 201, 46, ${opacity})`,
    title: 'Umwirondoro wawe',
    route: PROFILE,
    iconProps: { name: 'user-cog', type: 'fontAwesome5' },
  },
  {
    color: (opacity = 1) => `rgba(24, 64, 133, ${opacity})`,
    title: 'Saba uruhushya',
    route: REQUEST,
    iconProps: { name: 'send-o', type: 'fontAwesome' },
  },
  {
    color: (opacity = 1) => `rgba(201, 109, 4, ${opacity})`,
    title: 'Irinde korona virusi',
    route: INFO,
    iconProps: { name: 'info', type: 'entypo' },
  },
];

const styles = StyleSheet.create({
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

class Home extends Component {
  async componentDidMount() {
    const { fetchTransports, fetchReasons } = this.props;
    fetchTransports();
    fetchReasons();
  }

  render() {
    const { userData: { user } = {}, theme, navigation } = this.props;
    const { colors } = theme;
    return (
      <View style={[style.container, { backgroundColor: colors.secondary }]}>
        <Title style={[styles.title, { color: colors.disabled }]}>
          Murakaza neza,
          <Text style={{ color: colors.primary }}>{`\t${user.name}`}</Text>
        </Title>
        <Text style={[styles.description, { color: colors.disabled }]}>
          Kugira ngo utangire gukoresha iri koranabuhanga, wahitamo igikorwa
          kimwe mu byerekanishijwe ibimenyetso bikurikira
        </Text>
        <View style={styles.menuWrapper}>
          {menu.map((m, i) => (
            <TouchableOpacity
              key={Number(i)}
              activeOpacity={0.8}
              onPress={() => m.route && navigation.navigate(m.route)}
              style={[
                styles.menu,
                {
                  height: i + 1 === menu.length ? hp('23%') : hp('30%'),
                  backgroundColor: m.color(0.1),
                },
              ]}>
              <Icon {...m.iconProps} color={m.color()} size={hp('6%')} />
              <Text style={[styles.menuText, { color: colors.disabled }]}>
                {m.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ userData }) => ({ userData });

const mapDispatchToProps = {
  fetchReasons: getReasons,
  fetchTransports: getTransports,
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Home));
