import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput as Input } from 'react-native';
import { connect } from 'react-redux';
import {
  Text,
  Title,
  Avatar,
  withTheme,
  Button,
  Banner,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import styles from '../../styles';
import location from '../../assets/images/location.png';
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
  };

  showDatePicker = (type) => {
    this.setState({ show: true, mode: 'date', currentInputDate: type });
  };

  render() {
    const { theme, passData } = this.props;
    const { isFetching } = passData;
    const { show, height, mode, date, goDate, come_date } = this.state;
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
          Andi makuru y'urugendo
        </Title>
        <View style={{ width: '100%', marginTop: 15 }}>
          <Text>Uragenda ryari?</Text>
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
              height: 45,
              width: '100%',
              backgroundColor: colors.primaryLight,
              borderWidth: 0.5,
              borderRadius: 5,
              borderColor: colors.disabled,
            }}
            onPress={() => this.showDatePicker('goDate')}>
            <Text style={{ fontWeight: 'bold' }}>
              {moment(goDate).format('MMMM, Do YYYY - h:mm:ss A')}
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
              height: 45,
              backgroundColor: colors.primaryLight,
              width: '100%',
              borderWidth: 0.5,
              borderRadius: 5,
              borderColor: colors.disabled,
            }}
            onPress={() => this.showDatePicker('come_date')}>
            <Text style={{ fontWeight: 'bold' }}>
              {moment(come_date).format('MMMM, Do YYYY - h:mm:ss A')}
            </Text>
          </TouchableOpacity>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={this.onChange}
          />
        )}
        <Input
          placeholder="Ubusobanuro burambuye"
          autoCapitalize="words"
          style={{
            width: '100%',
            marginTop: 10,
            borderRadius: 5,
            borderColor: 'gray',
            padding: 15,
            borderWidth: 0.5,
            height: Math.max(45, height),
          }}
          multiline={true}
          onContentSizeChange={(event) => {
            this.setState({ height: event.nativeEvent.contentSize.height });
          }}
          onChangeText={(text) => this.onChangeText('description', text)}
          blurOnSubmit={true}
        />
        <Button
          mode="contained"
          loading={isFetching}
          disabled={isFetching}
          style={{ marginTop: 30 }}
          labelStyle={{ color: 'white', fontWeight: 'bold' }}
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
