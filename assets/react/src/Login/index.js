import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import {withTranslation} from 'react-i18next';

class Login extends React.Component {
  render() {
    return (
      <section id="two" className="background">
        <div className="inner">
          <article>
            <div className="content">
              <header>
                <h3>{this.props.t("common:login.login")}</h3>
              </header>
              <LoginForm/>
            </div>
          </article>
          <article className="alt">
            <div className="content">
              <header>
                <h3>{this.props.t("common:register.register")}</h3>
              </header>
              <RegisterForm/>
            </div>
          </article>
        </div>
      </section>
    );
  }
}

export default withTranslation()(Login);