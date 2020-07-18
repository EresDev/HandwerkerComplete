import React from 'react';
import {withTranslation} from 'react-i18next';
import {backendUrl} from '../globals';

export class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm_password: '',
      errors: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const field = event.target;

    this.setState(
      {[field.name]: field.value},
      () => {
        if (field.name == 'confirm_password') {
          this.validatePassword(field);
        }
      }
    );
  }

  validatePassword(field) {
    if (this.state.password !== this.state.confirm_password) {
      field.setCustomValidity(this.props.t('common:register.errorConfirmPassword'));
    } else {
      field.setCustomValidity('');
    }
  }

  async handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);

    try {
      const res = await fetch(backendUrl + '/user', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      if (res.status == 201) {
        alert(this.props.t('common:register.successMessage'));
        this.setState({
          email: '',
          password: '',
          confirm_password: '',
        });
      } else {
        const resBody = await res.json();
        if (resBody.status == 'fail') {
          await this.setState({
            errors: [JSON.stringify(resBody.data)],
          });
        }
      }
    } catch (e) {
      this.setState({
        errors: [this.props.t('common:register.errorNetwork')],
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="register">
        <ul className="formErrors">
          {this.state.errors.map((value, index) => {
            return <li key={index}>{value}</li>;
          })}
        </ul>
        <div id="register_form">
          <div className="field">
            <label htmlFor="email" className="required">
              {this.props.t('common:register.email')}
            </label>
            <input type="email" name="email" required="required"
                   value={this.state.email}
                   onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="password"
                   className="required">
              {this.props.t('common:register.password')}
            </label><input
            type='password' name="password"
            required="required" minLength={6} maxLength={4096}
            value={this.state.password}
            onChange={this.handleChange}
          />
          </div>
          <div className="field"><label htmlFor="confirm_password"
                                        className="required">
            {this.props.t('common:register.confirmPassword')}
          </label><input
            type="password" name="confirm_password"
            required="required" minLength={6}
            maxLength={4096}
            value={this.state.confirm_password}
            onChange={this.handleChange}
          /></div>
          <div>
            <ul className="actions">
              <li>
                <button type="submit" className="alt">
                  {this.props.t('common:register.register')}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </form>
    );
  }
}

export default withTranslation()(RegisterForm);
