import Cookies from 'js-cookie';

export default class Security {
  isAuthenticated() {
    return !!Cookies.get('loggedIn');
  }

  unauthenticate() {
    Cookies.remove('loggedIn');
  }
}