import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    Image,
    Alert,
    ImageBackground,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import validator from 'email-validator';
import passwordValidator from 'password-validator'
import RNGooglePlaces from 'react-native-google-places';
import Geolocation from '@react-native-community/geolocation';
import { addItem } from '../services/ItemService';


let defaults = {
    firstname: 'Eddard',
    lastname: 'Stark',
    about: 'Stoic, dutiful, and honorable man, considered to embody the values of the North',
};
export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locationchk: false,
            check : false,
            address: 'Address',
            addrsExist: false,
            addrsPick: true,
            currentLongitude: '', //Initial Longitude
            currentLatitude: '', //Initial Latitude
        }
        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);

        this.onSubmitEmail = this.onSubmitEmail.bind(this);
        this.onSubmitName = this.onSubmitName.bind(this);
        this.onSubmitPhone = this.onSubmitPhone.bind(this);
        //this.onSubmitPassword = this.onSubmitPassword.bind(this);
        this.onAccessoryPress = this.onAccessoryPress.bind(this);

        this.onErrorEmail = this.onErrorEmail.bind(this);
        this.onErrorName = this.onErrorName.bind(this);
        //this.onErrorPassword = this.onErrorPassword.bind(this);
        this.onErrorPhone = this.onErrorPhone.bind(this);

        this.emailRef = this.updateRef.bind(this, 'email');
        this.nameRef = this.updateRef.bind(this, 'username');
        this.phoneRef = this.updateRef.bind(this, 'phone');
        //this.passwordRef = this.updateRef.bind(this, 'password');

        this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

        this.state = {
            secureTextEntry: true,

        };

    }



    onFocus() {
        let { errors = {} } = this.state;

        for (let name in errors) {
            let ref = this[name];

            if (ref && ref.isFocused()) {
                delete errors[name];
            }
        }

        this.setState({ errors });
    }

    onChangeText(text) {
        ['email', 'phone', 'username']
            .map((name) => ({ name, ref: this[name] }))
            .forEach(({ name, ref }) => {
                if (ref.isFocused()) {
                    this.setState({ [name]: text });
                }
            });
    }

    onAccessoryPress() {
        this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
    }


    onClicked = () => {
        RNGooglePlaces.openAutocompleteModal()
            .then((place) => {
                //console.log(place);
                this.setState({
                    address: String(place.address), addrsExist: true, check: true
                }, () => {
                    //this.password.focus();
                    console.log(this.state.address)
                    defaults.firstname = place.address
                }
                )
                // place represents user's selection from the
                // suggestions and it is a simplified Google Place object.
            })
            .catch(error => console.log(error.message));  // error is a Javascript Error object

    }
    getlocation= () =>{
        Geolocation.getCurrentPosition(position => {
            const currentLongitude = JSON.stringify(position.coords.longitude);
            const currentLatitude = JSON.stringify(position.coords.latitude);
   
            this.setState({ currentLongitude: currentLongitude,locationchk:true, currentLatitude: currentLatitude });
           
        }
        );
    }


    onSubmitAddress = () => {
        console.log('clicked')
    }
    onSubmitEmail() {
        this.phone.focus();
    }
    onSubmitName() {
        //  this.password.focus();
    }
    // onSubmitPassword() {
    //     this.password.blur();
    // }
    onSubmitPhone() {
        // this.phone.blur(); 
    }
    onErrorEmail() {
        this.email.clear();
    }
    onErrorName() {
        this.username.clear();
    }
    // onErrorPassword() {
    //     this.password.clear();
    // }
    onErrorPhone() {
        this.phone.clear();
    }

    fetchLoginAPI(data) {

        //console.log(data);
        addItem(data)
     
    }
    onSubmit() {
                        // Should not have spaces
        let errors = {};
        let emailVal = '';
        let validEmail = '';
        let phoneVal = '';
        let usernme = '';
        ['email', 'username', 'phone']

            .forEach((name) => {
                let value = this[name].value();

                if (!value) {
                    errors[name] = 'Should not be empty';
                }
                if('username' === name)
                {
                    usernme = this[name].value();
                }
                else {
                    if ('email' === name) {
                        emailVal = this[name].value();

                        let emailValidate = validator.validate(emailVal);
                        if (emailValidate) {
                            validEmail = emailVal;

                        }
                        else {
                            errors[name] = 'Invalid email-id';
                            console.log(" email Not valid")
                        }
                    }
                    else if ('phone' === name && value.length != 10) {
                    errors[name] = 'Must contain 10 digit only';
                    }
                    else {
                        phoneVal = this[name].value();
                        if (validEmail != '' && phoneVal != '') {
                            console.log('valid')
                            let data= {
                                'name' : usernme,
                                'email' : validEmail,
                                'phone' : phoneVal,
                                'address' : this.state.address,
                                'locationlat' : this.state.currentLatitude,
                                'locationLong' : this.state.currentLongitude
                            }
                         this.fetchLoginAPI(data)
                        }
                    }
                  

                }
            });
        this.setState({ errors });
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    renderPasswordAccessory() {
        let { secureTextEntry } = this.state;

        let name = secureTextEntry ?
            'visibility' :
            'visibility-off';

        return (
            <MaterialIcon
                size={24}
                name={name}
                color='#B7CDC1'
                onPress={this.onAccessoryPress}
                suppressHighlighting={true}
            />
        );
    }



    render() {
        let { errors = {}, secureTextEntry } = this.state;
        return (

            <View >


                <View style={{ width: wp('80%'), }}>
                    <TextField
                        ref={this.nameRef}
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitName}
                        returnKeyType='next'
                        label='Name'
                        error={errors.username}
                        baseColor='rgba(255, 255, 255, .90)'
                        lineWidth={2}
                        textColor='rgba(255,255,255,1)'
                        fontSize={18}
                    />

                    <TextField
                        ref={this.emailRef}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitEmail}
                        returnKeyType='next'
                        label='Email Address'
                        error={errors.email}
                        baseColor='rgba(255, 255, 255, .90)'
                        lineWidth={2}
                        textColor='rgba(255,255,255,1)'
                        fontSize={18}
                    />

                    <TextField
                        ref={this.phoneRef}
                        keyboardType='phone-pad'
                        autoCapitalize='none'
                        autoCorrect={false}
                        enablesReturnKeyAutomatically={true}
                        onFocus={this.onFocus}
                        onChangeText={this.onChangeText}
                        onSubmitEditing={this.onSubmitPhone}
                        returnKeyType='next'
                        label='Phone no'
                        error={errors.phone}
                        baseColor='rgba(255, 255, 255, .90)'
                        lineWidth={2}
                        textColor='rgba(255,255,255,1)'
                        fontSize={18}
                    />


                    <TextField

                        enablesReturnKeyAutomatically={true}
                        value={this.state.address}
                        clearTextOnFocus={true}
                        onChange={this.onClicked}
                        //onSubmitEditing={this.onClicked}
                        returnKeyType='done'
                        //label='Address'
                        maxLength={30}
                        baseColor='rgba(255, 255, 255, .90)'
                        lineWidth={0}
                        textColor='rgba(255,255,255,1)'
                        fontSize={18}
                    />




                    <TouchableOpacity
                        onPress={() => this.onClicked()}
                        style={{ width: wp('80%'), borderBottomWidth: 2, borderBottomColor: '#fff',marginTop:hp('-5%') }}
                    >
                        {this.state.check ?<Text style={{ fontSize:18,color:'#fff'}}>{this.state.address}</Text>:
                        <Text style={{ fontSize:18,color:'#fff',marginBottom:hp('1%')}}>Address</Text>}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.getlocation()}
                        style={{ width: wp('80%'), borderBottomWidth: 2, borderBottomColor: '#fff',marginTop:hp('5%') }}
                    >
                        {this.state.locationchk ?<Text style={{ fontSize:18,color:'#fff'}}>{this.state.currentLatitude}  {this.state.currentLongitude}</Text>:
                        <Text style={{ fontSize:18,color:'#fff',marginBottom:hp('1%')}}>Location</Text>}
                    </TouchableOpacity>

                </View>

                <TouchableHighlight
                style={{width:wp('80%'),padding:wp('3%'),backgroundColor:'green',marginTop:hp('3%')}}
                    onPress={this.onSubmit}
                    titleColor='white'>
                    <Text style={{color:'#fff',alignSelf:'center',fontSize:hp('2%')}}>Login</Text>
                </TouchableHighlight>



            </View>






        )
    }
}

