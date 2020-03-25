import { db } from '../config/db';
import {ListItem} from '../components/ListItem'
import { Actions } from 'react-native-router-flux';
export const addItem =  (item) => {
    console.log(item)
    db.ref('/employees').push(item).then(() => {
        console.log('INSERTED !');
        Actions.item()

    }).catch((error) => {
        console.log(error);
    });

}