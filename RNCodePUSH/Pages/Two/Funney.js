import React from 'react';
import NiceScreen from "../../page/Nice";
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import { Image,TouchableOpacity, FlatList,ActivityIndicator, StyleSheet, Text, View,RefreshControl ,Dimensions,Button} from "react-native";
import NetTool from "../../Tool/NetTool";
import { itemTitleCell } from '../One/News';
 //import {ImageCell} from '../Two'
import codePush from 'react-native-code-push';
export default class funneyScreen extends NiceScreen{
    constructor(props){
        super(props)
        this.state = {
            all:['全部','视频','图片','段子','声音'],
            alls:[],
            movies:[],
            pics:[],
            texts:[],
            voices:[],
            loaded:false,
            freshing:false,
        }
        this.checkUpdate = this.checkUpdate.bind(this);
        this.getCellitem = this.getCellitem.bind(this);
        this.playVideo = this.playVideo.bind(this);
        this.freshComponet = this.freshComponet.bind(this);
        this.updateTableData = this.updateTableData.bind(this);
    }
    componentDidMount(){
        this.fetchData(1,1);
        this.fetchData(2,1);
        this.fetchData(3,1);
        this.fetchData(4,1);
        this.fetchData(4,1);
    }
    render(){
        if (this.state.loaded){
            return <ScrollableTabView
            style={{marginTop: 0, }}
            initialPage={0}
            renderTabBar={() => <ScrollableTabBar />}
          >
            {
                this.state.all.map((itemTitleCell,index)=>{
                    return  <FlatList refreshControl={this.freshComponet(index)} tabLabel={itemTitleCell} data={this.getData(index)} renderItem={this.getCellitem}></FlatList>
                })
            }
          </ScrollableTabView>;
        }else{
            return this.renderLoadingView()
        }
       
    }
    freshComponet(index){
        return <RefreshControl title={'换一批'} refreshing={this.state.freshing} onRefresh={()=>{
            this.updateTableData(index,1)
        }}/>
      }
    getData(index){
        var arr = []
        switch (index) {
            case 0:
            arr = this.state.alls
                break;
           case 1:
           arr = this.state.movies
                break;
           case 2:
           arr = this.state.pics
                break;  
            case 3:
            arr = this.state.texts
                break;
            case 4:
            arr = this.state.voices
                break;
            default:
                break;
        }
       return arr
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
    getCellitem({item,index}){
        if (item.cdn_img) {
            return <ImageCell data={item} playVideo={this.playVideo} />
        }
        return <View>
            <Button  title = "😁😁😁"  onPress={this.checkUpdate}/>
            <Text>{item.text}</Text>

            </View>
    };
    playVideo(url){
        this.props.navigation.navigate('video',{url:url})
    }

    checkUpdate(){
     //   codePush.sync
        // codePush.sync({
        //     updateDialog: {
        //       appendReleaseDescription: true,
        //       descriptionPrefix:'\n\n更新内容：\n',
        //       title:'更新',
        //       mandatoryUpdateMessage:'',
        //       mandatoryContinueButtonLabel:'更新',
        //     },
        //     mandatoryInstallMode:codePush.InstallMode.IMMEDIATE,
        //   });
    }
    updateTableData(index,page){
        this.setState({
            freshing:true
          })
          this.fetchData(index,page)
    }
    fetchData(index,page){
        NetTool.get('satinApi',{type:index,page:page},(json)=>{
            this.setState({
                freshing:false,
                loaded:true
            });
            const{data} = json
            switch (index) {
                case 1:
                this.setState({
                    alls:data
                });
                    break;
               case 4:
                this.setState({
                    movies:data
                });
                    break;
               case 3:
                this.setState({
                    pics:data
                });
                    break;  
                case 2:
                this.setState({
                    texts:data
                });
                    break;
                case 1:
                this.setState({
                    voices:data
                });
                    break;
                default:
                    break;
            }
            
        },(error)=>{

        })
    }
}
export class ImageCell extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isImageloaded:false
        }
    }
    componentDidMount(){
        this.playVideo = this.props.playVideo
    }
    render(){
        var {width} =  Dimensions.get('window')
        let strWdith = this.props.data.width
        let strheight = this.props.data.height
        let scale = parseInt(strheight)/parseInt(strWdith)
        let height = width * scale
        let videoUrl = ''
        videoUrl = this.props.data.videouri
        if (videoUrl.length > 0) {
            return  <TouchableOpacity onPress={()=>{
                this.playVideo(videoUrl)
            }}>
           
            <View style={{justifyContent:'center'}}>
           
             <Text style={{backgroundColor:'black'}}>{this.props.data.text}</Text>
            <Image style={{width:width,height:height}} source={{uri:this.props.data.cdn_img}}/>
            <Image style={{alignSelf:'center',width:50,height:50,position:'absolute'}} source={require('../../Img/player.png')}/>
            
            </View>
            </TouchableOpacity>
        }else{

            return <View>
            <Text style={{backgroundColor:'black'}}>{this.props.data.text}</Text>
           <Image style={{width:width,height:height}} source={ {uri: this.props.data.cdn_img} } onloadstart={()=>{
            
           }} onLoad={()=>{
            this.setState({
                isImageloading:true
           })
           }} />
           </View>
        }
        
    }

    playVideo(videoUrl){
       
    }
}