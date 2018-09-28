import NiceScreen from "../../page/Nice";
import React from 'react';
import {novaelApi} from "../../common/netUrl";
import Video from 'react-native-video';
import { DeviceEventEmitter,AsyncStorage,Button,Animated,Easing,TouchableOpacity,Image, View, Text ,StyleSheet,FlatList,ActivityIndicator,Dimensions} from 'react-native';
const  readbookFullUrl = 'http://wap.sogou.com/book/sgapp_ranking_u.jsp?rank=resou&json=1&start=1&length=20'
import NetTool from "../../Tool/NetTool";
export default  class VideoplayScreen extends NiceScreen{
    constructor(props){
        super(props)
        this.state = {
            rotateValue: new Animated.Value(0),//旋转角度的初始值
            playing:true,
            collected:false
        }
    }
    componentDidMount(){
         if (this.props.navigation.state.params!=null&this.state.playing){
            const {params} = this.props.navigation.state;
            this.startAnimatie()
            this.history(params)
            this.checkCollect(params)
        }
        DeviceEventEmitter.addListener('playMusic',(params)=>{
            this.playMusic(params)
        })
       
    }
    
    startAnimatie(){
        this.state.rotateValue.setValue(0)
        Animated.timing(this.state.rotateValue, {
            toValue: 1,  //角度从0变1
           duration: 10000,  //从0到1的时间
            
            easing: Easing.out(Easing.linear),//线性变化，匀速旋转
        }).start((finished) => {
            if (finished.finished) {
                this.startAnimatie()
              
            }
        })
    }
    
    componentWillReceiveProps(){
        // if (this.props.navigation.state.params!=null&this.state.playing){
        //     this.startAnimatie()
        //     this.history()
        //     this.checkCollect()
        // }
    }
    
    playMusic(params){
        this.startAnimatie()
        this.history(params)
        this.checkCollect(params)
    }

    checkCollect(params){
        const {url} = params;
        let array = new Array
        AsyncStorage.getItem('collect',(eror,result)=>{
            let dic = JSON.parse(result)
            if (dic){
                array = dic
            }
            var contain = false
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                if (element.name == url.name) {
                    contain = true
                }
            }
            if (contain) {
                this.setState({
                    collected:true
                })
            }else{
                this.setState({
                    collected:false
                })
            }
            
        })
    }
    stopAniated(){
        Animated.timing(
            this.state.rotateValue
          ).stop();
        this.state.rotateValue.stopAnimation()
    }

    pauseOrStart(){
        if (this.state.playing) {
            this.setState({
                playing:false
            })
          //  this.state.playing=false
            this.stopAniated()
            
        }else{
            this.setState({
                playing:true
            })
           // this.state.playing=true
            this.startAnimatie()
           
        }
    }
    history(params){
        const {url} = params;
        let array = new Array
        AsyncStorage.getItem('history',(eror,result)=>{
            let dic = JSON.parse(result)
            if (dic){
                array = dic
            }
            var contain = false
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                if (element.name == url.name) {
                    contain = true
                    array.splice(index,1)
                }
            }
            if (!contain) {
                array.push({'name':url.name,'radioUrl':url.radioUrl})
                AsyncStorage.setItem('history',JSON.stringify(array))
            }else{
                array.push({'name':url.name,'radioUrl':url.radioUrl})
                AsyncStorage.setItem('history',JSON.stringify(array))
            }
            
        })
       
    }
    collect(){
        const {params} = this.props.navigation.state;
        const {url} = params;
        let array = new Array
        AsyncStorage.getItem('collect',(eror,result)=>{
            let dic = JSON.parse(result)
            if (dic){
                array = dic
            }
            var contain = false
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                if (element.name == url.name) {
                    contain = true
                    array.splice(index,1)
                }
            }
            if (!contain) {
                array.push({'name':url.name,'radioUrl':url.radioUrl})
                AsyncStorage.setItem('collect',JSON.stringify(array),()=>{
                    const {params} = this.props.navigation.state;
                    this.checkCollect(params)
                })
              
               
                //   this.setState({
                //     collected:this.state.collected
                // })
            }else{
                AsyncStorage.setItem('collect',JSON.stringify(array),()=>{
                    this.checkCollect(params)
                })
                // this.setState({
                //     collected:false
                // })
              
                // this.setState({
                //     collected:this.state.collected
                // })
            }
            
        })
       
    }
    render(){
      //  const {params} = this.props.navigation.state;
      //  const {url} = params;
      //  this.state.playurl = url
        if (this.props.navigation.state.params) {
            const {params} = this.props.navigation.state;
            const {url} = params;
            return <View style={{height:'100%',justifyContent:'center',alignItems:'center'}}>
         
           <Text numberOfLines={2} style={{position:'absolute',fontSize:130,textAlign:'center'}}>{url.radioFm}</Text>
            <Animated.View 
            style={{width:300,justifyContent:'center',alignItems:'center',
            height: 300,borderRadius:125, //图片变园
            transform: [
            //使用interpolate插值函数,实现了从数值单位的映
//射转换,上面角度从0到1，这里把它变成0-360的变化
            {rotateZ: this.state.rotateValue.interpolate({
            inputRange: [0,1],
            outputRange: ['0deg', '360deg'],
            })},
 ]}}>

 <Image style={{ position:'absolute',height:'100%',width:'100%'}} source={require('../../Img/musicplay.png')}/>
 <Text style={{position:'absolute',width:'100%',bottom:20,textAlign:'center'}}>{url.name}</Text>
 
</Animated.View>

<Video source={{uri: url.radioUrl}}   // Can be a URL or a local file.
            ref={(ref) => {
              this.player = ref
            }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onEnd={this.onEnd}                      // Callback when playback finishes
            onError={this.videoError} 
            paused={
                !this.state.playing
            }              // Callback when video cannot be loaded
            style={styles.backgroundVideo} />
             <TouchableOpacity style={{justifyContent:'center',left:120,top:20,width:50,height:50}} onPress={()=>{
    this.collect()
}}>
               <Image style={{left:15}} source={this.state.collected ? require("../../Img/like_u.png") : require("../../Img/like.png")}/>
          </TouchableOpacity >
            <TouchableOpacity  onPress={()=>{
    this.pauseOrStart()
}}>
 
  <Image style={{width:50,height:50,marginTop:50,alignSelf:'center'}} source={this.state.playing ? require("../../Img/pausePlay.png") : require("../../Img/startPlay.png")}/>
        
          </TouchableOpacity>
</View>
        }else{
            return  <View style={{height:'100%',justifyContent:'center',alignItems:'center'}}>
             <Animated.View 
            style={{width:300,justifyContent:'center',alignItems:'center',
            height: 300,borderRadius:125, //图片变园
            transform: [
            //使用interpolate插值函数,实现了从数值单位的映
//射转换,上面角度从0到1，这里把它变成0-360的变化
            {rotateZ: this.state.rotateValue.interpolate({
            inputRange: [0,1],
            outputRange: ['0deg', '360deg'],
            })},
 ]}}>
 <Image style={{ position:'absolute',height:'100%',width:'100%'}} source={require('../../Img/musicplay.png')}/>
 
</Animated.View>
</View>
        }
        
     }

}

// Later on in your styles..
var styles = StyleSheet.create({
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });