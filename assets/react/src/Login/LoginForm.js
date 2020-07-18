import React from 'react';
import {withTranslation} from 'react-i18next';
import {withRouter} from 'react-router-dom';
import {backendUrl} from '../globals';
import Cookies from 'js-cookie';

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.id]: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);

    try {
      const res = await fetch(backendUrl + '/login_check', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (res.status == 204) {
        Cookies.set('loggedIn', true);
        this.redirectToAccount();
      } else {
        this.setState({errors: [this.props.t('common:login.errorInvalidCredentials')],});
      }

    } catch (e) {
      this.setState({
        errors: [this.props.t('common:login.errorNetwork')],
      });
    }
  }

  redirectToAccount() {
    this.props.history.push('/account');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul className="formErrors">
          {this.state.errors.map((value, index) => {
            return <li key={index}>{value}</li>;
          })}
        </ul>
        <div id="login_form">
          <div className="field">
            <label htmlFor="email"
                   className="required">
              {this.props.t('common:login.email')}
            </label>
            <input type="email"
                   id="email"
                   required="required"
                   value={this.state.email}
                   onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="login_form_password"
                   className="required">
              {this.props.t('common:login.password')}
            </label>
            <input type="password"
                   id="password"
                   value={this.state.password}
                   onChange={this.handleChange}
                   required="required"
                   minLength={6}
                   maxLength={4096}
            />
          </div>
          <div>
            <ul className="actions">
              <li>
                <button type="submit" className="alt">
                  {this.props.t('common:login.login')}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </form>
    );
  }
};

export default withTranslation()(withRouter(LoginForm));
