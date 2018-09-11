import {
    createBottomTabNavigator,
    createStackNavigator,
  } from 'react-navigation';
  import React from 'react';
import { Button, Text, View } from 'react-native';
import {CoolScreen} from './Nice'
import NiceScreen from './Nice'
import PropTypes from 'prop-types'
 import newsScreen from '../Pages/One/News'
 import funneyScreen from '../Pages/Two/Funney'
 import novelScreen from '../Pages/Three/Novel'
import newDetailScreen from '../Pages/One/NewDetail'
import FunneyVideoPlayerScreen from '../Pages/Two/FunneyVideoPlayer'
class DetailsScreen extends NiceScreen {
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
static navigationOptions = {
  header: () => null,  //this will hide the Stack navigator's header (TabA_StackNavigator)
  tabBarVisible: false //this will hide the TabBar navigator's header (LoggedIn_TabNavigator)
}
constructor(props) {
  super(props);
//初始按钮的颜色和文字 
 var that = this
  this.state = {
      names:'进到详情页'
  };
  this.readBook = this.readBook.bind(this)
 // this.ppp.bind(this)
}
    render() {
        let text = this.props.ifshow?'show':'false';
      return (
         
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>detail {text}</Text>
          <Button
            title = "setting"
            onPress={() => this.props.navigation.navigate('nice',{title:'f',loadView:this.readBook})}
        />
         <Text> haha{this.state.names}</Text>
        </View>
      );
    }

    readBook(){
    //  this.props.name = 'b'
      this.setState({
          names:'b'
      })
    }
  }
  
  class HomeScreen extends NiceScreen {
    
    static navigationOptions = {
      header: () => null,  //this will hide the Stack navigator's header (TabA_StackNavigator)
      tabBarVisible: false //this will hide the TabBar navigator's header (LoggedIn_TabNavigator)
    }
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* other code from before here */}
          <Button
            title="Go to Details"
            onPress={() => this.props.navigation.navigate('Details')}
          />
        </View>
      );
    }
  }
  
  class SettingsScreen extends React.Component {
    static navigationOptions = {
      header: () => null,  //this will hide the Stack navigator's header (TabA_StackNavigator)
      tabBarVisible: false //this will hide the TabBar navigator's header (LoggedIn_TabNavigator)
    }
    
    render() {
      this.readBook = this.readBook.bind(this)
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* other code from before here */}
          <Button
            title = "setting"
            onPress={() => this.props.navigation.navigate('nice',{title:'f',loadView:this.readBook})}
          />
        <Text>  names  name</Text>
        </View>
      );
    }
    readBook(){
      //  this.props.name = 'b'
        this.setState({
            names:'b'
        })
      }
 }
  
const OneNave = createStackNavigator(
    {
      news:{
        screen:newsScreen,
        navigationOptions:{
          header:null
        }
      },
      NewDetail :  {
        screen:newDetailScreen,
       navigationOptions:{
         title:'详情'
       }}
    
    }
  //  {
  //   Details:  {
  //     screen:DetailsScreen,
  //     navigationOptions:{
  //       tabBarVisible:false,
  //     }
  //   },
  //   nice:{
  //      screen:NiceScreen,
  //      navigationOptions:(props)=>{
  //        const {params} = props.navigation.state;
  //        return{
  //          title:params.title?params.title:'nice',
  //          tabBarVisible:false,
  //        }
  //      }
  //    },
  //  }
)
OneNave.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};
  
const TwoNave = createStackNavigator({
    funney :  {
      screen:funneyScreen,
     navigationOptions:{
       title:'搞笑'
     },
    },
    video: {
      screen:FunneyVideoPlayerScreen,
     navigationOptions:{
       title:'播放'
     },
},
//     Cool: {
//         screen:SettingsScreen,
//     },
//    Details: {
//     screen:DetailsScreen,
// },
});
TwoNave.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

const ThreeNave = createStackNavigator({
  funney :  {
            screen:novelScreen,
           navigationOptions:{
             title:'小说'
           }
      },
  
//     Cool: {
//         screen:SettingsScreen,
//     },
//    Details: {
//     screen:DetailsScreen,
// },
});

export default createBottomTabNavigator(
    { 
      新闻: OneNave,
      搞笑: TwoNave,
      小说: ThreeNave
    },{
        activeTintColor: '#f0edf6',
        inactiveTintColor: '#3e2465',
        barStyle: { backgroundColor: '#694fad' },
        swipeEnabled:true,
      }
);

  