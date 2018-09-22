import NiceScreen from "../../page/Nice";
import React from 'react';
import { Button,RefreshControl,TouchableOpacity,Image, View, Text ,StyleSheet,FlatList,ActivityIndicator,Dimensions} from 'react-native';
//import { yellow } from "../../node_modules/kleur";
import NetTool from "../../Tool/NetTool";
import {newsApi} from "../../common/netUrl";
import PropTypes from 'prop-types';

export default  class VideoScreen extends NiceScreen{
  
    constructor(props){
        super(props);
        this.state = {
            arrayParent:new Array,
            arrrayChild:new Array,
            loaded:false,
            freshing:false
        }
     this.fetchchildList = this.fetchchildList.bind(this)
     this.fetctData = this.fetctData.bind(this)
     this.tableLeftitem = this.tableLeftitem.bind(this)
     this.tableitemRight = this.tableitemRight.bind(this)
     
    }
    componentDidMount(){
       this.fetctData();
    }

    fetctData(){
    //   this.setState({
    //     freshing:true
    //   })
     NetTool.postJSON("",{level:2,parentId:1,rootId:1},null,(info)=>{
        const{result} = info;
        this.setState(
          {
              arrayParent:result
          }
        )
        if (result.length>0) {
            for (let index = 0; index < result.length; index++) {
                const item = result[index];
                if (index == 0) {
                    let indexid = item['radioId']
                    this.fetchchildList(indexid,index)
                    item.selected = true
                }else{
                    item.selected = false
                }
            }
           
        }
      
     },(error)=>{

     })
    };
    fetchchildList(indexid,indexitem){
        let parentId = indexid
        NetTool.postJSON("",{level:3,parentId:parentId,rootId:1},null,(info)=>{
            const{result} = info;
            for (let index = 0; index < this.state.arrayParent.length; index++) {
                const item = this.state.arrayParent[index];
                if (index == indexitem) {
                    item.arrayChild = result
                }else{
                    if(item.arrayChild == null){
                        item.arrayChild = []
                    }
                 
                }
            }
            this.setState(
              {
                  arrayParent:this.state.arrayParent
              }
            )
            
         },(error)=>{
    
         })
    }
    render(){
      let indexOfchild = 0
      for (let index = 0; index < this.state.arrayParent.length; index++) {
        const item = this.state.arrayParent[index];
        if (item.selected) {
           indexOfchild = index
        //   break
        }
        }
      if (this.state.arrayParent.length>0&&this.state.arrayParent[0].arrayChild){
        return <View style={{flexDirection:'row'}}> 
                <FlatList style={{width: Dimensions.get('window').width  * 0.4}} data={this.state.arrayParent} renderItem={this.tableLeftitem}></FlatList>
                <FlatList style={{width: Dimensions.get('window').width  * 0.6}} data={this.state.arrayParent[indexOfchild].arrayChild} renderItem={this.tableitemRight}></FlatList>
                </View>
      }else{
        return this.renderLoadingView()
      }
    
        // if(this.state.loaded){
        //     return this.renderLoadingView();
        // }else{
        //     return <FlatList  style={{backgroundColor:'red'}} data={this.state.news} renderItem={this.tableitem}/>
        // }

    //     if (this.state.loaded) {
    //         return <View>
    //                  <FlatList style={{flex: 1,backgroundColor:'red'}}  data={this.state.news} renderItem={this.tableitem}/>
    //               </View>
    //     }
    //     return<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //     <Text>nice</Text>
    //     <Button
    //       title="Go to Details"
    //       onPress={() => this.pushtoNave('NewDetail')}
    //     />
    //   </View>
    };
    
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
    emptyView(){
      return <View>
        <button title={'重新加载'} onClick={this.fetctData}/>
      </View>
    }

    tableLeftitem({item,index}){
        return LeftTitleCell.getLeftTitleView(item,index,(indexitem)=>{
            for (let index = 0; index < this.state.arrayParent.length; index++) {
                const item = this.state.arrayParent[index];
                
                if (index == indexitem) {
                    if (item.arrayChild.length == 0) {
                        this.fetchchildList(item.radioId,indexitem)
                    }
                    item.selected = true
                }else{
                    item.selected = false
                }
            }
            this.setState({
                arrayParent:this.state.arrayParent
            })
          })
    }

    tableitemRight({item}){
        return TitleCell.getTitleView(item,(urlstring)=>{
            this.props.navigation.navigate('funney',{url:urlstring})
          })
    }

}

export  class TitleCell extends React.Component {
   // 定义属性
 
  constructor(props){
  
   super(props);
   this.setState({
       selected:0
   })
   this.getTitleView = this.getTitleView.bind(this);
   this.getLeftTitleView = this.getLeftTitleView.bind(this);
  }

  static getTitleView(item,clickBlock){
  //  this.urlString = item['radioUrl']
    this.clickCallBack = clickBlock
    return <TouchableOpacity onPress={()=>{
      this.clickCallBack( item['radioUrl'])
    }}>
      <View >
       <Text style={{left:10,top:0,fontSize:16}}>{item.name} </Text>
       <View style={{height:10,backgroundColor:'rgba(234,247,253,1)'}}/>
      </View>
      </TouchableOpacity>
   };
     
    clickCallBack(url) {
      
    }
  //     this.props.returnBlock()
  //  }
}

export  class LeftTitleCell extends React.Component {
    // 定义属性
  
   constructor(props){
   
    super(props);
    this.setState({
        selected:false
    })
    this.clickCallBack = this.clickCallBack.bind(this)
   }
  
    static getLeftTitleView(item,index,clickBlock){
    
     let backgroundColor = item['selected']?'rgba(233,233,239,1)':'white'
     this.clickCallBack = clickBlock
   
     return <TouchableOpacity onPress={()=>{
        this.clickCallBack( index)
      }}>
        <View style={{backgroundColor:backgroundColor}}>
         <Text style={{left:10,top:0,fontSize:24}}>{item.name} </Text>
         <View style={{height:10,backgroundColor:'rgba(234,247,253,1)'}}/>
        </View>
        </TouchableOpacity>
    };
   //  clikck(url){
      
     clickCallBack(url) {
       
     }
    }

