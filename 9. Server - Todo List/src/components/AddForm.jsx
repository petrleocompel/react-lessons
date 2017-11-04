import React from 'react';
import {Button} from 'reactstrap';
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

    /**
     * Submit metoda
     *
     * - odešle data na server
     * - odpověď převede na json
     * - z odpověď předá metodě onSubmit z props
     * - resetne formulář
     *
     * @param data
     * @returns {*}
     */
    customSubmit = (data) => {
        return JsonFetch.post(window.BASE_URL + '/api/todo/create', data).then((response) => {
            if(response.ok) {
                return response.json();
            }
        }).then((serverData) => {
            this.props.onSubmit(serverData.object);
            this.props.reset();
        }).catch(e => {
            console.error(e);
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
            <Button type="submit" size="sm" color="success" disabled={pristine || submitting}>Vytvoř</Button>
        </form>
    }
}

AddForm = reduxForm({
    form: AddForm.formName, // unikátní jméno formuláře
    validation: AddForm.validation,
})(AddForm);

export default AddForm;
