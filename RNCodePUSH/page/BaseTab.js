import {
    createBottomTabNavigator,
    createStackNavigator,StackActions, NavigationActions,createSwitchNavigator,
  } from 'react-navigation';
  import React from 'react';
import { Button, Text, View,Image, } from 'react-native';
import {CoolScreen} from './Nice'
import NiceScreen from './Nice'
import PropTypes from 'prop-types'
 import newsScreen from '../Pages/One/News'
 import funneyScreen from '../Pages/Two/Funney'
 import novelScreen from '../Pages/Three/Novel'
import newDetailScreen from '../Pages/One/NewDetail'
import FunneyVideoPlayerScreen from '../Pages/Two/FunneyVideoPlayer'
import novelDetailScreen from '../Pages/Three/NovelDetail'
import VideoScreen from '../Pages/VidioPages/videoList'
import myScreen from '../Pages/VidioPages/personal'
import VideoplayScreen from '../Pages/VidioPages/videoPlay'
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
 class guaids extends React.Component{
  componentDidMount(){
      setTimeout(() => {
         this.props.navigation.navigate('App');
      }, 2000);
  }

  render(){
    return <View>
      <Text>欢迎光临</Text>
    </View>
  }
} 

  
const OneNave = createStackNavigator(
    {
      news:{
        screen:VideoScreen,
        navigationOptions:{
          title:'频道'
        //  header:null,
        }
      },
      // NewDetail :  {
      //   screen:newDetailScreen,
      //  navigationOptions:{
      //    title:'详情'
      //  }}
    
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
      screen:VideoplayScreen,
      navigationOptions:{
        title:'播放'
      }
    },
    video: {
      screen:FunneyVideoPlayerScreen,
     navigationOptions:{
       title:'播放',
     }
    },
}
);

// navigationOptions:({navigate})=>{
//   tabBarIcon: ({ focused, tintColor }) => {
//     if (focused){
//       return <Image source={require('../Img/index_u.png')}/>
//    }else{
//     return <Image source={require('../Img/index.png')}/>
//    }
//   } 
// }
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
  novel :  {
            screen:myScreen,
           navigationOptions:{
             title:'小说'
           }
      },
  novelDetail:  {
    screen:novelDetailScreen,
   navigationOptions:{
     title:'阅读',
     
   }
}
  
//     Cool: {
//         screen:SettingsScreen,
//     },
//    Details: {
//     screen:DetailsScreen,
// },
});

ThreeNave.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

export default tabbar = createBottomTabNavigator(
    { 
      新闻: {
        screen:OneNave,
        navigationOptions: {
          tabBarLabel: '频道',
          tabBarIcon: ({ tintColor, focused }) => (
    
            focused ?  <Image style={{width:26,height:26}} source={require( '../Img/index_u.png')}/> : <Image style={{width:26,height:26}} source={require( '../Img/index.png')}/>
            
          ),
      
        },
      },
      搞笑: {
        screen:TwoNave,
        navigationOptions: {
          tabBarLabel: '播放',
         
          tabBarIcon: ({ tintColor, focused }) => (
    
            focused ?  <Image style={{width:26,height:26}} source={require( '../Img/like_u.png')}/> : <Image style={{width:26,height:26}} source={require( '../Img/like.png')}/>
            
          ),
        },
        
      },
      小说:{
        screen:ThreeNave,
        navigationOptions: {
          tabBarLabel: '我的',
          tabBarIcon: ({ tintColor, focused }) => (
    
            focused ?  <Image style={{width:26,height:26}} source={require( '../Img/ranking_u.png')}/> : <Image style={{width:26,height:26}} source={require( '../Img/ranking.png')}/>
            
          ),
        },
      } ,
    },{
      tabBarOptions: {
        activeTintColor: 'black',
        labelStyle: {
          fontSize: 12,
        },
        // style: {
        //   backgroundColor: 'blue',
        // },
      }
    }
   
);

export const rootNave = createSwitchNavigator({
  welcome: guaids,
  App: tabbar
});

// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [NavigationActions.navigate({ routeName:'tabbar' })],
// });


