import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
  background: #FFFFFF;
  box-shadow: 0 0 20px 0 rgba(0,0,0,0.30);
  border-radius: 3px;

  width: 400px;
  height: 250px;

  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;

  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #2A3842;
  font-weight: normal;
  margin-top: 20px;
  margin-bottom: 0;
`;

const Message = styled.div`
  font-size: 16px;
  color: #2A3842;
  letter-spacing: -0.1px;

  margin-top: 36px;
`;

const Buttons = styled.div`
  position: absolute;
  bottom: 10px;

  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Button = styled.div`
  display: flex;
  flex: 50;
  height: 44px;

  align-items: center;
  justify-content: center;

  cursor: pointer;

  font-size: 18px;
`;

const CancelButton = styled(Button)`
  color: #2A3842;
`;

const OKButton = styled(Button)`
  color: #00A843;
`;

export default function ConfirmationModal({ hideModal, confirm }) {
  return (
    <Modal>
      <Title>
        Are you sure?
      </Title>

      <Message>
        This idea will be permanently deleted.
      </Message>

      <Buttons>
        <CancelButton onClick={hideModal}>
          CANCEL
        </CancelButton>

        <OKButton onClick={confirm}>
          OK
        </OKButton>
      </Buttons>
    </Modal>
  );
}
