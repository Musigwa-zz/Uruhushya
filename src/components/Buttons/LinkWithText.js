import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import PropTypes from 'prop-types';
import styles from '../shared/styles';

const LinkWithText = ({
  text,
  onPress,
  buttonLabel,
  style,
  textTransform,
  ...props
}) => (
  <View style={[styles.linkText, style]}>
    <Text>{text}</Text>
    <Button
      style={{ alignSelf: 'flex-end' }}
      compact
      onPress={onPress}
      labelStyle={{ textDecorationLine: 'underline', textTransform }}
      {...props}>
      {buttonLabel}
    </Button>
  </View>
);

LinkWithText.propTypes = {
  text: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.objectOf(PropTypes.any),
  textTransform: PropTypes.string,
};

LinkWithText.defaultProps = {
  style: {},
  textTransform: 'uppercase',
};

export default LinkWithText;
