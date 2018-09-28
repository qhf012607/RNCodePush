import NiceScreen from "../../page/Nice";
import React from 'react';
import { AsyncStorage,Button,RefreshControl,TouchableOpacity,Image, View, Text ,StyleSheet,FlatList,ActivityIndicator,Dimensions,Animated,PanResponder} from 'react-native';
//import { yellow } from "../../node_modules/kleur";
import NetTool from "../../Tool/NetTool";
import {newsApi} from "../../common/netUrl";
import PropTypes from 'prop-types';
// import FadeInView from '../VidioPages/videoList'
export default  class VideoCollectScreen extends NiceScreen{
    static navigationOptions = ({ navigation }) => {      
         const { params } = navigation.state;        
          return {          
                title: params ? params.title : '新闻',    
                              headerStyle: {              
                               backgroundColor: '#fff',        
                            },              
                             headerTintColor: '#000',            
                              headerTitleStyle: {                      
                                flex: 1,           
                                textAlign: 'center',   
                             fontWeight: 'bold',            
                         },     
                   }   
         };
    constructor(props){
        super(props);
        this.state = {
            arrayCollect:new Array,
        }
        this.tableLeftitem = this.tableLeftitem.bind(this)
    }
    componentDidMount(){
        this.getData()
    }
    getData(){
        const {params} = this.props.navigation.state;
        const {title} = params;
        var key = ''
        if (title == '播放历史') {
            key = 'history'
        }else{
            key = 'collect'
        }
        AsyncStorage.getItem(key,(eror,result)=>{
            let dic = JSON.parse(result)
            this.setState({
                arrayCollect:dic
            })
        })
    }
    componentWillUpdate(){
        this.getData()
    }
    render(){
        const {params} = this.props.navigation.state;
        const {title} = params;

       return <View> 
              <FlatList data={this.state.arrayCollect} renderItem={this.tableLeftitem}></FlatList>
            </View>
    };
    

   

    tableLeftitem({item,index}){
        return LeftCell.getLeftTitleView(item,index,(indexitem)=>{
            this.props.navigation.navigate('funney',{url:indexitem})
          })
    }
}

export  class LeftCell extends React.Component {
    // 定义属性
  
   constructor(props){
   
    super(props);
    this.setState({
        selected:false
    })
    this.clickCallBack = this.clickCallBack.bind(this)
   }
  
    static getLeftTitleView(item,index,clickBlock){
    
     let backgroundColor = item['selected']?'white':'rgba(233,233,239,1)'
     this.clickCallBack = clickBlock
   
     return <TouchableOpacity onPress={()=>{
        this.clickCallBack( item)
      }}>
        <View style={{backgroundColor:backgroundColor,height:44}}>
         <Text style={{left:10,top:12,fontSize:18,height:20,textAlignVertical:'center',}}>{item.name} </Text>
         <View style={{height:1,top:23,backgroundColor:'rgba(224,224,224,1)'}}/>
        </View>
        </TouchableOpacity>
    };
   //  clikck(url){
      
     clickCallBack(url) {
       
     }
    }

