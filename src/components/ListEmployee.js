import React, { Component } from 'react';
import {  View, Text, StyleSheet,TouchableOpacity,Image,Alert} from 'react-native';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
    itemsList: {
        flex: 1,
        flexDirection: 'column',
        marginTop:hp('2%')
    },
    itemtext: {
        fontSize: wp('3%'),
        fontWeight: 'bold',
        textAlign: 'center',
        padding: hp('2%')
    },
    TouchableOpacityStyle:{
 
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
      },
     
      FloatingButtonStyle: {
     
        resizeMode: 'contain',
        width: 50,
        height: 50,
      }
});

export default class ItemComponent extends Component {
    SampleFunction=()=>{
 
       Actions.home()
   
    }
  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
            return (
                <TouchableOpacity key={index}
                style={{marginLeft:wp('3%'),width:wp('94%'),height:hp('8%'),backgroundColor:'#fff',marginBottom:hp('2%')}}
                onPress={()=>Actions.profile({item})}>
                    <Text style={styles.itemtext}>{item.name}</Text>
                </TouchableOpacity>  
            )
        })}
<TouchableOpacity activeOpacity={0.5} onPress={this.SampleFunction} style={styles.TouchableOpacityStyle} >
 
 <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}} 
 
        style={styles.FloatingButtonStyle} />

</TouchableOpacity>
      </View>
    );
  }
}