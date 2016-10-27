/**
 * Opět různé konfigurace - root komponenta, devtools atd...
 */
import React from 'react';
import {render} from 'react-dom';
import TodoList from './components/TodoList'



class Root extends React.Component {

    render() {
        return <TodoList/>
    }
}


render(<Root />, document.getElementById("root"));
