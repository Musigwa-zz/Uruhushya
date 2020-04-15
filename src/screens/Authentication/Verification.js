import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../../styles';
import { withTheme, Text } from 'react-native-paper';
import Confirm from '../../components/Buttons/Confirm';
import { APP } from '../../constants/routeNames';

const Verification = ({ theme, navigation }) => {
  const [code, setCode] = useState('');
  const { colors } = theme;
  let inputRef;
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.primary,
          justifyContent: 'flex-start',
          paddingVertical: 50,
          paddingHorizontal: 20,
        },
      ]}>
      <View
        style={{
          height: '50%',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}>
          code y'ubugenzuzi
        </Text>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            marginTop: 20,
            lineHeight: 20,
          }}>
          Umubare w'ubugenzuzi ni imibare ine wohererezwa mu butumwa bugufi.
          Andikamo umubare w'ubugenzuzi umaze kwakira kuri iyi nomero:
          <Text
            style={{
              fontWeight: 'bold',
              color: 'white',
            }}>{`\t0785782928`}</Text>
        </Text>
        <View style={{ flexDirection: 'row' }}>
          {Array.from({ length: 4 }, (i, k) => (
            <TextInput
              key={Number(k)}
              maxLength={1}
              style={{
                marginTop: 50,
                width: 50,
                textAlign: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: 30,
                borderColor: 'white',
                marginHorizontal: 10,
              }}
              ref={(r) => {
                inputRef && inputRef(r);
              }}
              keyboardType="number-pad"
              underlineColorAndroid={'white'}
              onChangeText={setCode}
              value={code}
              textContentType={'telephoneNumber'}
              autoCapitalize={'none'}
              autoCompleteType={'tel'}
              autoCorrect={false}
              autoFocus={true}
            />
          ))}
        </View>
      </View>
      <View
        style={{
          height: '50%',
          justifyContent: 'flex-end',
        }}>
        <Confirm
          text="Emeza"
          loading={false}
          labelStyle={[
            styles.confirmButton,
            { color: colors.primary, width: '80%', fontWeight: 'bold' },
          ]}
          contentStyle={{
            height: 45,
            backgroundColor: 'white',
          }}
          onPress={() => navigation.navigate(APP)}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default withTheme(
  connect(mapStateToProps, mapDispatchToProps)(Verification),
);
