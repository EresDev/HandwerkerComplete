import React from 'react';
import {LoginForm} from './LoginForm';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('<LoginForm />', () => {

  configure({adapter: new Adapter()});

  const email = 'test@eresdev.com';
  const password = '9g8yr2r83';

  test('Form handleSubmit is called on submit - shallow', () => {
    const translator = (key) => key;
    const wrapper = shallow(
      <LoginForm t={translator}/>
    );
    wrapper.instance().handleSubmit = jest.fn();
    wrapper.update();

    const email = wrapper.find('#email');
    expect(email.length).toEqual(1);
    email.simulate('change', {target: {value: 'test@eresdev.com'}});

    const password = wrapper.find('#password');
    expect(password.length).toEqual(1);
    password.simulate('change', {target: {value: '9g8yr2r83'}});

    wrapper.find('form').simulate('submit');

    expect(wrapper.instance().handleSubmit).toHaveBeenCalled();
  });

  test('redirectToAccount called on successful submit', async () => {
    const wrapper = loginFormWrapperFactory();
    global.fetch = jest.fn().mockImplementation(() => {
      return {
        status: 204,
        body: '',
      };
    });

    wrapper.instance().redirectToAccount = jest.fn();
    wrapper.update();

    await submitFormWith(wrapper, email, password);

    assertInputFieldsUpdate(wrapper, email, password);

    expect(wrapper.instance().redirectToAccount).toHaveBeenCalled();

    global.fetch.mockClear();
    delete global.fetch;
  });

  const loginFormWrapperFactory = () => {
    const translator = (key) => key;
    return mount(
      <LoginForm t={translator}/>
    );
  };

  const submitFormWith = async (wrapper, email, password) => {
    wrapper.find('#email').getDOMNode().value = email;
    wrapper.find('#email').simulate('change');
    wrapper.find('#password').getDOMNode().value = password;
    wrapper.find('#password').simulate('change');

    await wrapper.find('form').simulate('submit');
  };

  const assertInputFieldsUpdate = (wrapper, email, password) => {
    expect(wrapper.find('form').getDOMNode().checkValidity()).toEqual(true);
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('#email').length).toEqual(1);
    expect(wrapper.find('#email').getDOMNode().value).toEqual(email);
    expect(wrapper.find('#password').getDOMNode().value).toEqual(password);
  };

  test('Invalid credentials error on submit', async () => {
    const wrapper = loginFormWrapperFactory();

    global.fetch = jest.fn().mockImplementation(() => {
      return {
        status: 401,
        body: '',
      };
    });

    await submitFormWith(wrapper, email, password);

    assertInputFieldsUpdate(wrapper, email, password);

    wrapper.update();
    expect(wrapper.find('.formErrors li').length).toEqual(1);
    expect(wrapper.find('.formErrors li').text()).toEqual('common:login.errorInvalidCredentials');

    global.fetch.mockClear();
    delete global.fetch;

  });

});
