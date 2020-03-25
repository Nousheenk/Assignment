import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Slider,
  TouchableWithoutFeedback,
  Dimensions,
  ToastAndroid,
  Image
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { RNCamera } from 'react-native-camera';
var RNFS = require("react-native-fs");
import { Actions } from 'react-native-router-flux';

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};







export default class CameraScreen extends React.Component {

constructor(){
  super();
  //this.saveImage = this.saveImage.bind(this);
  this.state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    autoFocusPoint: {
      normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
      drawRectPosition: {
        x: Dimensions.get('window').width * 0.5 - 32,
        y: Dimensions.get('window').height * 0.5 - 32,
      },
    },
    depth: 0,
    type: 'back',
    whiteBalance: 'auto',
    ratio: '16:9',
    recordOptions: {
      mute: false,
      maxDuration: 10,
      quality: RNCamera.Constants.VideoQuality['288p'],
    },
    isRecording: false,
    canDetectFaces: false,
    canDetectText: false,
    canDetectBarcode: false,
    faces: [],
    textBlocks: [],
    barcodes: [],
    imageInfo: [],
    appFilePath: null
  
  },
  this.moveAttachment = this.moveAttachment.bind(this)
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
              appFilePath : newFilepath
            },()=>{
             // this.returnToCaller();
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

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  touchToFocus(event) {
    const { pageX, pageY } = event.nativeEvent;
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const isPortrait = screenHeight > screenWidth;

    let x = pageX / screenWidth;
    let y = pageY / screenHeight;
    // Coordinate transform for portrait. See autoFocusPointOfInterest in docs for more info
    if (isPortrait) {
      x = pageY / screenHeight;
      y = -(pageX / screenWidth) + 1;
    }

    this.setState({
      autoFocusPoint: {
        normalized: { x, y },
        drawRectPosition: { x: pageX, y: pageY },
      },
    });
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  setFocusDepth(depth) {
    this.setState({
      depth,
    });
  }

  takePicture = async ()=>{
    if (this.camera) {
      const options = { quality: 0.5 };
      const data = await this.camera.takePictureAsync().then(data => {
        this.setState({
          imageInfo: data
        })
        console.log(this.state.imageInfo.uri)
        console.log(RNFS.ExternalDirectoryPath)//provides path of app file system (/storage/emulated/0/Android/data/com.nav/files)
        
        try {
          // set new image name and filepath
          const newImageName = Date.now()+'.jpg';
          const dirPicutures = RNFS.ExternalDirectoryPath+'/pictures'
          const newFilepath = RNFS.ExternalDirectoryPath +'/pictures/' + newImageName
          console.log(newFilepath)
          const filePath = this.state.imageInfo.uri
          // move and save image to new filepath
          const imageMoved =  this.moveAttachment(filePath, newFilepath, dirPicutures);
          console.log('image moved', imageMoved);
          
        } catch (error) {
          console.log(error);
        }

        //saving the image to mobile storage
        //CameraRoll.saveToCameraRoll(this.state.imageInfo.uri,'photo');
      

      });
      
    }
  };


  




  toggle = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));



 


  renderCamera() {
    const { canDetectFaces, canDetectText, canDetectBarcode } = this.state;

    const drawFocusRingPosition = {
      top: this.state.autoFocusPoint.drawRectPosition.y - 32,
      left: this.state.autoFocusPoint.drawRectPosition.x - 32,
    };
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        autoFocusPointOfInterest={this.state.autoFocusPoint.normalized}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >
        <View style={StyleSheet.absoluteFill}>
          <View style={[styles.autoFocusBox, drawFocusRingPosition]} />
          <TouchableWithoutFeedback onPress={this.touchToFocus.bind(this)}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>
        </View>
      
          
 

      
            <TouchableOpacity style={{padding:10}}onPress={this.toggleFacing.bind(this)}>
             <Image style={{width:50,height:50}}source={require('../../assests/flipCamera.png')}/>
            </TouchableOpacity>
          
 
        <View style={{ bottom: 0 }}>
       

          {this.state.zoom !== 0 && (
            <Text style={[styles.flipText, styles.zoomText]}>Zoom: {this.state.zoom}</Text>
          )}
       

            <TouchableOpacity
            style={{padding:10,marginTop:-50,alignItems:'center',alignSelf: 'center'}}
              onPress={this.takePicture.bind(this)}
            >
             <Image style={{width:80,height:80,borderRadius:360,alignSelf:'center'}}source={require('../../assests/snap.png')}/>
     
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end',justifyContent:'flex-end' }]}
              onPress={this.zoomIn.bind(this)}
            >
               <Image style={{width:20,height:20,alignSelf:'center'}}source={require('../../assests/zoom.png')}/>
           
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' ,}]}
              onPress={this.zoomOut.bind(this)}
            >
              
              <Image style={{width:20,height:20,alignSelf:'center'}}source={require('../../assests/zoomOut.png')}/>
            </TouchableOpacity>
           
         
        
        </View>
 
      </RNCamera>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#000',
  },
  flipButton: {
    flex: 0.3,
    height: 120,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 0,
    borderWidth: 0,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoFocusBox: {
    position: 'absolute',
    height: 64,
    width: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    opacity: 0.4,
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
  zoomText: {
    position: 'absolute',
    bottom: 70,
    zIndex: 2,
    left: 2,
  },
  picButton: {
    backgroundColor: 'darkseagreen',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  text: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#F00',
    justifyContent: 'center',
  },
  textBlock: {
    color: '#F00',
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
});