import styled from 'styled-components';

import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 485px;

  padding-top: 217px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 40px;
  font-weight: normal;
  color: #2A3842;
`;

export const Fields = styled.form`
  margin-top: 62px;

  display: flex;
  flex-direction: column;

  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  flex: 1;
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;

  border: none;
  border-bottom: 1px solid #455E70;

  font-size: 16px;
  padding: 8px 0;
  margin-bottom: 45px;

  &::placeholder {
    color: rgba(42,56,66,0.60);
  }
`;

export const FormBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PrimaryButton = styled.button`
  background: #00A843;
  color: white;

  width: 151px;
  height: 40px;

  display: flexbox;
  align-content: center;
  justify-content: center;

  font-size: 16px;
`;

export const FormBottomMessage = styled.div`
  font-size: 16px;
  color: #2A3842;
`;

export const FormBottomLink = styled(Link)`
  color: #00A843;
  text-decoration: none;
`;
