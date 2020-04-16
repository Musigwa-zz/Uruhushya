import React, { Component } from 'react';
import { View, TextInput, Image } from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Text, Button, Title } from 'react-native-paper';

import { SIGN_UP, APP } from '../../constants/routeNames';
import styles from '../../styles';
import { checkUser } from '../../redux/actions/currentUser';
import logo from '../../assets/images/logo.png';

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
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}>
        {user.registered === true
          ? navigation.navigate(APP)
          : didLogin === true
          ? navigation.navigate(SIGN_UP, { phone })
          : null}
        <Title
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            textAlign: 'center',
            marginBottom: 30,
            color: colors.primary,
          }}>
          Suzuma umwirondoro wawe
        </Title>
        <Image
          style={[
            styles.avatar,
            { borderRadius: null, width: 250, height: 250, marginBottom: 30 },
          ]}
          source={logo}
        />

        <View style={{ width: '100%' }}>
          <Text
            style={{
              color: colors.primary,
              fontWeight: 'bold',
              marginVertical: 10,
            }}>
            Nomero ya telephone
          </Text>
          <TextInput
            style={{
              borderColor: colors.primary,
              color: colors.primary,
              height: 50,
              padding: 15,
              borderWidth: 1,
              borderRadius: 5,
            }}
            placeholder="Urugero: 078xxxxxxx"
            autoCapitalize="words"
            mode="outlined"
            onChangeText={(text) => this.onChangeText('phone', text)}
            blurOnSubmit={true}
          />
        </View>
        <View
          style={{
            marginVertical: 20,
            alignItems: 'flex-end',
            width: '100%',
          }}>
          <Button
            mode="contained"
            loading={isFetching}
            disabled={phone.length !== 10}
            labelStyle={{ color: 'white', fontWeight: 'bold' }}
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
