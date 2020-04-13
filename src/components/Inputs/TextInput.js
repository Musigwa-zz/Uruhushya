import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TextInput as Input, Button, withTheme } from 'react-native-paper';
import styles from '../../styles';

const TextInput = ({ theme, label, onChangeText, value, ...props }) => {
  const secureBtn = label.toLowerCase().includes('password');
  const [hidden, setHidden] = useState(secureBtn);
  return (
    <View style={{ marginBottom: secureBtn ? 0 : 25 }}>
      <Input
        style={[styles.input]}
        label={label}
        mode="outlined"
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={hidden}
        {...props}
      />
      {secureBtn && (
        <Button
          labelStyle={{
            textTransform: 'capitalize',
            marginRight: 0,
            color: theme.colors.error,
          }}
          style={{ alignSelf: 'flex-end' }}
          compact
          onPress={() => setHidden(!hidden)}>
          {hidden ? 'show' : 'hide'}
        </Button>
      )}
    </View>
  );
};

TextInput.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string.isRequired,
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string,
  secureBtn: PropTypes.bool,
};

TextInput.defaultProps = {
  props: {},
  secureBtn: false,
  value: null,
};

export default withTheme(TextInput);
