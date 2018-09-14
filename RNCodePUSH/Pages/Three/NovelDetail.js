import NiceScreen from "../../page/Nice";
import React from 'react';
import {novaelApi} from "../../common/netUrl";
import { Button,WebView,TouchableOpacity,Image, View, Text ,StyleSheet,FlatList,ActivityIndicator,Dimensions} from 'react-native';
const  readbookFullUrl = 'http://wap.sogou.com/book/sgapp_ranking_u.jsp?rank=resou&json=1&start=1&length=20'
import NetTool from "../../Tool/NetTool";
export default class novelDetailScreen extends NiceScreen{
    constructor(props){
        super(props);
        this.state = {
            html:'<h1>loading....</h1>',
            isloaded:false,
        }
     this.fetctData = this.fetctData.bind(this)
    }
    componentDidMount(){
       // this.fetctData()
    }
     render(){
        const {params} = this.props.navigation.state;
        const {bid} = params;
        return  <WebView originWhitelist={['*']} 
        source={{ uri:`http://t.shuqi.com/route.php?pagename=#!/bid/${bid}/ct/read`}}
        style={{marginTop: 0}}
      />
       
     }
    //  getItemCell({item,index}){
       
    //     return  <WebView
    //     source={{ html: '<h1>Hello world</h1>' }}
    //     style={{marginTop: 0}}
    //   />
    //  }
     renderLoadingView() {
        return (
          <View style={{flex:1,justifyContent:'center'}} onStartShouldSetResponder={()=>true} onResponderGrant={
            (evt) => {
            }
          }>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{textAlign:'center'}}>正在加载..</Text>
          </View>
        );
      }

     fetctData(){
        fetch("http://t.shuqi.com/route.php?pagename=#!/bid/7429818/cid/897066/ct/read")
        .then(response => response.text())
        .then(responseJson => {
          this.setState({
              isloaded:true,
              html:responseJson
          })
        })
        .catch(error => {
          console.error(error);
        });
    }

}