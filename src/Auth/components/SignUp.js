import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autoBind from 'react-autobind';

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

import {
  doRegister,
} from '../actions';


class SignUp extends Component {
  constructor() {
    super();
    autoBind(this);
    this.state = {
      email: '',
      name: '',
      password: '',
    };
  }

  onChangeName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  doRegister(e) {
    e.preventDefault();
    e.stopPropagation();
    const {
      doRegister,
    } = this.props;

    const {
      email,
      name,
      password,
    } = this.state;

    doRegister({
      email,
      name,
      password,
    });
  }

  render() {
    const {
      name,
      email,
      password,
    } = this.state;

    return (
      <Wrapper>
        <Title>
          Sign Up
        </Title>

        <Form onSubmit={this.doRegister}>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={this.onChangeName}
          />

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
            <PrimaryButton type="submit">
              SIGN UP
            </PrimaryButton>

            <FormBottomMessage>
              Already have an account?
              <FormBottomLink to="/login">
                &nbsp;Log In
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
    doRegister,
  }, dispatch),
)(SignUp);
