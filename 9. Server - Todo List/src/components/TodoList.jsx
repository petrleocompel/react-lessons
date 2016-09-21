import React from 'react';
import {connect} from 'react-redux'
import {ListGroup} from 'react-bootstrap';

import Item from './Item'
import AddForm from './AddForm'
import JsonFetch from "../utils/JsonFetch";


const actions = {
    ITEM_CREATE:"ITEM_CREATE",
    ITEM_DELETE:"ITEM_DELETE",
    ITEM_TOGGLE:"ITEM_TOGGLE",
    LIST_RECEIVE:"LIST_RECEIVE"
};

/**
 * Komponenta TodoList
 *
 * - dotazuje se na server pro data a posílá změny
 * - container
 */
const TodoList = class TodoList extends React.Component {

    /**
     * Při "mountu" componenty načteme list aktuálních položek
     */
    componentDidMount = () => {
        JsonFetch.post(window.BASE_URL + '/api/todo/list', {}).then((response) => {
            if(response.ok) {
                return response.json();
            }
        }).then((data) => {
            const {list} = data;
            this.props.dispatch({type: actions.LIST_RECEIVE, list})
        }).catch(e => {
            alert("Nastala chyba při načtení listu.");
        });
    };

    /**
     * Po odeslání AddForm se tato metoda spustí, odešleme do uložení do store
     * @param object
     */
    handleCreate = (object) => {
        this.props.dispatch({type: actions.ITEM_CREATE, object})
    };

    /**
     * Metoda pro smazání položky
     *
     * - odešle požadavek ke smazání na server
     * - po provedení smaže položku ze store
     *
     * @param id
     * @returns {*}
     */
    handleDelete = (id) => {
        return JsonFetch.post(window.BASE_URL + '/api/todo/delete', {id}).then((response) => {
            if(response.ok) {
                return response.json();
            }
        }).then(() => {
            this.props.dispatch({type: actions.ITEM_DELETE, id})
        }).catch(e => {
            alert("Nastala chyba při smazání.");
        });
    };

    /**
     * Změní stav položky
     *
     * - pošle požadavek na server ke změně položky
     * - po provedení na serveru aktualizuje náš seznam ve store
     *
     * @param id
     * @returns {*}
     */
    handleToggleState = (id) => {
        return JsonFetch.post(window.BASE_URL + '/api/todo/toggle-state', {id}).then((response) => {
            if(response.ok) {
                return response.json();
            }
        }).then(() => {
            this.props.dispatch({type: actions.ITEM_TOGGLE, id})
        }).catch(e => {
            console.error(e);
            alert("Nastala chyba při změně stavu.");
        });
    };

    render = () => {
        const {list} = this.props;
        return <div>
            <ListGroup>
                {list.map((item,index) => <Item
                    key={item.id}
                    done={item.done}
                    text={item.text}
                    onToggleState={this.handleToggleState.bind(this, item.id)}
                    onDelete={this.handleDelete.bind(this, item.id)} />)}
            </ListGroup>
            <AddForm onSubmit={this.handleCreate} />
        </div>
    };
};

export default connect((state) => ({list:state.todo.list}))(TodoList);
