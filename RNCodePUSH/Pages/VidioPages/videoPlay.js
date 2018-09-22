import NiceScreen from "../../page/Nice";
import React from 'react';
import {novaelApi} from "../../common/netUrl";
import Video from 'react-native-video';
import { Button,TouchableOpacity,Image, View, Text ,StyleSheet,FlatList,ActivityIndicator,Dimensions} from 'react-native';
const  readbookFullUrl = 'http://wap.sogou.com/book/sgapp_ranking_u.jsp?rank=resou&json=1&start=1&length=20'
import NetTool from "../../Tool/NetTool";
export default  class VideoplayScreen extends NiceScreen{
    constructor(props){
        super(props)
        this.state = {
            playurl:''
        }
    }
    render(){
        const {params} = this.props.navigation.state;
        const {url} = params;
        this.state.playurl = url
         return <Video source={{uri: this.state.playurl}}   // Can be a URL or a local file.
         ref={(ref) => {
           this.player = ref
         }}                                      // Store reference
         onBuffer={this.onBuffer}                // Callback when remote video is buffering
         onEnd={this.onEnd}                      // Callback when playback finishes
         onError={this.videoError}               // Callback when video cannot be loaded
         style={styles.backgroundVideo} />
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