import React from 'react';
import {ListGroupItem, Button, Input} from 'reactstrap';

export default class Item extends React.Component {
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
