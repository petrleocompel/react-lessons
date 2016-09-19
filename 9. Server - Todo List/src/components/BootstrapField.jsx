import React from 'react';
import {Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

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
            <ControlLabel>{label}</ControlLabel>
            <FormControl
                {...input}
                {...otherProps}
            />
            <FormControl.Feedback />
            {error && <HelpBlock>{error}</HelpBlock>}
        </FormGroup>
    }
}
