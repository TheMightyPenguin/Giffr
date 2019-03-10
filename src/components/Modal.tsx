import React, { Component } from 'react';
import styled from 'styled-components';
import { styleGetter } from './helpers';
import { Portal } from './Portal/Portal.component';

const StyledPortal = styled(Portal)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -1;

  &.open {
    z-index: ${styleGetter('theme.zMap.modal')};
  }
`;

const StyledModalContainer = styled.div`
  position: relative;
  max-width: 400px;
  background-color: ${styleGetter('theme.colors.buttons')};
  border-radius: 30px;
  padding: 20px;
  z-index: ${styleGetter('theme.zMap.modalContent')};
`;

const StyledBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  z-index: ${styleGetter('theme.zMap.modal')};
`;

const StyledCloseIcon = styled.span`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: -1px 0px 2px rgba(20, 20, 20, 1);
  background-color: ${styleGetter('theme.colors.background')};
  z-index: ${styleGetter('theme.zMap.modalContent')};
`;

interface ModalProps {
  open: boolean;
  onCloseClick(): void;
}

const Modal: React.FunctionComponent<ModalProps> = ({ children, open, onCloseClick }) => (
  <StyledPortal open={open}>
    <StyledBackdrop onClick={onCloseClick} />
    <StyledModalContainer>
      <StyledCloseIcon onClick={onCloseClick}>
        <span role="img" aria-label="close icon emoji">❌</span>
      </StyledCloseIcon>
      {children}
    </StyledModalContainer>
  </StyledPortal>
);

export default Modal;
