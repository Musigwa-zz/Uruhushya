import React from 'react';
import { View } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import PropTypes from 'prop-types';
import icomoonConfig from './selection.json';

const Icomoon = createIconSetFromIcoMoon(icomoonConfig);
const Custom = ({ name, color, size, ...props }) => (
  <View
    style={{
      padding: 5,
      borderRadius: 50,
      borderColor: 'black',
      borderWidth: 1,
    }}>
    <Icomoon name={name} size={size} color={color} {...props} />
  </View>
);

Custom.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default Custom;
