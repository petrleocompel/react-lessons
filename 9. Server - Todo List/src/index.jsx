/**
 * Opět různé konfigurace - root komponenta a devtools atd...
 */
import React from 'react';
import {render} from 'react-dom';
import TodoList from './components/TodoList'

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

/* global __DEVTOOLS__ */
import {createStore, applyMiddleware, compose} from 'redux'
// middleware
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import createLogger from 'redux-logger'

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

import rootReducer from './reducers'
const store = createStoreWithMiddleware(rootReducer);

render(<Root store={store} />, document.getElementById("root"));
