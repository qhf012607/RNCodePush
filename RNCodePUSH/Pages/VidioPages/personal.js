import NiceScreen from "../../page/Nice";
import React from 'react';
import {novaelApi} from "../../common/netUrl";
import { Alert,AsyncStorage,Button,TouchableOpacity,Image, View, Text ,StyleSheet,FlatList,ActivityIndicator,Dimensions} from 'react-native';
const  readbookFullUrl = 'http://wap.sogou.com/book/sgapp_ranking_u.jsp?rank=resou&json=1&start=1&length=20'
import NetTool from "../../Tool/NetTool";
export default  class myScreen extends NiceScreen{
    render(){
        return <View style={{alignItems:'center'}}>
            <Image style={{width:100,marginTop:50,height:100,borderRadius:50}} source={require('../../Img/header.png')}/>
            <View style={{height:1,marginTop:50,width:'100%',backgroundColor:'rgba(224,224,224,1)'}}/>
           
            <TouchableOpacity  onPress={()=>{
                this.props.navigation.navigate('history',{title:'播放历史'})
            }}>
            <Text style={{marginTop:15,width:'100%'}}>播放历史</Text>
             </TouchableOpacity>
            <View style={{height:1,marginTop:15,width:'100%',backgroundColor:'rgba(224,224,224,1)'}}/>
            <TouchableOpacity onPress={()=>{
                 this.props.navigation.navigate('history',{url:'我的收藏'})
            }}>
            <Text style={{marginTop:15,width:'100%'}}>我的收藏</Text>
             </TouchableOpacity>
             <View style={{height:1,top:15,width:'100%',backgroundColor:'rgba(224,224,224,1)'}}/>
             <TouchableOpacity  onPress={()=>{
                 AsyncStorage.clear(()=>{
                    Alert.alert(
                        '清理缓存成功',
                      )
                 })
            }}>
             <Text style={{marginTop:30,width:'100%'}}>清理缓存</Text>
             </TouchableOpacity>
             <View style={{height:1,marginTop:15,width:'100%',backgroundColor:'rgba(224,224,224,1)'}}/>
            </View>

    }
}