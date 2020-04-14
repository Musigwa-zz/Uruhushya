import React from 'react';
import PropTypes from 'prop-types';
import { Button, withTheme } from 'react-native-paper';

const Confirm = ({ onPress, text, theme, ...props }) => {
  const { colors } = theme;
  return (
    <Button
      mode="contained"
      labelStyle={{ color: colors.secondary, fontWeight: 'bold' }}
      onPress={onPress}
      {...props}>
      {text}
    </Button>
  );
};

Confirm.propTypes = {
  onPress: PropTypes.func,
  props: PropTypes.objectOf(PropTypes.any),
  text: PropTypes.string,
};

Confirm.defaultProps = {
  props: {},
  text: 'Press me',
  onPress: () => {},
};

export default withTheme(Confirm);
