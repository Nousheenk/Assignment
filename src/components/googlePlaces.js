import RNGooglePlaces from 'react-native-google-places';
import  {View,Text,TouchableOpacity} from 'react-native'
import React,{Component} from 'react'


export default class GPlacesDemo extends Component {
    openSearchModal() {
      RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
          console.log(place);
          // place represents user's selection from the
          // suggestions and it is a simplified Google Place object.
      })
      .catch(error => console.log(error.message));  // error is a Javascript Error object
    }
   
    render() {
      return (
        <View style={{flex:1}}>
          <TouchableOpacity
            style={{width:300,height:100}}
            onPress={() => this.openSearchModal()}
          >
            <Text>Pick a Place</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }