import React from 'react';
import {Button, FormGroup, Label, Input, FormText} from 'reactstrap';



/**
 * Komponenta AddField
 *
 * Políčko pro přidávání s inputem a buttonem
 * ---
 * Validace s fieldem, feedbackem, formGroupem, bootstrap tlačítkem
 */
export default class AddField extends React.Component {
    static propTypes = {
        onCreate: React.PropTypes.func.isRequired
    };

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
