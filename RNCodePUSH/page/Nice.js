import React from 'react';
import { Button, View, Text } from 'react-native';
import PropTypes from 'prop-types'
import NetTool from '../Tool/NetTool'
export  default class NiceScreen extends React.Component {
  constructor(props){
    super(props);
  }
 
    // 定义属性
    static propTypes = {
        name:PropTypes.string,
        age:PropTypes.number,
        ifshow:PropTypes.bool,
    }
    // 初始值
    static defaultProps = {
        name:'xmg',
        age:2,
        ifshow:false,
    }
    pushtoNave(screen){
      this.props.navigation.push(screen)
    }
    render() {
      // const {params} = this.props.navigation.state;
      // const {loadView} = params;
      //loadView()
       let text = this.props.ifshow?'show':'false';
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>nice</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Movie')}
        />
      </View>
      );
    }
  };


export   class CoolScreen extends React.Component {
  
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Cool Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
      );
    }
  };