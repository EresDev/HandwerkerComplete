import React from 'react';
import {Link} from 'react-router-dom';
import i18n from 'i18next';
import {initReactI18next, withTranslation} from 'react-i18next';
import Security from '../Util/Security';

export class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.switchLocale = this.switchLocale.bind(this);
    this.logout = this.logout.bind(this);
    const locale = localStorage.getItem('locale') || 'en';
    this.state = {
      locale: locale,
    };

    this.switchLocaleTo(locale);

    this.security = new Security();
  }

  switchLocale() {
    const currentLocale = this.state.locale;
    const toggledLocale = this.toggleLocale(currentLocale);
    this.setState({locale: toggledLocale});
    this.switchLocaleTo(toggledLocale);

    localStorage.setItem('locale', toggledLocale);
  }

  toggleLocale(locale) {
    return locale === 'en' || locale === null ? 'de' : 'en';
  }

  switchLocaleTo(locale) {
    i18n
      .use(initReactI18next) // passes i18n down to react-i18next
      .init({lng: locale});
  }

  logout() {
    this.security.unauthenticate();
  }

  render() {
    return (
      <React.Fragment>
        <header id="header">
          <div className="inner">
            <Link to="/" className="logo">Handwerker</Link>
            <nav id="nav">
              <Link to="/">{this.props.t('common:menu.home')}</Link>
              {this.security.isAuthenticated()
                ? <Link to="/login" onClick={this.logout}>{this.props.t('common:menu.logout')}</Link>
                : <Link to="/login">{this.props.t('common:menu.login')}</Link>
              }
              <a href="#" onClick={this.switchLocale}
                 title={this.props.t('common:menu.switchTo') + ' ' + this.toggleLocale(this.state.locale).toUpperCase()}>
                <img src={this.state.locale == 'en' ? 'build/images/de.png' : 'build/images/en.png'}
                     className="locale"/>
              </a>
            </nav>
          </div>
        </header>
        <a href="#menu" className="navPanelToggle"><span className="fa fa-bars"/></a>
      </React.Fragment>
    );
  }
}

export default withTranslation()(MainMenu);
