import React, { Component } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    Image,
    PermissionsAndroid
} from "react-native";
import Geolocation from '@react-native-community/geolocation';


export default class App extends Component {
    state = {
        currentLongitude: 'unknown', //Initial Longitude
        currentLatitude: 'unknown', //Initial Latitude
    };
 
    
    
    componentDidMount() {
        {/* 
         * Device Location(i,e Longitude,Latitude)
         */}

        
        Geolocation.getCurrentPosition(position => {
            const currentLongitude = JSON.stringify(position.coords.longitude);
            const currentLatitude = JSON.stringify(position.coords.latitude);
   
            this.setState({ currentLongitude: currentLongitude });
            this.setState({ currentLatitude: currentLatitude });
        }
        );
        this.watchID = Geolocation.watchPosition(position => {
            //Will give you the location on location change
            console.log(position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            const currentLatitude = JSON.stringify(position.coords.latitude);

            this.setState({ currentLongitude: currentLongitude });
            this.setState({ currentLatitude: currentLatitude });
        });
       

    }
    componentWillUnmount = () => {
        Geolocation.clearWatch(this.watchID);
    };
    render() {
        return (
            <View style={styles.container}>
               
                <Text style={styles.boldText}>You are Here</Text>
                <Text
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 16,
                    }}>
                    Longitude: {this.state.currentLongitude}
                </Text>
                <Text
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 16,
                    }}>
                    Latitude: {this.state.currentLatitude}
                </Text>
              
              
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        padding: 16,
    },
    boldText: {
        fontSize: 30,
        color: 'red',
    },
});