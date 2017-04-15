import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';
class Signup extends Component {
    handleFormSubmit(formProps) {
        this.props.signupUser(formProps);
    }
    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger">
                    <strong>Error:</strong>{this.props.errorMessage}
                </div>
            )
        }
    }
    render() {
        const { handleSubmit, fields: { email, password, passwordConfirm } } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <fieldset className="form-group">
                        <label>Email:</label>
                        <input {...email} className="form-control" />
                        {email.touched && email.error && <div className="error">{email.error}</div>}
                        
                    </fieldset>

                    <fieldset className="form-group">
                        <label>Password:</label>
                        <input {...password} type="password" className="form-control" />
                        {password.touched && password.error && <div className="error">{password.error}</div>}
                    </fieldset>
                    <fieldset className="form-group">
                        <label>Confirm Password:</label>
                        <input {...passwordConfirm} type="password" className="form-control" />
                        {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
                        
                    </fieldset>
                    {this.renderAlert()}
                    <button action="submit" className="btn btn-primary">Sign Up </button>
                </form>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return { errorMessage: state.auth.error }
}
function validate(formProps) {
    var errors = {};

    if (!formProps.email) {
        errors.email = "Please Enter Email";
    }
    if (!formProps.password) {
        errors.password = "Please Enter Password";
    }

    if (!formProps.passwordConfirm) {
        errors.passwordConfirm = "Please Enter Confirm Password";
    }
    if (formProps.password != formProps.passwordConfirm) {
        errors.password = "Password must match";
    }
    return errors;
}
function mapStateToProps(state){
    return {errorMessage:state.auth.error}
}
export default reduxForm({
    form: 'signup',
    fields: ['email', 'password', 'passwordConfirm'],
    validate
}, mapStateToProps, actions)(Signup)