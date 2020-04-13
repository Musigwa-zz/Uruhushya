import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-paper';
import styles from '../styles';

export class PassRequest extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Pass request screen </Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(PassRequest));
