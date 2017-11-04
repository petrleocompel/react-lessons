import React from 'react';
import {connect} from 'react-redux'
import {ListGroup} from 'reactstrap';

import Item from './Item'
import AddForm from './AddForm'
import JsonFetch from "../utils/JsonFetch";


const actions = {
    ITEM_CREATE:"ITEM_CREATE",
    ITEM_DELETE:"ITEM_DELETE",
    ITEM_TOGGLE:"ITEM_TOGGLE",
    LIST_RECEIVE:"LIST_RECEIVE",
    LIST_RECEIVE_REFRESH:"LIST_RECEIVE_REFRESH"
};

/**
 * Komponenta TodoList
 *
 * - dotazuje se na server pro data a posílá změny
 * - container
 */
const TodoList = class TodoList extends React.Component {

    interval = null;

    state = {
        isFetched: false,
        last_update: null
    };

    /**
     * Při "mountu" componenty načteme list aktuálních položek
     */
    componentDidMount = () => {
        this.fetchData();
        this.interval = setInterval(this.handleRefresh, 5000);
    };

    fetchData = () => {
        JsonFetch.post(window.BASE_URL + '/api/todo/list', {}).then((response) => {
            if(response.ok) {
                return response.json();
            }
        }).then((data) => {
            const {list, last_update} = data;
            this.props.dispatch({type: actions.LIST_RECEIVE, list});
            this.setState({isFetched: true, last_update});
        }).catch(e => {
            console.log(e);
            clearInterval(this.interval);
            alert("Nastala chyba při načtení listu.");
        });
    };

    compoentWillUnmount = () => {
        if (this.interval !== null) {
            clearInterval(this.interval);
        }
    };

    handleRefresh = () => {
        const {last_update} = this.state;
        JsonFetch.post(window.BASE_URL + '/api/todo/refresh', {last_update}).then((response) => {
            if(response.ok) {
                return response.json();
            }
        }).then((data) => {
            const {newItems, last_update} = data;
            /*const {newItems, last_update} = data;
            this.props.dispatch({type: actions.LIST_RECEIVE_REFRESH, newItems});
            this.setState({isFetched: true, last_update});*/
            if (newItems.length) {
                this.fetchData();
            }
            this.setState({last_update});
        }).catch(e => {
            console.log(e);
            alert("Nastala chyba při načtení listu.");
            clearInterval(this.interval);
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
            console.log(e);
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
        if (!this.state.isFetched) {
            return <div>Loading ...</div>
        }
        return <div>
            <ListGroup>
                {list.map((item,index) => <Item
                    key={item.id}
                    done={parseInt(item.done) === 1}
                    text={item.text}
                    onToggleState={this.handleToggleState.bind(this, item.id)}
                    onDelete={this.handleDelete.bind(this, item.id)} />)}
            </ListGroup>
            <AddForm onSubmit={this.handleCreate} />
        </div>
    };
};

export default connect((state) => ({list:state.todo.list}))(TodoList);
