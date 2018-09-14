import NiceScreen from "../../page/Nice";
import React from 'react';
import {novaelApi} from "../../common/netUrl";
import { Button,TouchableOpacity,Image, View, Text ,StyleSheet,FlatList,ActivityIndicator,Dimensions} from 'react-native';
const  readbookFullUrl = 'http://wap.sogou.com/book/sgapp_ranking_u.jsp?rank=resou&json=1&start=1&length=20'
import NetTool from "../../Tool/NetTool";
export default class novelScreen extends NiceScreen{
    constructor(props){
        super(props);
        this.state = {
            list:[],
            isloaded:false,
        }
     this.fetctData = this.fetctData.bind(this)
     this.getItemCell = this.getItemCell.bind(this)
    }
    componentDidMount(){
        this.fetctData()
    }
     render(){
         if(this.state.isloaded){
            return <FlatList data={this.state.list} renderItem={this.getItemCell} />
         }else{
          
            return this.renderLoadingView()
         }
       
     }
     getItemCell({item,index}){
        var {width} =  Dimensions.get('window')
        let leftx = width - 200
        return <TouchableOpacity onPress={()=>{
            this.clickBook(item)
        }}>
            <View style={{flexDirection:'row',height:120}}>
            <Image style={{height:100,width:75,alignSelf:"center",marginLeft:10,marginRight:10}} source={{uri:item.book_cover}}/>
            <View style={{marginRight:10}}>
                <Text style={{marginTop:20}}>{item.bookname}</Text>
                <Text style={{marginTop:10}}>{item.author_name}</Text>
                <Text numberOfLines={2} style={{width:200,marginTop:10}}>{item.book_info}</Text>
            </View>
            <View style={{width:30,top:20,left:10,height:50}}>
                <Text>{item.class_name} </Text>
            </View>
        </View>
        </TouchableOpacity>
     }
     clickBook(item){
        this.props.navigation.navigate('novelDetail',{bid:item.bid})
     }
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
        NetTool.get(novaelApi,null,(newsinfo)=>{
            this.setState(
              {
                list:newsinfo['data'],
                isloaded:true
              }
            )
        },(error)=>{
  
        })
      };

}