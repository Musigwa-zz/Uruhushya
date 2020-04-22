import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  Text,
  Title,
  Avatar,
  withTheme,
  TextInput,
  Button,
  RadioButton,
} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from '../../styles';
import Select from '../../components/Inputs/Select';
import place from '../../assets/images/place.png';
import {
  cacheRequest,
  getReasons,
  getTransports,
} from '../../redux/actions/passRequest';
import { PASS_FRAME2 } from '../../constants/routeNames';

class PassRequest extends Component {
  state = {
    reason: null,
    transportType: null,
    placeName: null,
    plateNumber: null,
  };

  // async componentDidMount() {
  //   const { fetchTransports, fetchReasons } = this.props;
  //   fetchTransports();
  //   fetchReasons();
  // }

  onChangeText = (target, value) => {
    this.setState({ [target]: value });
  };

  onSubmit = () => {
    const { placeName, transportType, plateNumber, reason } = this.state;
    const { cachePass, navigation } = this.props;
    cachePass({ placeName, transportType, plateNumber, reason });
    navigation.navigate(PASS_FRAME2);
  };

  render() {
    const { theme, userData, passData } = this.props;
    const { isFetching } = userData;
    const { reasons = [], transportTypes = [] } = passData;
    const { transportType, reason, placeName, plateNumber } = this.state;
    const { colors } = theme;
    const enabled = Boolean(
      transportType && reason && placeName && plateNumber,
    );
    return (
      <View
        style={{
          ...styles.container,
          paddingVertical: hp('8%'),
          paddingHorizontal: wp('8%'),
          backgroundColor: colors.secondary,
        }}>
        <Avatar.Image size={hp('20%')} style={styles.avatar} source={place} />
        <Title
          style={{
            fontWeight: 'bold',
            marginBottom: 5,
            color: colors.primary,
          }}>
          Uzuza imyirondoro y'aho ujya
        </Title>
        <TextInput
          label="Aho ugiye"
          mode="outlined"
          autoCapitalize="words"
          style={{ width: '100%', height: hp('6%'), marginTop: hp('1.5%') }}
          selectionColor={colors.primary}
          onChangeText={(text) => this.onChangeText('placeName', text)}
        />
        <Text style={{ marginTop: hp('1.3%'), alignSelf: 'flex-start' }}>
          Uragenda n'iki?
        </Text>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: hp('1.3%'),
            paddingRight: wp('2.5%'),
            paddingLeft: wp('1%'),
            height: hp('6%'),
            width: '100%',
            borderWidth: 0.5,
            borderRadius: 5,
            borderColor: colors.disabled,
          }}>
          {transportTypes.length !== 0 &&
            transportTypes.map((k) => (
              <View
                key={Number(k.id)}
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <RadioButton
                  value={k.id}
                  status={transportType === k.id && 'checked'}
                  onPress={() => this.setState({ transportType: k.id })}
                  color={colors.primary}
                />
                <Text>{k.name}</Text>
              </View>
            ))}
        </View>
        <TextInput
          label="Pulaki y'ikiyanbiziga"
          mode="outlined"
          autoCapitalize="words"
          style={{ width: '100%', height: hp('6%') }}
          selectionColor={colors.primary}
          onChangeText={(text) => this.onChangeText('plateNumber', text)}
        />
        {reasons.length !== 0 && (
          <Select
            title={"Impamvu y'urugendo" || reason.name}
            popupTitle="Hitamo impamvu y'urugendo"
            style={{ marginTop: hp('2%') }}
            data={reasons}
            onSelect={(id) => this.onChangeText('reason', id)}
            theme={theme}
          />
        )}
        <Button
          mode="contained"
          loading={isFetching}
          disabled={!enabled}
          style={{ marginTop: hp('3.5%') }}
          labelStyle={{ color: colors.secondary, fontWeight: 'bold' }}
          onPress={this.onSubmit}>
          komeza
        </Button>
      </View>
    );
  }
}

const mapStateToProps = ({ userData, passData }) => ({ userData, passData });

const mapDispatchToProps = {
  cachePass: cacheRequest,
  fetchReasons: getReasons,
  fetchTransports: getTransports,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(PassRequest));
