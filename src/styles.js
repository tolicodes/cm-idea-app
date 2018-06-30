import styled from 'styled-components';

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
