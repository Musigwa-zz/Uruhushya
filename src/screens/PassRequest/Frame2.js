import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput as Input } from 'react-native';
import { connect } from 'react-redux';
import { Text, Title, Avatar, withTheme, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from '../../styles';
import direction from '../../assets/images/direction.png';
import { submitRequest } from '../../redux/actions/passRequest';
import { HOME_SCREEN } from '../../constants/routeNames';

class PassRequest extends Component {
  state = {
    goDate: Date.now(),
    come_date: Date.now(),
    description: null,
    date: Date.now(),
    mode: 'date',
    show: false,
    currentInputDate: null,
    height: 0,
  };

  onChangeText = (target, value) => {
    this.setState({ [target]: value });
  };

  confirmSelect = (target, value) => {
    this.setState({ [target]: value });
  };

  onSubmit = () => {
    const { goDate, come_date, description } = this.state;
    const { requestPass } = this.props;
    requestPass({ goDate, come_date, description });
  };

  onChange = (event, selectedDate) => {
    const { mode, currentInputDate } = this.state;
    if (selectedDate !== undefined) {
      if (currentInputDate === 'goDate') {
        this.setState({
          goDate: selectedDate,
          date: selectedDate,
          show: false,
        });
      } else if (currentInputDate === 'come_date') {
        this.setState({
          come_date: selectedDate,
          date: selectedDate,
          show: false,
        });
      }
      if (mode === 'date') {
        this.setState({ show: true, mode: 'time' });
      }
    }
  };

  showDatePicker = (type) => {
    this.setState({ show: true, mode: 'date', currentInputDate: type });
  };

  render() {
    const { theme, passData, navigation } = this.props;
    const { isFetching, backHome } = passData;
    const { goDate, come_date, description } = this.state;
    const { show, height, mode, date } = this.state;
    const { colors } = theme;
    if (backHome === true) navigation.navigate(HOME_SCREEN);
    return (
      <View
        style={{
          ...styles.container,
          paddingVertical: hp('8%'),
          paddingHorizontal: wp('8%'),
          backgroundColor: colors.secondary,
        }}>
        <Avatar.Image
          size={hp('20%')}
          style={styles.avatar}
          source={direction}
        />
        <Title
          style={{
            fontWeight: 'bold',
            marginBottom: 5,
            color: colors.primary,
          }}>
          Andi makuru y'urugendo
        </Title>
        <View style={{ width: '100%', marginTop: hp('1.3%') }}>
          <Text>Uragenda ryari?</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 5,
              marginBottom: hp('1.3%'),
              padding: 8,
              height: hp('6%'),
              width: '100%',
              backgroundColor: colors.primaryLight,
              borderWidth: 0.5,
              borderRadius: 5,
              borderColor: colors.disabled,
            }}
            onPress={() => this.showDatePicker('goDate')}>
            <Text style={{ fontWeight: 'bold' }}>
              {moment(goDate).format('LLL')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: '100%' }}>
          <Text>Uragaruka ryari?</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 5,
              marginBottom: 10,
              paddingRight: 15,
              paddingLeft: 8,
              height: hp('6%'),
              backgroundColor: colors.primaryLight,
              width: '100%',
              borderWidth: 0.5,
              borderRadius: 5,
              borderColor: colors.disabled,
            }}
            onPress={() => this.showDatePicker('come_date')}>
            <Text style={{ fontWeight: 'bold' }}>
              {moment(come_date).format('LLL')}
            </Text>
          </TouchableOpacity>
        </View>
        {show === true && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour
            display="default"
            onChange={this.onChange}
          />
        )}
        <Input
          placeholder="Ubusobanuro burambuye"
          style={{
            width: '100%',
            marginTop: hp('1.3%'),
            borderRadius: 5,
            borderColor: 'gray',
            padding: 8,
            borderWidth: 0.5,
            height: Math.max(hp('6%'), height),
          }}
          multiline
          onContentSizeChange={(event) => {
            this.setState({ height: event.nativeEvent.contentSize.height });
          }}
          onChangeText={(text) => this.onChangeText('description', text)}
          blurOnSubmit
          returnKeyType="send"
          onSubmitEditing={this.onSubmit}
        />
        <Button
          mode="contained"
          loading={isFetching}
          disabled={!(goDate && come_date && description) || isFetching}
          style={{ marginTop: hp('3.5%') }}
          labelStyle={{ color: colors.secondary, fontWeight: 'bold' }}
          onPress={this.onSubmit}>
          ohereza
        </Button>
      </View>
    );
  }
}

const mapStateToProps = ({ userData, passData }) => ({ userData, passData });

const mapDispatchToProps = {
  requestPass: submitRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(PassRequest));
