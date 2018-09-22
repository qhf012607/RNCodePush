import NiceScreen from "../../page/Nice";
import React from 'react';
import { Button,RefreshControl,TouchableOpacity,Image, View, Text ,StyleSheet,SectionList,ActivityIndicator} from 'react-native';
//import { yellow } from "../../node_modules/kleur";
import NetTool from "../../Tool/NetTool";
import {newsApi} from "../../common/netUrl";
import PropTypes from 'prop-types';
import CodePush from 'react-native-code-push'
export default  class newsScreen extends NiceScreen{
  
    constructor(props){
        super(props);
        this.state = {
            tech:[],
            sports:[],
            ent:[],
            money:[],
            toutiao:[],
            war:[],
            auto:[],
            news:[],
            loaded:false,
            freshing:false
        }
     this.tableitem = this.tableitem.bind(this)
     this.fetctData = this.fetctData.bind(this)
    }
    componentDidMount(){
       this.fetctData();
       CodePush.sync({
        updateDialog: {
            optionalInstallButtonLabel: '更新',
            optionalUpdateMessage: '有新版本了，请更新之后使用',
            title: '更新',
            mandatoryContinueButtonLabel:'立即更新',
            mandatoryUpdateMessage:'必须更新之后体验更多精彩'
        },
        installMode: CodePush.InstallMode.ON_NEXT_RESTART
    });
    }

    fetctData(){
      this.setState({
        freshing:true
      })
      NetTool.get(newsApi,null,(newsinfo)=>{
          const{tech,sports,ent,money,toutiao,war,auto} = newsinfo['data'];
          this.setState(
            {
              tech : tech,
              sports:sports,
              ent:ent,
              money:money,
              toutiao:toutiao,
              war:war,
              auto:auto,
              loaded:true,
              freshing:false,
              news : [{title:'头条',data:toutiao},{title:'教育',data:tech},{title:'体育',data:sports},{title:'环境',data:ent},{title:'金融',data:money},{title:'军事',data:war},{title:'其他',data:auto}]
            }
          )
      },(error)=>{

      })
    };

    render(){
      if (this.state.loaded){
        return <SectionList  style={{}}  refreshControl={this.freshComponet()}  stickySectionHeadersEnabled={false}  sections={this.state.news} renderItem={this.tableitem}  renderSectionHeader={this.tableHeader} keyExtractor={(item, index) => index} ListEmptyComponent={this.emptyView}/>
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
    freshComponet(){
      return <RefreshControl title={'换一批'} refreshing={this.state.freshing} onRefresh={this.fetctData}/>
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
    emptyView(){
      return <View>
        <button title={'重新加载'} onClick={this.fetctData}/>
      </View>
    }

    tableHeader({section}){
      return <View style={{backgroundColor:'lightGray'}}>
               <View style={{height:10,backgroundColor:'rgba(234,247,253,1)'}}/>
                <Text style={{textAlign:'center',backgroundColor:'rgba(234,247,253,1)'}}>{section.title} </Text>
                <View style={{height:10,backgroundColor:'rgba(234,247,253,1)'}}/>
            </View>
    };

    tableitem({item}){
      var  picInfos = new Array
        picInfos = item['picInfo'];
        var url = ''
        url  = picInfos.length>0 ?  picInfos[0]['url'] : '';
       if (url.length > 0 ){
        return itemTitleCell.getImageView(item,(url)=>{
          this.props.navigation.navigate('NewDetail',{url:url})
        })
       }else{
        return itemTitleCell.getTitleView(item)
       };
    }

}

export  class itemTitleCell extends React.Component {
   // 定义属性
 
  constructor(props){
  
   super(props);
   var urlSting = ''
   this.getImageView = this.getImageView.bind(this);
  }

  static getTitleView(item){
    this.urlString = item['link']
    return <TouchableOpacity onPress={()=>{
      this.clickCallBack( this.urlString)
    }}>
      <View >
      <View style={{height:10}} />
       <Text style={{left:10,top:0,fontSize:24}}>{item.title} </Text>
       <View style={{height:10}}/>
       <View style={{height:10,backgroundColor:'rgba(234,247,253,1)'}}/>
      </View>
      </TouchableOpacity>
   };
  
  static getImageView(item,clickBlock){
    var  picInfos = new Array
    
    this.clickCallBack = clickBlock
    picInfos = item['picInfo'];
    var url = ''
    url  = picInfos.length>0 ?  picInfos[0]['url'] : '';
    this.urlString = item['link']
    return <TouchableOpacity onPress={()=>{
      this.clickCallBack( this.urlString)
    }}>
       <View>
        <Image  style={{height:150}}  source={{uri:url}}/>
        <Text style={{left:10,height:20}}>{item.title} </Text>
        <View style={{height:10,backgroundColor:'rgba(234,247,253,1)'}}/>
    </View> 
    </TouchableOpacity>
   }
  //  clikck(url){
     
    clickCallBack(url) {
      
    }
  //     this.props.returnBlock()
  //  }
}
var styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    rightContainer: {
      flex: 1
    },
    title: {
      fontSize: 20,
      marginBottom: 8,
      textAlign: "center"
    },
    year: {
      textAlign: "center"
    },
    thumbnail: {
      
      height: 20
    },
    list: {
      paddingTop: 20,
      backgroundColor: "#F5FCFF",
      height:100,
    },
  });