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

import styles from '../../styles';
import Select from '../../components/Inputs/Select';
import location from '../../assets/images/location.png';
import {
  cacheRequest,
  getReasons,
  getTransports,
} from '../../redux/actions/passRequest';
import { PASS_FRAME2 } from '../../constants/routeNames';
import moment from 'moment';

class PassRequest extends Component {
  state = {
    reason: null,
    transportType: null,
    placeName: null,
    plateNumber: null,
  };

  async componentDidMount() {
    const { fetchTransports, fetchReasons } = this.props;
    fetchTransports();
    fetchReasons();
  }

  onChangeText = (target, value) => {
    this.setState({ [target]: value });
  };

  confirmSelect = (target, value) => {
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
    const { transportType, reason } = this.state;
    const { colors } = theme;

    return (
      <View
        style={[styles.container, { padding: 30, backgroundColor: 'white' }]}>
        <Avatar.Image size={200} style={styles.avatar} source={location} />
        <Title
          style={{
            fontWeight: 'bold',
            marginBottom: 5,
            color: colors.primary,
          }}>
          Uzuza imyirondoro y'aho ujya
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
        <TextInput
          label={'Aho ugiye'}
          mode="outlined"
          autoCapitalize={'words'}
          style={{ width: '100%', height: 45, marginTop: 10 }}
          selectionColor={colors.primary}
          onChangeText={(text) => this.onChangeText('placeName', text)}
        />
        <Text style={{ marginTop: 15, alignSelf: 'flex-start' }}>
          Uragenda n'iki?
        </Text>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: 10,
            paddingRight: 15,
            paddingLeft: 8,
            height: 45,
            width: '100%',
            borderWidth: 0.5,
            borderRadius: 5,
            borderColor: colors.disabled,
          }}>
          {transportTypes.length &&
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
          label={"Pulaki y'ikiyanbiziga"}
          mode="outlined"
          autoCapitalize={'words'}
          style={{
            width: '100%',
            height: 45,
          }}
          selectionColor={colors.primary}
          onChangeText={(text) => this.onChangeText('plateNumber', text)}
        />
        {reasons.length && (
          <Select
            title={"Impamvu y'urugendo" || reason.name}
            popupTitle="Hitamo impamvu y'urugendo"
            style={{ marginTop: 15 }}
            data={reasons}
            onSelect={(id) => this.confirmSelect('reason', id)}
            theme={theme}
          />
        )}
        <Button
          mode="contained"
          loading={isFetching}
          disabled={isFetching}
          style={{ marginTop: 30 }}
          labelStyle={{ color: 'white', fontWeight: 'bold' }}
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
