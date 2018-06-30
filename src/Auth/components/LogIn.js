import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  doLogin,
} from '../actions';

import {
  Wrapper,
  Title,
  Form,
  Input,
  FormBottom,
  PrimaryButton,
  FormBottomMessage,
  FormBottomLink,
} from '../styles';

class LogIn extends Component {
  constructor() {
    super();
    autoBind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const {
      doLogin,
    } = this.props;

    const {
      email,
      password,
    } = this.state;

    doLogin({
      email,
      password,
    });
  }

  render() {
    const { email, password } = this.state;

    return (
      <Wrapper>
        <Title>
          Log In
        </Title>

        <Form onSubmit={this.onSubmit}>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={this.onChangeEmail}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={this.onChangePassword}
          />

          <FormBottom>
            <PrimaryButton>
              LOG IN
            </PrimaryButton>

            <FormBottomMessage>
              {'Don\'t have an account?'}
              <FormBottomLink to="/signup">
                &nbsp;Create an account
              </FormBottomLink>
            </FormBottomMessage>
          </FormBottom>
        </Form>
      </Wrapper>
    );
  }
}

export default connect(
  null,
  dispatch => bindActionCreators({
    doLogin,
  }, dispatch),
)(LogIn);
