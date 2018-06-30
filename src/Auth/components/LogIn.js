import React, { Component } from 'react';

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

export default class LogIn extends Component {
  render() {
    return (
      <Wrapper>
        <Title>
          Log In
        </Title>

        <Form>
          <Input type="text" placeholder="Email"/>

          <Input type="password" placeholder="Password"/>

          <FormBottom>
            <PrimaryButton>LOG IN</PrimaryButton>

          <FormBottomMessage>
              Don't have an account?
              <FormBottomLink to="/signup"> Create an account</FormBottomLink>
            </FormBottomMessage>
          </FormBottom>
        </Form>
      </Wrapper>
    );
  }
}
