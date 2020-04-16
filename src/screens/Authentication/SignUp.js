import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Text, Title, withTheme, TextInput, Button } from 'react-native-paper';

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
      phone: null,
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

    if (user.registered === true) {
      navigation.navigate(APP);
    }
    if (provinces.length) {
      provinces = provinces.map((p) => ({ ...p, name: p.izina }));
    }
    const {
      province: { izina: provinceName = 'Intara utuyemo' } = {},
      district: { name: districtName = 'Akarere utuyemo' } = {},
      sector: { name: sectorName = 'Umurenge utuyemo' } = {},
    } = userInfo;
    const { name, nid, sector, district, province } = userInfo;
    const enabled = name && nid && sector.id && district.id && province.id;

    return (
      <View
        style={[styles.container, { padding: 30, backgroundColor: 'white' }]}>
        <Icon
          name="adduser"
          type="ant-design"
          size={60}
          color={colors.primary}
          style={{ marginBottom: 20 }}
        />
        <Title
          style={{
            fontWeight: 'bold',
            textTransform: 'capitalize',
            marginBottom: 5,
            color: colors.primary,
          }}>
          Reka twuzuze imyirondoro yawe!
        </Title>
        <Text
          style={{
            color: colors.disabled,
            fontWeight: 'bold',
            marginBottom: 5,
          }}>
          Gutanga umwirondoro wuzuye bizagufasha gusaba no kubona uruhushya
          rw'ingendo mu buryo bwihuse
        </Text>
        {inputs.map((input, k) => {
          return (
            <TextInput
              key={Number(k)}
              {...input}
              defaultValue={user[input.id]}
              mode="outlined"
              style={{
                width: '100%',
                height: 45,
                marginTop: k === 0 ? 20 : 10,
              }}
              selectionColor={colors.primary}
              onChangeText={(text) => this.onChangeText(input.id, text)}
            />
          );
        })}

        {provinces.length !== 0 && (
          <Select
            title={provinceName}
            popupTitle="Hitamo intara utuyemo"
            style={{ marginTop: 20 }}
            data={provinces}
            onSelect={this.confirmProvince}
            theme={theme}
          />
        )}
        {districts.length !==
          0(
            <Select
              title={districtName}
              popupTitle="Hitamo akarere utuyemo"
              style={{ marginTop: 20 }}
              data={districts}
              onSelect={this.confirmDistrict}
              theme={theme}
            />,
          )}
        {sectors.length !== 0 && (
          <Select
            title={sectorName}
            popupTitle="Hitamo umurenge utuyemo"
            style={{ marginTop: 20 }}
            data={sectors}
            onSelect={this.confirmSector}
            theme={theme}
          />
        )}
        <Button
          mode="contained"
          loading={isFetching}
          disabled={!enabled}
          style={{ marginTop: 30 }}
          labelStyle={{ color: 'white', fontWeight: 'bold' }}
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
