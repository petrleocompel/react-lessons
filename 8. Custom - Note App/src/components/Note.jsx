import React from 'react';
import {ListGroupItem, Panel, Button, Checkbox} from 'reactstrap';

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
            <Button color="warning" onClick={onClose}>Zavřít</Button>
            <Button color="danger" onClick={onDelete}>Smazat</Button>
            <h1>{title}</h1>
            <p>{text}</p>
        </Panel>
    }
}
