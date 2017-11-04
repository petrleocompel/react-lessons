import React from 'react';
import {render} from 'react-dom';
import {ListGroup, ListGroupItem, Button, FormGroup, Label, Input, FormFeedback, FormText} from 'reactstrap';
import {connect} from 'react-redux'


const actions = {
    ITEM_CREATE:"ITEM_CREATE",
    ITEM_DELETE:"ITEM_DELETE",
    ITEM_TOGGLE:"ITEM_TOGGLE"
};

/**
 * Komponenta Item
 *
 * Jedna položka v listu s checkboxem a tlačítkem pro smazání
 * ---
 *
 * Bootstrap kopomenty
 * - ListGroupItem
 * - Checkbox
 * - Boostrap Button
 */
class Item extends React.Component {
    static propTypes = {
        text: React.PropTypes.string.isRequired,
        done: React.PropTypes.bool.isRequired,
        onToggleState: React.PropTypes.func.isRequired,
        onDelete: React.PropTypes.func.isRequired
    };

    render = () => {
        const {text, done, onToggleState, onDelete} = this.props;

        return <ListGroupItem>
            <Input type="checkbox" checked={done} onClick={onToggleState} /> {text} <Button color="danger" onClick={onDelete}>Delete</Button>
        </ListGroupItem>
    }

}

/**
 * Komponenta AddField
 *
 * Políčko pro přidávání s inputem a buttonem
 * ---
 * Validace s fieldem, feedbackem, formGroupem, bootstrap tlačítkem
 */
class AddField extends React.Component {
    static propTypes = {
        onCreate: React.PropTypes.func.isRequired
    }

    state = {
        value: "",
        touched: false,
    };

    handleCreate = () => {
        this.props.onCreate(this.state.value);
        this.setState({value:"", touched:false});
    };

    getValidationState = () => {
        if (this.state.touched) {
            return this.state.value.length > 0 ? 'success' : 'error';
        }
    };

    handleChange = (e) => this.setState({value:e.target.value});
    handleBlur = (e) => this.setState({touched:true});
    handleKeyUp = (e) => {
        if (e.keyCode == 13) {
            this.handleCreate();
        }
    };

    render = () => {
        const {value} = this.state;
        return <div>
            <FormGroup
                controlId="field-pridani"
                validationState={this.getValidationState()}
            >
                <Label>Text</Label>
                <Input
                    type="text"
                    value={value}
                    placeholder="Vložte text"
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyUp}
                />
                <FormFeedback />
                <FormText>Vyplňte políčko pro přidání.</FormText>
            </FormGroup>
            <Button size="sm" color="success" onClick={this.handleCreate}>Vytvoř</Button>
        </div>
    }
}

/**
 * Komponenta TodoList
 *
 * Obsahuje list a renderuje podkomponenty
 * ---
 *
 * Místo this.state.list používáme this.props.list
 */
let TodoList = class TodoListOrig extends React.Component {

    handleCreate = (value) => {
        this.props.dispatch({type: actions.ITEM_CREATE, value})
    };

    handleDelete = (index) => {
        this.props.dispatch({type: actions.ITEM_DELETE, index})
    };

    handleToggleState = (index) => {
        this.props.dispatch({type: actions.ITEM_TOGGLE, index})
    };

    render = () => {
        const {list} = this.props;
        return <div>
            <ListGroup>
                {list.map((item,index) => <Item
                    key={index}
                    done={item.done}
                    text={item.text}
                    onToggleState={this.handleToggleState.bind(this, index)}
                    onDelete={this.handleDelete.bind(this, index)} />)}
            </ListGroup>
            <AddField onCreate={this.handleCreate} />
        </div>
    };
}
/**
 * napojení store na komponentu do this.props.list napojíme state.todoStore.list
 */
TodoList = connect((state) => ({list:state.todoStore.list}))(TodoList)


/**
 * Debug nástroje fungují po stisku ctrl+h a posunouse pomocí ctrl+q
 */

import {createDevTools} from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import FilterableLogMonitor from 'redux-devtools-filterable-log-monitor'
import FilterMonitor from 'redux-devtools-filter-actions';

const DevTools = createDevTools(<DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultIsVisible={false}>
    <FilterMonitor
        blacklist={['EVENT_SOURCE_RECEIVE']}>
        <FilterableLogMonitor />
    </FilterMonitor >
</DockMonitor>);

import {Provider} from 'react-redux'

/**
 * Provider storu pro ostatní komponenty a rendering hlavních komponent
 */
class Root extends React.Component {

    static PropTypes = {
        store: React.PropTypes.object.isRequired
    };

    render() {
        const {store} = this.props;
        return (
            <Provider store={store} key="provider">
                <div>
                    <TodoList/>
                    <DevTools key="devtools"/>
                </div>
            </Provider>
        )
    }
}

/** konfigurace storu */
import {createStore, applyMiddleware, compose} from 'redux'
// middleware
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import {createLogger} from 'redux-logger'

import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'

const enforceImmutableMiddleware = reduxImmutableStateInvariant();

const loggerMiddleware = createLogger({
        level: 'info',
        collapsed: true,
        predicate: (getState, action) => (action.type !== 'EVENT_SOURCE_RECEIVE')
    });

let createStoreWithMiddleware;


const {persistState} = require('redux-devtools');
createStoreWithMiddleware = compose(
    applyMiddleware(
        enforceImmutableMiddleware,
        thunkMiddleware,
        promiseMiddleware,
        loggerMiddleware
    ),
    DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

import {combineReducers} from 'redux'

/** init state našeho malého storu **/
const initialState = {
    list: [],
};

function todoStore(state = initialState, action = {}) {
    switch (action.type) {
        case actions.ITEM_CREATE:
            return {
                list:[
                    ...state.list,
                    {
                        text: action.value,
                        done: false
                    }
                ]
            };
        case actions.ITEM_TOGGLE: {
            const {list} = state;
            return {
                list:[
                    ...list.slice(0, action.index),
                    {
                        ...list[action.index],
                        done: !list[action.index].done
                    },
                    ...list.slice(action.index+1)
                ]
            };
        }
        case actions.ITEM_DELETE:
            return {
                list:[
                    ...state.list.slice(0, action.index),
                    ...state.list.slice(action.index+1),
                ]
            };
        default:
            return state
    }
}
/** initializace storu */
const rootReducer = combineReducers({todoStore});
const store = createStoreWithMiddleware(rootReducer);

/** spuštění app se storem */
render(<Root store={store} />, document.getElementById("root"));
