import React from 'react';
import {Button, FormGroup, Label, Input, FormText, FormFeedback} from 'reactstrap';

/**
 * Komponenta BootstrapField
 *
 * Input s errorem, feedbackem atd..
 */
export default class BootstrapField extends React.Component  {
    getValidationState = (touched, error, value) => {
        if (touched) {
            return error || value.length < 1 ? 'error' : 'success';
        }

        return null;
    };

    render = () => {
        const {input, label, meta: {touched, error }, ...otherProps} = this.props;
        return <FormGroup validationState={this.getValidationState(touched, error, input.value)}>
            <Label>{label}</Label>
            <Input
                {...input}
                {...otherProps}
            />
            <FormFeedback />
            {error && <FormText>{error}</FormText>}
        </FormGroup>
    }
}
