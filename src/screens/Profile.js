import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import {
  Text,
  withTheme,
  Button,
  TextInput as Input,
} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import inputs from '../constants/inputProps';
import styles from '../styles';
import Icon from '../components/Icons';
import {
  getProvinces,
  getDistricts,
  getSectors,
} from '../redux/actions/fetchLocations';
import { registerUser } from '../redux/actions/currentUser';

import Select from '../components/Inputs/Select';

class Profile extends Component {
  state = {
    userInfo: {
      province: {},
      district: {},
      sector: {},
      name: null,
      phone: '',
      nid: null,
    },
  };

  confirmProvince = async (provinceId) => {
    const { fetchDistricts, locations } = this.props;
    const { userInfo } = this.state;
    const { provinces = [] } = locations;
    this.setState({
      userInfo: {
        ...userInfo,
        province: provinces.find((p) => p.id === provinceId),
      },
    });
    await fetchDistricts(provinceId);
  };

  confirmDistrict = async (districtId) => {
    const { fetchSectors, locations } = this.props;
    const { userInfo } = this.state;
    const { districts = [] } = locations;
    this.setState({
      userInfo: {
        ...userInfo,
        district: districts.find((d) => d.id === districtId),
      },
    });
    await fetchSectors(districtId);
  };

  confirmSector = async (sectorId) => {
    const { locations } = this.props;
    const { userInfo } = this.state;
    const { sectors = [] } = locations;
    this.setState({
      userInfo: {
        ...userInfo,
        sector: sectors.find((s) => s.id === sectorId),
      },
    });
  };

  onChangeText = (target, value) => {
    const { userInfo } = this.state;
    this.setState({ userInfo: { ...userInfo, [target]: value } });
  };

  onSubmit = () => {
    const { userInfo } = this.state;
    const { submitUser } = this.props;
    submitUser(userInfo);
  };

  render() {
    const { theme, locations, userData } = this.props;
    const { user, isFetching } = userData;
    let { provinces = [], districts = [], sectors = [] } = locations;
    const { colors } = theme;
    const { userInfo } = this.state;

    if (provinces.length) {
      provinces = provinces.map((p) => ({ ...p, name: p.izina }));
    }
    const {
      province: { izina: provinceName = 'Intara utuyemo' } = {},
      district: { name: districtName = 'Akarere utuyemo' } = {},
      sector: { name: sectorName = 'Umurenge utuyemo' } = {},
    } = userInfo;
    const { name, nid, phone, sector, district, province } = userInfo;
    const enabled =
      name &&
      nid &&
      (phone.length === 10 || user.phone) &&
      sector.id &&
      district.id &&
      province.id;
    const phoneProps = inputs.find((i) => i.id === 'phone');
    return (
      <View
        style={[
          styles.container,
          {
            paddingVertical: hp('3%'),
            paddingHorizontal: wp('6%'),
            backgroundColor: colors.secondary,
          },
        ]}>
        <Icon
          name="account-edit"
          type="materialCommunity"
          size={hp('9%')}
          color={colors.disabled}
          style={{ marginBottom: hp('3%') }}
        />
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: hp('3.1%'),
            marginBottom: 10,
            color: colors.disabled,
          }}>
          Wahindura imyirondoro yawe!
        </Text>
        {inputs
          .filter((ip) => ip.id === 'nid' || ip.id === 'name')
          .map((input, k) => (
            <View
              key={Number(k)}
              style={[
                styles.inputWrapper,
                {
                  borderColor: colors.disabled,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 12,
                },
              ]}>
              <Icon
                type="fontisto"
                name={input.id === 'nid' ? 'passport-alt' : 'person'}
                size={20}
                color={colors.primary}
                style={{ marginRight: 8 }}
              />
              <TextInput
                key={Number(k)}
                style={{ color: colors.primary, fontWeight: 'bold' }}
                {...input}
                placeholder={input.label}
                defaultValue={user[input.id]}
                onChangeText={(text) => this.onChangeText(input.id, text)}
              />
            </View>
          ))}
        <View
          style={[
            styles.inputWrapper,
            {
              borderWidth: 0,
              flexDirection: 'row',
              marginBottom: hp('3%'),
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}>
          <View
            style={{
              borderColor: colors.disabled,
              borderWidth: 0.3,
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 12,
              width: user.location ? '47%' : '100%',
            }}>
            <Icon
              type="material"
              name="phone-in-talk"
              size={20}
              color={colors.primary}
              style={{ marginRight: 8 }}
            />
            <TextInput
              style={{ color: colors.primary, fontWeight: 'bold' }}
              {...phoneProps}
              placeholder={phoneProps.label}
              defaultValue={user[phoneProps.id]}
              onChangeText={(text) => this.onChangeText(phoneProps.id, text)}
            />
          </View>
          {user.location && (
            <Select
              title={provinceName}
              popupTitle="Hitamo intara utuyemo"
              style={{
                width: user.location ? '47%' : '100%',
                height: hp('6%'),
              }}
              data={provinces}
              onSelect={this.confirmProvince}
              theme={theme}
            />
          )}
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          {user.location && (
            <Select
              title={districtName}
              popupTitle="Hitamo akarere utuyemo"
              style={{ width: '47%' }}
              data={districts}
              onSelect={this.confirmDistrict}
              theme={theme}
            />
          )}
          {user.location && (
            <Select
              title={sectorName}
              popupTitle="Hitamo umurenge utuyemo"
              style={{ width: '47%', height: hp('6%'), alignSelf: 'flex-end' }}
              data={sectors}
              onSelect={this.confirmSector}
              theme={theme}
            />
          )}
        </View>
        <Button
          mode="contained"
          loading={isFetching}
          disabled={!enabled || isFetching}
          style={{ marginTop: hp('3.5%') }}
          labelStyle={{ color: colors.secondary, fontWeight: 'bold' }}
          onPress={this.onSubmit}>
          emeza impinduka
        </Button>
      </View>
    );
  }
}

const mapStateToProps = ({ locations, userData }) => ({ locations, userData });

const mapDispatchToProps = {
  fetchProvinces: getProvinces,
  fetchDistricts: getDistricts,
  fetchSectors: getSectors,
  submitUser: registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Profile));
