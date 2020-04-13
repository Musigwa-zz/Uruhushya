import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';

const Container = ({ children, ...props }) => (
  <View style={[styles.container]} {...props}>
    {children}
  </View>
);

Container.propTypes = {
  children: PropTypes.any.isRequired,
  props: PropTypes.objectOf(PropTypes.any),
};

Container.defaultProps = {
  props: {},
};

export default Container;
