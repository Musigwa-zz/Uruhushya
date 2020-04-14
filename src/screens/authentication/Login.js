import React, { Component } from 'react';
import { View, Dimensions, TextInput as Input } from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Text, Card, TextInput } from 'react-native-paper';

import { SIGN_UP, APP } from '../../constants/routeNames';
import styles, { mediumText } from '../../styles';
import inputs from '../../constants/inputProps';
import Confirm from '../../components/Buttons/Confirm';
import { checkUser } from '../../redux/actions/currentUser';

const { width } = Dimensions.get('screen');

export class Login extends Component {
  state = { phone: null };
  onChangeText = (target, value) => {
    this.setState({ [target]: value });
  };

  onSubmit = () => {
    const { phone } = this.state;
    const { loginUser, userData: { user } = {}, navigation } = this.props;
    loginUser(phone);
    if (user.registered === true) {
      navigation.navigate(APP);
    } else {
      navigation.navigate(SIGN_UP);
    }
  };

  render() {
    const { theme, userData } = this.props;
    const { colors } = theme;
    const { isFetching } = userData;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: colors.primary,
            width,
            height: '50%',
          }}
        />
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            width,
            height: '100%',
            zIndex: 2,
          }}>
          <Card
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: (width * 90) / 100,
              backgroundColor: 'white',
              padding: 20,
            }}>
            <Text style={styles.title}>Injizamo nomero ya telephone</Text>
            <TextInput
              mode="outlined"
              style={{ marginVertical: 30, width: (width * 80) / 100 }}
              selectionColor={colors.primary}
              onChangeText={(text) => this.setState({ phone: text })}
              {...inputs.find((i) => i.autoCompleteType.includes('tel'))}
            />
            <Confirm
              text="Emeza"
              loading={isFetching}
              disabled={isFetching}
              labelStyle={styles.confirmButton}
              contentStyle={{ height: 45 }}
              onPress={this.onSubmit}
            />
          </Card>
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: 40,
            height: '50%',
          }}>
          <Text style={[styles.tabTitle, { justifyContent: 'flex-end' }]}>
            Iyi serivisi muyigezwaho na{' '}
            <Text style={[mediumText, { color: colors.primary }]}>
              Polisi y'u Rwanda
            </Text>
          </Text>
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
