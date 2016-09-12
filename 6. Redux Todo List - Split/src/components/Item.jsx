import React from 'react';
import {ListGroupItem, Button, Checkbox, Glyphicon} from 'react-bootstrap';

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
            <Checkbox checked={done} onClick={onToggleState}>
                {text} <Button bsStyle="danger" onClick={onDelete}><Glyphicon glyph="trash" /> Delete</Button>
            </Checkbox>
        </ListGroupItem>
    }
}
