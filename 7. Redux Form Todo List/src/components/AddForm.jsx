import React from 'react';
import {Button} from 'react-bootstrap';
import {Field, reduxForm} from 'redux-form';
import BootstrapField from "./BootstrapField";

/**
 * Komponenta AddForm
 *
 * Formulář pro přidávání  - input a button
 * ---
 * Validace, normalizace, custom submit a reset
 */
class AddForm extends React.Component  {

    static formName = "addForm";

    static propTypes = {
        onSubmit: React.PropTypes.func.isRequired
    };

    static validation = (data) => {
        const errors = {};

        if (!data.text) {
            errors.text = "Nutno vyplnit";
        }

        return errors;
    };

    customSubmit = (data) => {
        this.props.onSubmit(data);
        this.props.reset();
    };

    noDoubleSpace = (value) => {
        while(value.indexOf("  ") > -1) {
            value = value.replace("  ", " ");
        }
        return value;
    };

    render = () => {
        const {handleSubmit, pristine, submitting} = this.props;
        return <form onSubmit={handleSubmit(this.customSubmit)}>
            <Field component={BootstrapField} name="text" label="Text" type="text" normalize={this.noDoubleSpace} />
            <Button type="submit" bsSize="small" bsStyle="success" disabled={pristine || submitting}>Vytvoř</Button>
        </form>
    }
}

AddForm = reduxForm({
    form: AddForm.formName, // unikátní jméno formuláře
    validation: AddForm.validation,
})(AddForm);

export default AddForm;
