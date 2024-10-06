import React, { memo } from 'react';
import styled from 'styled-components';

function Description({ children }) {
  console.log('description 렌더링');
  return <Desc>{children}</Desc>;
}

export default memo(Description);

const Desc = styled.p`
  font-family: 'Yuni_ddingddang';
  font-size: clamp(24px, 7vw, 40px);
`;
