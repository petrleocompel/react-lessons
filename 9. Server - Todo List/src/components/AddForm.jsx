import React from 'react';
import {Button} from 'react-bootstrap';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import BootstrapField from "./BootstrapField";
import JsonFetch from '../utils/JsonFetch'

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
        console.log('b');
        console.log('aa ', JsonFetch.post('http://react./api/todo/create', data));
        return JsonFetch.post('http://react./api/todo/create', data).then((response) => {
            console.log(response);
            if(respone.ok) {
                return response.json();
            }

        }).then((serverData) => {
            console.log(serverData);
            this.props.onSubmit(serverData);
            this.props.reset();
        }).catch(e => {
            console.log(e)
            throw new SubmissionError({_error: 'Nastala chyba při zpracování.'});
        });
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
