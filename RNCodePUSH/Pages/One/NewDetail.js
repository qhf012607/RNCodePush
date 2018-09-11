import NiceScreen from "../../page/Nice";
import { WebView } from 'react-native';
import React, { Component } from 'react';
export default class newDetailScreen extends NiceScreen{

//     render() {
//     
//        render() {
//     return (
//       <WebView
//         source={{uri: 'https://github.com/facebook/react-native'}}
//         style={{marginTop: 20}}
//       />
//     );
//   }
  render() {
   const {params} = this.props.navigation.state;
    const {url} = params;
    return (
      <WebView
        source={{uri: url}}
        style={{marginTop: 0}}
      />
    );
  }
}