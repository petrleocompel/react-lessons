import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import notes from './notes'


export default combineReducers({
    notes,
    form
});
