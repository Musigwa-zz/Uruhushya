import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Text, Title, withTheme, TextInput, Button } from 'react-native-paper';

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
import { PASS_REQUEST } from '../constants/routeNames';

class SaveProfile extends Component {
  state = {
    userInfo: {
      province: {},
      district: {},
      sector: {},
    },
    loading: false,
  };

  async componentDidMount() {
    const { fetchProvinces } = this.props;
    await fetchProvinces();
  }

  confirmProvince = async (provinceId) => {
    const { fetchDistricts, locations } = this.props;
    const { provinces = [] } = locations;
    this.setState({
      userInfo: {
        ...this.userInfo,
        province: provinces.find((p) => p.id === provinceId),
      },
    });
    await fetchDistricts(provinceId);
  };

  confirmDistrict = async (districtId) => {
    const { fetchSectors, locations } = this.props;
    const { districts = [] } = locations;
    this.setState({
      userInfo: {
        ...this.userInfo,
        district: districts.find((d) => d.id === districtId),
      },
    });
    await fetchSectors(districtId);
  };

  confirmSector = async (sectorId) => {
    const { locations } = this.props;
    const { sectors = [] } = locations;
    this.setState({
      userInfo: {
        ...this.userInfo,
        sector: sectors.find((s) => s.id === sectorId),
      },
    });
  };

  onChangeText = (target, value) => {
    this.setState({ userInfo: { ...this.userInfo, [target]: value } });
  };

  onSubmit = () => {
    const { userInfo } = this.state;
    const { submitUser, navigation } = this.props;
    submitUser(userInfo);
    navigation.navigate(PASS_REQUEST);
  };

  render() {
    const { theme, locations } = this.props;
    let { provinces = [], districts = [], sectors = [] } = locations;
    const { colors } = theme;
    const { loading, userInfo } = this.state;
    console.log('these are user data:', userInfo);
    if (provinces.length) {
      provinces = provinces.map((p) => ({ ...p, name: p.izina }));
    }
    const {
      province: { izina: provinceName = 'Intara utuyemo' } = {},
      district: { name: districtName = 'Akarere utuyemo' } = {},
      sector: { name: sectorName = 'Umurenge utuyemo' } = {},
    } = userInfo;
    return (
      <View
        style={[styles.container, { padding: 30, backgroundColor: 'white' }]}>
        <Icon
          name="adduser"
          type="ant-design"
          size={60}
          style={{ marginBottom: 20 }}
        />
        <Title
          style={{
            fontWeight: 'bold',
            textTransform: 'capitalize',
            marginBottom: 5,
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
        {inputs.map((input, k) => (
          <TextInput
            key={Number(k)}
            {...input}
            mode="outlined"
            style={{ width: '100%', height: 45, marginTop: k === 0 ? 20 : 10 }}
            selectionColor={colors.primary}
            onChangeText={(text) => this.onChangeText(input.placeholder, text)}
          />
        ))}

        {provinces.length ? (
          <Select
            title={provinceName}
            popupTitle="Hitamo intara utuyemo"
            style={{ marginTop: 20 }}
            data={provinces}
            onSelect={this.confirmProvince}
            theme={theme}
          />
        ) : null}
        {districts.length ? (
          <Select
            title={districtName}
            popupTitle="Hitamo akarere utuyemo"
            style={{ marginTop: 20 }}
            data={districts}
            onSelect={this.confirmDistrict}
            theme={theme}
          />
        ) : null}
        {sectors.length ? (
          <Select
            title={sectorName}
            popupTitle="Hitamo umurenge utuyemo"
            style={{ marginTop: 20 }}
            data={sectors}
            onSelect={this.confirmSector}
            theme={theme}
          />
        ) : null}
        <Button
          mode="contained"
          loading={loading}
          style={{ marginTop: 30 }}
          onPress={this.onSubmit}>
          emeza umwirondoro
        </Button>
      </View>
    );
  }
}

const mapStateToProps = ({ locations }) => ({ locations });

const mapDispatchToProps = {
  fetchProvinces: getProvinces,
  fetchDistricts: getDistricts,
  fetchSectors: getSectors,
  submitUser: registerUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(SaveProfile));
