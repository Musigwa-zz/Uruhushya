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
            marginBottom: 40,
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
                style={{ marginRight: 8 }}
              />
              <TextInput
                key={Number(k)}
                style={{ color: 'blue' }}
                {...input}
                placeholder={input.label}
                defaultValue={
                  input.id === 'phone' && user.phone ? user.phone : null
                }
                selectionColor={colors.primary}
                onChangeText={(text) => this.onChangeText(input.id, text)}
              />
            </View>
          ))}
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: hp('2%'),
          }}>
          {provinces.length !== 0 && (
            <Select
              title={provinceName}
              popupTitle="Hitamo intara utuyemo"
              style={{ width: districts.length !== 0 ? '47%' : '100%' }}
              data={provinces}
              onSelect={this.confirmProvince}
              theme={theme}
            />
          )}
          {districts.length !== 0 && (
            <Select
              title={districtName}
              popupTitle="Hitamo akarere utuyemo"
              style={{ width: '47%' }}
              data={districts}
              onSelect={this.confirmDistrict}
              theme={theme}
            />
          )}
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            // marginTop: hp('2%'),
          }}>
          {sectors.length !== 0 && (
            <Select
              title={sectorName}
              popupTitle="Hitamo umurenge utuyemo"
              style={{ width: '47%', height: hp('6%'), alignSelf: 'flex-end' }}
              data={sectors}
              onSelect={this.confirmSector}
              theme={theme}
            />
          )}
          {inputs
            .filter((ip) => ip.id === 'phone')
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
                  type="material"
                  name="phone-in-talk"
                  size={20}
                  style={{ marginRight: 8 }}
                />
                <TextInput
                  style={{ color: 'blue' }}
                  {...input}
                  placeholder={input.label}
                  defaultValue={
                    input.id === 'phone' && user.phone ? user.phone : null
                  }
                  selectionColor={colors.primary}
                  onChangeText={(text) => this.onChangeText(input.id, text)}
                />
              </View>
            ))}
          {/* <Input
            {...inputs.find((i) => i.id === 'phone')}
            defaultValue={user.phone ? user.phone : null}
            mode="outlined"
            style={{
              width: sectors.length !== 0 ? '47%' : '100%',
              height: hp('6%'),
            }}
            autoCompleteType="off"
            selectionColor={colors.primary}
            onChangeText={(text) => this.onChangeText('phone', text)}
          /> */}
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
