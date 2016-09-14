import React from 'react';
import {connect} from 'react-redux'
import {Row, Col, Nav, NavItem} from 'react-bootstrap';

import AddForm from './AddForm'
import Note from './Note'


const actions = {
    NOTE_CREATE:"NOTE_CREATE",
    NOTE_SELECT:"NOTE_SELECT",
    NOTE_CLEAR:"NOTE_CLEAR",
    NOTE_DELETE:"NOTE_DELETE"
};

class Notes extends React.Component {

    handleCreate = (data) => {
        this.props.dispatch({type: actions.NOTE_CREATE, data})
    };

    handleSelect = (index) => {
        this.props.dispatch({type: actions.NOTE_SELECT, index})
    };

    handleClear = () => {
        this.props.dispatch({type: actions.NOTE_CLEAR})
    };

    handleDelete = (index) => {
        this.props.dispatch({type: actions.NOTE_DELETE, index})
    };

    render = () => {
        const {list, actualIndex} = this.props;
        const note = list[actualIndex];
        return <Row>
            <Col xs={4}>
                <Nav bsStyle="pills" stacked activeKey={actualIndex} onSelect={this.handleSelect}>
                    {list.map((item,index) => <NavItem key={index} eventKey={index}>{item.title}</NavItem>)}
                </Nav>
            </Col>
            <Col xs={8}>
                {note !== null ?
                    <Note {...note} onClose={this.handleClear} onDelete={this.handleDelete.bind(this, actualIndex)} />
                    : <AddForm onSubmit={this.handleCreate} />}
            </Col>
        </Row>
    };
};

export default connect((state) => {
    const {notes:{list, actualIndex}} = state;
    return {
        list,
        actualIndex
    }
})(Notes);
