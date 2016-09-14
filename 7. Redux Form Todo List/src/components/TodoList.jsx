import React from 'react';
import {connect} from 'react-redux'
import {ListGroup} from 'react-bootstrap';

import Item from './Item'
import AddForm from './AddForm'


const actions = {
    ITEM_CREATE:"ITEM_CREATE",
    ITEM_DELETE:"ITEM_DELETE",
    ITEM_TOGGLE:"ITEM_TOGGLE"
};

/**
 * Komponenta TodoList
 *
 * Obsahuje list a renderuje podkomponenty
 * ---
 *
 * Místo this.state.list používáme this.props.list
 *
 * --
 *
 * Pro propojení se storem musíme uložit do konstanty a poté exportovat se spuštěnou funkcí connect
 */
const TodoList = class TodoList extends React.Component {

    handleCreate = (data) => {
        this.props.dispatch({type: actions.ITEM_CREATE, value: data.text})
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
            <AddForm onSubmit={this.handleCreate} />
        </div>
    };
};

export default connect((state) => ({list:state.todo.list}))(TodoList);
