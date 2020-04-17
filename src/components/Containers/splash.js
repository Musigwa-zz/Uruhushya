import React from 'react';
import { View, Image } from 'react-native';
import styles from '../../styles';
import logo from '../../assets/images/logo.png';

export default () => (
    <View style={styles.container}>
      <Image
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(12, 62, 117,1)',
        }}
        resizeMethod="scale"
        resizeMode="contain"
        source={logo}
      />
    </View>
  );
