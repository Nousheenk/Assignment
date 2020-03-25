import { BackHandler, Alert } from 'react-native'
import React, { Component } from 'react';
import {Actions, Router, Scene ,ActionConst} from 'react-native-router-flux'
import Home from './screens/Home'
import Places from './components/googlePlaces'
import Location from './components/geolocation'
import Modal from './components/modal'
import PictureUpload from './components/Upload'
import Camera from './components/camera'
import ListItem from './components/ListItem'
import Profile from './screens/profile'
// Define scenes for routing
const scenes = Actions.create(
    <Scene key="root">
    <Scene key="home" component={Home} initial={true} hideNavBar={true} />
    <Scene key="googlePlaces" component={Places}  />
    <Scene key="location" component={Location}  />
    <Scene key="modal" component={Modal}  />
    <Scene key="galleryUpload" component={PictureUpload}  />
    <Scene key="camera" component={Camera}  />
    <Scene key="item" component={ListItem}  />
    <Scene key="profile" component={Profile}  />
  </Scene>
  )
export default class Route extends Component {
  componentDidMount () {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    console.log(Actions.currentScene)
    switch (Actions.currentScene) {
      case 'home':
       // BackHandler.exitApp()
        Alert.alert(
                    'Exit App',
                    
                    'Are you sure you want to exit', [{
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    }, {
                        text: 'OK',
                        onPress: () => BackHandler.exitApp(), 
                    }, ], {
                        cancelable: false
                    }
                 )
        break

      default: Actions.pop()
    }

    return true
  }
  


  render () {
    return <Router scenes={scenes} />
  }
}