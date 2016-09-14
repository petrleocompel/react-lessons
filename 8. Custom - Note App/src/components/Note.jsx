import React from 'react';
import {ListGroupItem, Panel, Button, Checkbox, Glyphicon} from 'react-bootstrap';

export default class Note extends React.Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
        onClose: React.PropTypes.func.isRequired,
        onDelete: React.PropTypes.func.isRequired,
    };

    render = () => {
        const {text, title, onClose, onDelete} = this.props;

        return <Panel>
            <Button bsStyle="warning" onClick={onClose}><Glyphicon glyph="close" /> zavřít</Button>
            <Button bsStyle="danger" onClick={onDelete}><Glyphicon glyph="trash" /> Smazat</Button>
            <h1>{title}</h1>
            <p>{text}</p>
        </Panel>
    }
}
