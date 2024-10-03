import React from 'react';
import { BiChatFill } from './BiChatFill';
import styled from 'styled-components';

function KakaoLoginBtn() {
  return (
    <ButtonContainer>
      <ShadowBlock />
      <ShadowBlock $isBottom={true} />
      <Icon />
    </ButtonContainer>
  );
}

export default KakaoLoginBtn;

const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
`;

const ShadowBlock = styled.div.attrs((props) => ({
  style: {
    top: props.$isBottom ? '-5px' : '-18px',
    left: props.$isBottom ? '15px' : '9px',
  },
}))`
  width: 295px;
  height: 24.3px;
  background-color: #fae10092;
  position: absolute;
`;

const Icon = styled(BiChatFill)`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
`;
