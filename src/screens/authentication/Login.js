import React, { useState } from 'react';
import { View, Dimensions, TextInput as Input } from 'react-native';
import { connect } from 'react-redux';
import { withTheme, Text, Card } from 'react-native-paper';

import { VERIFICATION } from '../../constants/routeNames';
import styles, { mediumText } from '../../styles';
import inputs from '../../constants/inputProps';
import Confirm from '../../components/Buttons/Confirm';

const { width } = Dimensions.get('screen');

const Login = ({ theme, navigation }) => {
  const { colors } = theme;
  const [phoneNumber, setPhoneNumber] = useState();

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
          <Input
            style={[
              styles.input,
              { marginVertical: 30, width: (width * 80) / 100 },
            ]}
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            {...inputs.find((i) => i.autoCompleteType.includes('tel'))}
          />
          <Confirm
            text="Emeza"
            loading={false}
            labelStyle={styles.confirmButton}
            contentStyle={{ height: 45 }}
            onPress={() => navigation.navigate(VERIFICATION)}
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
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default withTheme(connect(mapStateToProps, mapDispatchToProps)(Login));
