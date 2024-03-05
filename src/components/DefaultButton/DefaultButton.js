import React, { Component } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { ButtonStyle, TextStyle } from '../assets/Styles';

class DefaultButton extends Component {
  constructor(props) {
    super(props);
    this.defaultMessage = this.props.label || 'button pressed';
  }

  handlePress = () => {
    Alert.alert(this.defaultMessage);
  };

  render() {
    const handlePress = this.props.handlePress || this.handlePress;
    const label = this.props.label || 'Button';
    const enabled =
      this.props.enabled === undefined ? true : this.props.enabled;

    return (
      <TouchableOpacity disabled={!enabled} onPress={handlePress}>
        <View
          style={[
            {
              ...ButtonStyle.default,
              ...this.props.style,
              opacity: enabled ? 1 : 0.5,
              justifyContent: 'center',
              alignItems: 'center',
              paddingStart: 16,
              paddingEnd: 16,
            },
          ]}>
          <Text style={[{ opacity: enabled ? 1 : 0.5 }, TextStyle.default]}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default DefaultButton;
