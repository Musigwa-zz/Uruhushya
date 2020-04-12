import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-paper';

const Confirm = ({ onPress, text, ...props }) => (
  <Button mode="contained" onPress={onPress} {...props}>
    {text}
  </Button>
);

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

export default Confirm;
