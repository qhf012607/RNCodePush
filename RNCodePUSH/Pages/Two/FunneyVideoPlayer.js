import NiceScreen from "../../page/Nice";
import React from 'react';
import Video from 'react-native-video';
import { Button,TouchableOpacity,Image, View, Text ,StyleSheet,SectionList,ActivityIndicator} from 'react-native';
export default class FunneyVideoPlayerScreen extends NiceScreen{
     render(){
        const {params} = this.props.navigation.state;
        const {url} = params;
         return <Video source={{uri: url}}   // Can be a URL or a local file.
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