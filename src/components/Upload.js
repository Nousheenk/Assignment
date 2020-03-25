import React from 'react'
import { View, Text, Alert, StyleSheet, Image ,TouchableOpacity} from 'react-native'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons'
import FoundationIcon from 'react-native-vector-icons/Foundation'
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker'
var RNFS = require("react-native-fs");




export default class UploadedPrescription extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            photo: null,
            galleryImage : null
        }

    }
    
   //move the attachment to app folder
 moveAttachment = async (filePath, newFilepath,dirPicutures) => {
    return new Promise((resolve, reject) => {
      RNFS.mkdir(dirPicutures)
        .then(() => {
          RNFS.moveFile(filePath, newFilepath)
            .then(() => {
              console.log('FILE MOVED', filePath, newFilepath);
              this.setState({
                galleryImage : newFilepath
              },()=>{
                  console.log("this is gallery image "+this.state.galleryImage)
              })
              resolve(true);
            })
            .catch(error => {
              console.log('moveFile error', error);
              reject(error);
            });
        }) 
        .catch(err => {
          console.log('mkdir error', err);
          reject(err);
        });
    });
  };


    createFormData = (photo, body) => {
        const data = new FormData();

        data.append("profile", {
            name: photo.fileName,
            type: photo.type,
            uri:
                Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });
        return data;
    };


    handleChoosePhoto = () => {
        const options = {
            noData: true,
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ photo: response },
                    () => {
                        this.handleUploadPhoto();
                    })
            }
        })
    }
    handleUploadPhoto = () => {
        console.log("gallery sekected image"+this.state.photo.uri)
        try {
            // set new image name and filepath
            const newImageName = Date.now()+'.jpg';
            const dirPicutures = RNFS.ExternalDirectoryPath+'/pictures'
            const newFilepath = RNFS.ExternalDirectoryPath +'/pictures/' + newImageName
            console.log(newFilepath)
            const filePath = this.state.photo.uri
            // move and save image to new filepath
            const imageMoved =  this.moveAttachment(filePath, newFilepath, dirPicutures);
            console.log('image moved', imageMoved);
          } catch (error) {
            console.log(error);
          }
       
    };

    render() {
        console.log("returned drattt  "+ this.props.photoUri);
        const { photo , captureImage} = this.state
        return (
            <View style={style.Container}>

                <View style={style.uploadOption}>

                    <View style={style.UpluuadView}>
                        {/* <TouchableOpacity
                            onPress={() => Actions.camera()}

                            style={style.uploadOptnView}>
                            <View >
                                <Icon name='photo-camera' size={30} color='#21DDB9' />
                            </View>
                        </TouchableOpacity> */}

                        <TouchableOpacity
                            onPress={() => this.handleChoosePhoto()}
                            style={style.uploadOptnView}>
                            <View>
                                <FoundationIcon name='photo' size={30} color='#21DDB9' />
                            </View>
                        </TouchableOpacity>
                    </View>

                    
                    
                  
                   

                </View>
            </View>

        )
    }
}
const style = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#F2F2F2'
    },
    uploadText: {
        color: '#696969'
    },
    uploadOption: {
        width: wp('90%'),
        height: hp('35%'),
        backgroundColor: '#fff',
        marginLeft: wp('5%'),
        borderRadius: wp('3%')
    },

    guide: {
        padding: wp('2%'),
        fontWeight: 'bold',
        fontSize: wp('3.5%')
    },
    subHeading: {
        marginLeft: wp('2%'),
        fontWeight: 'normal',
        fontSize: wp('2.5%')
    },
    UpluuadView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: hp('3%')
    },
    UpluuadViewcameraText: {
        flexDirection: 'row',
        marginLeft: wp('13.5%'),
        marginTop: hp('1%')
    },
    UpluuadViewGalleryText: {
        flexDirection: 'row',
        marginLeft: wp('17.5%'),
        marginTop: hp('1%')
    },
    UpluuadViewText: {
        flexDirection: 'row',
        marginLeft: wp('13%'),
        marginTop: hp('3%')
    },
    UpluuadViewPastText: {
        flexDirection: 'row',
        marginLeft: wp('17%'),
        marginTop: hp('1%')
    },
    uploadOptnView: {
        flexDirection: 'column',
        backgroundColor: '#d7fcf5',
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 360
    }
})