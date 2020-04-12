import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../../styles';

export class Verification extends Component {
  static propTypes = {};

  render() {
    return (
      <View style={styles.container}>
        <Text>Verification screen</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Verification);
