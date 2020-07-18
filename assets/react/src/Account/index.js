import React from 'react';
import {withTranslation} from 'react-i18next';
import {Redirect} from 'react-router-dom';
import Security from '../Util/Security';

class Account extends React.Component {
  render() {
    const security = new Security();
    if (security.isAuthenticated()) {
      return (
        <section id="one">
          <div className="inner">
            <header>
              <h2>{this.props.t('common:account.heading')}</h2>
            </header>
            <p>{this.props.t('common:account.comingSoon')}</p>
          </div>
        </section>
      );
    } else {
      return <Redirect to='/login'/>;
    }

  }
};

export default withTranslation()(Account);
