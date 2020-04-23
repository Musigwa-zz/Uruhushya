import React from 'react';
import PropTypes from 'prop-types';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FAIcon5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import themes from '../../assets/themes';

const { colors } = themes;
const getIconType = (type) => {
  switch (type) {
    case 'fontisto':
      return Fontisto;
    case 'zocial':
      return ZocialIcon;
    case 'octIcon':
      return OcticonIcon;
    case 'material':
      return MaterialIcon;
    case 'materialCommunity':
      return MaterialCommunityIcon;
    case 'ionIcon':
      return Ionicon;
    case 'foundation':
      return FoundationIcon;
    case 'evilIcon':
      return EvilIcon;
    case 'entypo':
      return EntypoIcon;
    case 'fontAwesome':
      return FAIcon;
    case 'fontAwesome5':
      return FAIcon5;
    case 'simpleLineIcon':
      return SimpleLineIcon;
    case 'antDesign':
      return AntDesign;
    case 'feather':
      return Feather;
    default:
      return MaterialIcon;
  }
};

const Icon = ({ name, size, color, type, ...props }) => {
  const FontIcon = getIconType(type);
  return <FontIcon name={name} size={size} color={color} {...props} />;
};

Icon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
};
Icon.defaultProps = { color: colors.disabled, type: 'material', size: 27 };

export default Icon;
