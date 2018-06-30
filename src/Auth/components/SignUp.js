import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Wrapper,
  Title,
  Fields,
  Input,
  FormBottom,
  PrimaryButton,
  FormBottomMessage,
  FormBottomLink,
} from '../styles';

export default class SignUp extends Component {
  render() {
    return (
      <Wrapper>
        <Title>
          Sign Up
        </Title>

        <Fields>
          <Input type="text" placeholder="Name"/>

          <Input type="text" placeholder="Email"/>

          <Input type="password" placeholder="Password"/>

          <FormBottom>
            <PrimaryButton>SIGN UP</PrimaryButton>

          <FormBottomMessage>
              Already have an account?
              <FormBottomLink to="/login"> Log In</FormBottomLink>
            </FormBottomMessage>
          </FormBottom>
        </Fields>
      </Wrapper>
    );
  }
}
