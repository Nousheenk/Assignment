/**
 * Sample React Native  Employee Details App
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AddItem from './AddItem'
import Login from './Login'
import styles from '../styles/styles'
import { Actions } from 'react-native-router-flux';
import FoundationIcon from 'react-native-vector-icons/Foundation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Address from '../components/googlePlaces'
import ListItem from '../components/ListItem'

export default class Home extends React.Component{
  constructor(){
    super()
      this.state = {
        upload : false
    }
  }
  render(){
    return(
      <ImageBackground source={require('../../assests/backgd.png')} style={styles.input}>
         <TouchableOpacity 
         onPress={()=>{this.setState({
           upload : true
         })}}>
<Image source={require('../../assests/pictureUpload.png') } 
         style={{width:wp('20%'),height:hp('14%'),borderRadius:360,marginTop:hp('10%')}}></Image>
         </TouchableOpacity>
           
         {this.state.upload && (
                        <View style={{flexDirection:'row',width:wp('90%'),height:hp('10%'),justifyContent:'space-evenly',backgroundColor:'white',alignSelf:'center',padding:hp('3%'),marginTop:hp('2%'),marginLeft:wp('5%'),marginRight:wp('5%')}}>
                            
                            <TouchableOpacity 
                            onPress={() => {this.setState({
                              upload: false
                            })
                            Actions.camera()}}
                             >
                             
                             <View>
                                <Icon name='photo-camera' size={30} color='#21DDB9' />
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={() =>  {this.setState({
                              upload: false
                            })
                            Actions.galleryUpload()}}
                             >
                             <View>
                                <FoundationIcon name='photo' size={30} color='#21DDB9' />
                            </View>
                            </TouchableOpacity>
                        </View>
                    )}
                    <Login/>
    </ImageBackground>
    )
  }
}


