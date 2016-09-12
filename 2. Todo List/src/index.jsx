import React from 'react';
import {render} from 'react-dom';

/**
 * Componenta TodoList
 * - s kompletní logikou
 * - listem
 * - přidávacím polem
 * - vlastním ukládáním dat
 */
class TodoList extends React.Component {
    state = {
        value: "",
        list: [],
    };

    handleCreate = () => {
        const {list, value} = this.state;
        this.setState({
            value: "",
            list:[
                ...list,
                {
                    text: value,
                    done: false
                }
            ]
        });
    };

    handleDelete = (index) => {
        const {list} = this.state;
        this.setState({
            list:[
                ...list.slice(0, index),
                ...list.slice(index+1),
            ]
        });
    };

    handleToggleState = (index) => {
        const {list} = this.state;
        this.setState({
            list:[
                ...list.slice(0, index),
                {
                    ...list[index],
                    done: !list[index].done
                },
                ...list.slice(index+1)
            ]
        });
    };

    render = () => {
        const {list, value} = this.state;
        return <div>
            <ul>
                {list.map((item,index) => <li key={index}>
                    <input type="checkbox" checked={item.done} onClick={() => this.handleToggleState(index)}/> {item.text} <button onClick={() => this.handleDelete(index)}>Smazat</button>
                </li>)}
            </ul>
            <input type="text" onChange={(e) => this.setState({value:e.target.value})} value={value} /> <button onClick={this.handleCreate}>Vytvoř</button>
        </div>
    }
}


render(<TodoList />, document.getElementById("root"));
