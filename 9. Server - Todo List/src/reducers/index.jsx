/**
 * Root reducer
 */
import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import todo from './todo'


export default combineReducers({
    todo,
    form
});
