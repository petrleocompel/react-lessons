import React from 'react';
import {render} from 'react-dom';
import {ListGroup, ListGroupItem, Button, FormGroup, Label, Input, FormFeedback, FormText} from 'reactstrap';

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
 * Nové Bootstrap komponenty
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
        const {list, value} = this.state;
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


render(<TodoList />, document.getElementById("root"));
