import React,{Component} from 'react'
import {View,Text, ImageBackground,Image} from 'react-native'
import styles from '../styles/styles' 
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class Profile extends Component{
render(){
    return(
        <View> 
            <ImageBackground source={require('../../assests/backgd.png')} style={styles.input}>
            <Image source={require('../../assests/pictureUpload.png') } 
         style={{width:wp('20%'),height:hp('14%'),borderRadius:360,marginTop:hp('5%'),marginBottom:hp('3%')}}>

         </Image>
         <View style={{width:wp('100%'),height:hp('100%'),backgroundColor:'#fff',borderRadius:50}}>
         <Text style={{alignSelf:'center',marginTop:hp('2%'),fontSize:wp('3%'),color:'blue'}}>name     :{this.props.item.name}</Text>
         <Text style={{alignSelf:'center',marginTop:hp('2%'),fontSize:wp('3%'),color:'blue'}}>Address  :{this.props.item.address}</Text>
         <Text style={{alignSelf:'center',marginTop:hp('2%'),fontSize:wp('3%'),color:'blue'}}>EmailID  :{this.props.item.email}</Text>
         <Text style={{alignSelf:'center',marginTop:hp('2%'),fontSize:wp('3%'),color:'blue'}}>Latitude :{this.props.item.locationlat}</Text>
         <Text style={{alignSelf:'center',marginTop:hp('2%'),fontSize:wp('3%'),color:'blue'}}>Longitude:{this.props.item.locationlat}</Text>
     </View>
  
         
        
            </ImageBackground>

        </View>
    
    )
}

}