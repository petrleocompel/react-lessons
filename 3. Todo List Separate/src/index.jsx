import React from 'react';
import {render} from 'react-dom';

/**
 * Komponenta Item
 *
 * Jedna položka v listu s checkboxem a tlačítkem pro smazání
 * ---
 * Při kliku na delete nebo na checkbox zavolá metodu z props
 * Z props také získává stav checkboxu a text
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

        return <li>
            <input type="checkbox" checked={done} onClick={onToggleState}/> {text} <button onClick={onDelete}>delete</button>
        </li>
    }

}


/**
 * Komponenta AddField
 *
 * Políčko pro přidávání s inputem a buttonem
 * ---
 * Zavoláš vyšší komponentu funkcí z props (onCreate) a předá jí hodnotu z fieldu
 */
class AddField extends React.Component{
    static propTypes = {
        onCreate: React.PropTypes.func.isRequired
    };

    state = {
        value: ""
    };

    handleCreate = () => {
        this.props.onCreate(this.state.value);
        this.setState({value: ""});
    };

    render = () => {
        const {value} = this.state;
        return <div>
            <input type="text" onChange={(e) => this.setState({value:e.target.value})} value={value} /> <button onClick={this.handleCreate}>Vytvor</button>
        </div>
    }
}

/**
 * Komponenta TodoList
 *
 * Obsahuje list a renderuje podkomponenty
 * ---
 *
 * List renderujeme mapou pole, z kterého vznikne pole komponent Item
 * - předáváme jejich props a to data + funkce
 *
 * Renderujeme také AddField a předáme mu funkci, která zajistí přidání
 */
class TodoList extends React.Component {
    state = {
        list: [],
    };

    handleCreate = (value) => {
        const {list} = this.state;
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
        const {list} = this.state;
        return <div>
            {list.map((item, index) => <Item
                key={index}
                done={item.done}
                text={item.text}
                onToggleState={this.handleToggleState.bind(this, index)}
                onDelete={this.handleDelete.bind(this, index)} />)}
            <AddField onCreate={this.handleCreate} />
        </div>
    };
}


render(<TodoList />, document.getElementById("root"));
