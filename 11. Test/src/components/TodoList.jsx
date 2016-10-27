import React from 'react';
import {Button, ListGroup} from 'react-bootstrap';
import BootstrapField from './BootstrapField'


const writeRes = [
  "() => {}",
  "() => 'a'",
  "() => {'a'}",
  "() => (['a'])",
  "() => ({0:['a']})",
  "() => () => {}",
];

class TodoList extends React.Component {

    state = {
        write: [],
        func: [],
        resp: [],
        validate:false,
        showResult:false
    };

    setValue = (event, index, list) => {
        this.setState({
            [list]: [
                ...this.state[list].slice(0, index),
                event.target.value,
                ...this.state[list].slice(index+1),
            ]
        })
    };

    dump = (e) => {
        const n =  JSON.stringify(e);
        return n ? n : e;
    };

    validate = (showResult = false) => {
        this.setState({validate:true, showResult})
    };

    render = () => {
        const {validate, showResult, write} = this.state;
        return <div>
            <h1>Výsledné hodnoty zapisujte jako datové typy nebo vrácené type (json)</h1>
            <p>Výsledné hodnoty zapisujte jako datové typy nebo vrácené type (json)</p>
            {writeRes.map((i,index) => {
                const res = eval(i)();
                const q = typeof res;
                let n = write[index];
                if (!n) {
                    n = null;
                }
                const dump = this.dump(res);
                const error = n !== res && n !== q && n !== dump ? (showResult ? "Výsledek je " + q + " nebo " + dump : true) : false;
                return <div>
                    <pre>({i})()</pre>
                    <BootstrapField onChange={(e) => this.setValue(e, index, 'write')} meta={{touched: validate, error}} input={{value:write[index]}} />
                </div>
            })}
            <Button bsStyle="warning" onClick={this.validate}>Check</Button>
            <Button bsStyle="danger" onClick={() => {this.validate(true)}}>Show result</Button>
        </div>
    };
}

export default TodoList;
