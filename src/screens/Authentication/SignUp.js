import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Text, withTheme, TextInput, Button } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import inputs from '../../constants/inputProps';
import styles from '../../styles';
import Icon from '../../components/Icons';
import {
  getProvinces,
  getDistricts,
  getSectors,
} from '../../redux/actions/fetchLocations';
import { registerUser } from '../../redux/actions/currentUser';

import Select from '../../components/Inputs/Select';
import { APP } from '../../constants/routeNames';

class SignUp extends Component {
  state = {
    userInfo: {
      province: {},
      district: {},
      sector: {},
      name: null,
      phone: '',
      nid: null,
    },
    loading: false,
  };

  async componentDidMount() {
    const { fetchProvinces } = this.props;
    await fetchProvinces();
  }

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
    const { theme, locations, userData, navigation } = this.props;
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
          name="adduser"
          type="ant-design"
          size={hp('8%')}
          color={colors.primary}
          style={{ marginBottom: hp('3%') }}
        />
        {isFetching === false &&
          user.registered === true &&
          navigation.navigate(APP)}
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: hp('3.1%'),
            marginBottom: 5,
            color: colors.primary,
          }}>
          Reka twuzuze imyirondoro yawe!
        </Text>
        <Text
          style={{
            color: colors.disabled,
            fontWeight: 'bold',
            lineHeight: hp('2.5%'),
            marginBottom: hp('2%'),
          }}>
          Gutanga umwirondoro wuzuye bizagufasha gusaba no kubona uruhushya
          rw'ingendo mu buryo bwihuse
        </Text>
        {inputs
          .filter((ip) => ip.id === 'nid' || ip.id === 'name')
          .map((input, k) => (
            <TextInput
              key={Number(k)}
              {...input}
              defaultValue={
                input.id === 'phone' && user.phone ? user.phone : null
              }
              mode="outlined"
              style={{
                width: '100%',
                height: hp('6%'),
                marginTop: hp('1.1%'),
              }}
              selectionColor={colors.primary}
              onChangeText={(text) => this.onChangeText(input.id, text)}
            />
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
            marginTop: hp('2%'),
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
          <TextInput
            {...inputs.find((i) => i.id === 'phone')}
            defaultValue={user.phone ? user.phone : null}
            mode="outlined"
            style={{
              width: sectors.length !== 0 ? '47%' : '100%',
              height: hp('6%'),
            }}
            selectionColor={colors.primary}
            onChangeText={(text) => this.onChangeText('phone', text)}
          />
        </View>
        <Button
          mode="contained"
          loading={isFetching}
          disabled={!enabled}
          style={{ marginTop: hp('3.5%') }}
          labelStyle={{ color: colors.secondary, fontWeight: 'bold' }}
          onPress={this.onSubmit}>
          emeza umwirondoro
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(SignUp));
