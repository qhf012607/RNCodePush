import NiceScreen from "../../page/Nice";
import React from 'react';
import { DeviceEventEmitter,Button,RefreshControl,TouchableOpacity,Image, View, Text ,StyleSheet,FlatList,ActivityIndicator,Dimensions,Animated,PanResponder} from 'react-native';
//import { yellow } from "../../node_modules/kleur";
import NetTool from "../../Tool/NetTool";
import {newsApi} from "../../common/netUrl";
import PropTypes from 'prop-types';
import CodePush from 'react-native-code-push'
// import FadeInView from '../VidioPages/videoList'
export default  class VideoScreen extends NiceScreen{
  
    constructor(props){
        super(props);
        this.state = {
            arrayParent:new Array,
            arrrayChild:new Array,
            loaded:false,
            freshing:false,
            showRight:false,
            selectedThirdIndex:0
        }
     this.fetchchildList = this.fetchchildList.bind(this)
     this.fetctData = this.fetctData.bind(this)
     this.tableLeftitem = this.tableLeftitem.bind(this)
     this.tableitemRight = this.tableitemRight.bind(this)
     this.feichthirdList = this.feichthirdList.bind(this)
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
           break
        }
        }
      if (this.state.arrayParent.length>0&&this.state.arrayParent[0].arrayChild){
          if(this.state.showRight){
            const element = this.state.arrayParent[indexOfchild].arrayChild[this.state.selectedThirdIndex];
            
            return <View style={{flexDirection:'row'}}> 
            <FlatList style={{width: Dimensions.get('window').width  * 0.4}} data={this.state.arrayParent} renderItem={this.tableLeftitem}></FlatList>
            <FlatList style={{width: Dimensions.get('window').width  * 0.6}} data={this.state.arrayParent[indexOfchild].arrayChild} renderItem={this.tableitemRight}></FlatList>
            <FadeInView data={{array:element.arrayChild,callBack:(itemback,index)=>{
                    if(itemback){
                        this.props.navigation.navigate('funney',{url:itemback})
                        DeviceEventEmitter.emit('playMusic',{url:itemback});
                    }
            },remove:()=>{
                this.setState({
                    showRight:false
                })
            }}}/>
            </View>
          }else{
            return <View style={{flexDirection:'row'}}> 
            <FlatList style={{width: Dimensions.get('window').width  * 0.4}} data={this.state.arrayParent} renderItem={this.tableLeftitem}></FlatList>
            <FlatList style={{width: Dimensions.get('window').width  * 0.6}} data={this.state.arrayParent[indexOfchild].arrayChild} renderItem={this.tableitemRight}></FlatList>
            </View>
          }
       
      //  return <FadeInView/>
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
        <View style={{flex:1,justifyContent:'center',}} onStartShouldSetResponder={()=>true} onResponderGrant={
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
            this.state.showRight = false
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

    tableitemRight({item,index}){
        return TitleCell.getTitleView(index,item,(itemback,indexThird)=>{
            if(itemback.radioUrl){
               
                this.props.navigation.navigate('funney',{url:itemback})
                DeviceEventEmitter.emit('playMusic',{url:itemback});
            }else{
                this.state.selectedThirdIndex =  indexThird
                for (let index = 0; index < this.state.arrayParent.length; index++) {
                    const item = this.state.arrayParent[index];
                    if (item.selected) {
                        let itemTwo = item.arrayChild
                        let itemTHree  = itemTwo[this.state.selectedThirdIndex];
                        if(itemTHree.arrayChild){
                            this.setState({
                                showRight:true
                            })
                        }else{
                            this.state.showRight=true;
                            this.feichthirdList()
                        }
                        break
                    }
                   
                }
                if (item.arrayChild) {
                    
                }
               

            }
          
          })
    }
    feichthirdList(){
        let indexOfchild = 0
        let arraychild = []
        for (let index = 0; index < this.state.arrayParent.length; index++) {
            const item = this.state.arrayParent[index];
            if (item.selected) {
               indexOfchild = index
               arraychild = item.arrayChild
               break
            }
        }
        let item = arraychild[this.state.selectedThirdIndex]
        let idpara =  item['radioId']
        NetTool.postJSON("",{level:4,parentId:idpara,rootId:1},null,(info)=>{
            const{result} = info;
            for (let index = 0; index < this.state.arrayParent.length; index++) {
                const item = this.state.arrayParent[index];
                if (item.selected) {
                    let itemTwo = item.arrayChild
                    let itemTHree  = itemTwo[this.state.selectedThirdIndex];
                    if(itemTHree.arrayChild == null){
                        itemTHree.arrayChild = result
                    }
                }
                // break
            }
            this.setState(
              {
                  arrayParent:this.state.arrayParent
              }
            )
            
         },(error)=>{
    
         })    
    }

}

export class FadeInView extends React.Component {
    // state = {
    //   fadeAnim: new Animated.Value(0),  // 透明度初始值设为0
    // }
    constructor(props) {
        super(props)
        this.state = {
          /*
           初始化动画值
           * */
          animValue: new Animated.Value(1),
          currentValue:0
       //   currentValue: Dimensions.get('window').width*0.4, //标志位
        }
        this.tableitemRight = this.tableitemRight.bind(this)
      }
    
    componentDidMount() {
        // Animated.spring(position, {
        //     toValue: { x: Dimensions.get('window').width  * 0.4, y: 0 } // return to start
        //   }).start();   
                             // 开始执行动画
        Animated.timing(this.state.animValue, {
            toValue:this.state.currentValue,
                                duration: 1000,
                            }).start()
          
       
    }
 
componentWillMount(evt, gestureState){
    this._panResponder=PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {

        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

        // gestureState.{x,y} 现在会被设置为0
      },
      onPanResponderMove:Animated.event([null, {
        
      }],{listener: (event, gestureState) => {
        const x = gestureState.dx
        if (x>0) {
            Animated.timing(this.state.animValue, {
                toValue:1,
                                    duration: 1000,
                                },).start((finished) => {
                                    if (finished.finished) {
                                        this.props.data.remove()
                                    }
                                })
        }
      }},),
    });
    }
    
    render() {
   //   let { fadeAnim } = this.state;
  
      return (
        <Animated.View  {...this._panResponder.panHandlers}                  // 使用专门的可动画化的View组件
          style={{
              backgroundColor:'white',
        //   left:Dimensions.get('window').width,
            width: Dimensions.get('window').width  * 0.6,
            position:'absolute',
            height:'100%',
            /*
             将动画值绑定到style的属性
            * */
       //     opacity: this.state.animValue, //透明度动画
            transform: [ //位置动画（可以思考一下：下面的元素顺序不同会有不同效果）
              {
                translateX: this.state.animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [Dimensions.get('window').width*0.4,Dimensions.get('window').width ] //线性插值，0对应-100，1对应0
                })
              },
           
            ]
          }} 
        >
         <FlatList {...this._panResponder.panHandlers} data={this.props.data.array} renderItem={this.tableitemRight}/>
        </Animated.View>
      );
    }
    tableitemRight({item,index}){
        return TitleCell.getTitleView(index,item,(urlstring)=>{
            this.props.data.callBack(urlstring)
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

  static getTitleView(index,item,clickBlock){
  //  this.urlString = item['radioUrl']
    this.clickCallBack = clickBlock
    return <TouchableOpacity onPress={()=>{
      this.clickCallBack( item,index,)
    }}>
      <View style={{backgroundColor:'white',height:44}} >
       <Text style={{left:10,top:13,fontSize:16,height:18,textAlignVertical:'center',}}>{item.name} </Text>
       <View style={{height:1,top:24,left:10,backgroundColor:'rgba(224,224,224,1)'}}/>
      </View>
      </TouchableOpacity>
   };
     
    clickCallBack(item,index) {
        
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
    
     let backgroundColor = item['selected']?'white':'rgba(233,233,239,1)'
     this.clickCallBack = clickBlock
   
     return <TouchableOpacity onPress={()=>{
        this.clickCallBack( index)
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

