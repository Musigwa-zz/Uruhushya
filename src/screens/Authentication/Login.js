import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Button, Title, TextInput } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { SIGN_UP, APP } from '../../constants/routeNames';
import styles from '../../styles';
import { checkUser } from '../../redux/actions/currentUser';
import login from '../../assets/images/start.png';
import inputProps from '../../constants/inputProps';

export class Login extends Component {
  state = { phone: '' };

  onChangeText = (target, value) => {
    this.setState({ [target]: value });
  };

  onSubmit = () => {
    const { phone } = this.state;
    const { loginUser } = this.props;
    loginUser(phone);
  };

  render() {
    const { theme, userData, navigation } = this.props;
    const { phone } = this.state;
    const { colors } = theme;
    const { user, isFetching, didLogin } = userData;
    return (
      <View
        style={{
          ...styles.container,
          paddingVertical: hp('8%'),
          paddingHorizontal: wp('8%'),
          backgroundColor: colors.secondary,
        }}>
        {user.registered === true
          ? navigation.navigate(APP)
          : didLogin === true
          ? navigation.navigate(SIGN_UP)
          : null}
        <Title
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            textAlign: 'center',
            marginBottom: hp('3%'),
            color: colors.primary,
          }}>
          Suzuma umwirondoro wawe
        </Title>
        <Image
          style={[
            styles.avatar,
            { width: wp('90%'), height: hp('40%'), marginBottom: hp('3%') },
          ]}
          source={login}
        />

        <TextInput
          {...inputProps.find((i) => i.id === 'phone')}
          placeholder="Urugero: 078xxxxxxx"
          mode="outlined"
          style={{
            width: '100%',
            height: hp('6%'),
          }}
          selectionColor={colors.primary}
          onChangeText={(text) => this.onChangeText('phone', text)}
          returnKeyType="send"
          onSubmitEditing={this.onSubmit}
        />

        <View
          style={{
            marginVertical: hp('3%'),
            alignItems: 'flex-end',
            width: '100%',
          }}>
          <Button
            mode="contained"
            loading={isFetching}
            disabled={phone.length !== 10}
            labelStyle={{ color: colors.secondary, fontWeight: 'bold' }}
            onPress={this.onSubmit}>
            ohereza
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ userData, locations }) => ({
  userData,
  locations,
});

const mapDispatchToProps = {
  loginUser: checkUser,
};

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(Login));
