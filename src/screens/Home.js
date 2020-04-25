import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
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
import { getProvinces } from '../redux/actions/fetchLocations';

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

class Home extends Component {
  async componentDidMount() {
    const { fetchTransports, fetchReasons, fetchProvinces } = this.props;
    fetchTransports();
    fetchReasons();
    fetchProvinces();
  }

  render() {
    const { userData: { user } = {}, theme, navigation } = this.props;
    const { colors } = theme;
    return (
      <View style={[style.container, { backgroundColor: colors.secondary }]}>
        <Title style={[style.title, { color: colors.disabled }]}>
          Murakaza neza,
          <Text style={{ color: colors.primary }}>{`\t${user.name}`}</Text>
        </Title>
        <Text style={[style.description, { color: colors.disabled }]}>
          Kugira ngo utangire gukoresha iri koranabuhanga, wahitamo igikorwa
          kimwe mu byerekanishijwe ibimenyetso bikurikira
        </Text>
        <View style={style.menuWrapper}>
          {menu.map((m, i) => (
            <TouchableOpacity
              key={Number(i)}
              activeOpacity={0.8}
              onPress={() => m.route && navigation.navigate(m.route)}
              style={[
                style.menu,
                {
                  height: i + 1 === menu.length ? hp('23%') : hp('30%'),
                  backgroundColor: m.color(0.1),
                },
              ]}>
              <Icon {...m.iconProps} color={m.color()} size={hp('6%')} />
              <Text style={[style.menuText, { color: colors.disabled }]}>
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
  fetchProvinces: getProvinces,
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Home));
