import React from 'react';
import styled, { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

function DiaryLayout({ children, ...props }) {
  const childrenWithProps = React.Children.map(children, (child) => React.cloneElement(child, { ...props }));
  return (
    <>
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <LayoutContainer>{childrenWithProps}</LayoutContainer>
      </StyleSheetManager>
    </>
  );
}

export default DiaryLayout;

const LayoutContainer = styled.main`
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  margin-top: 64px;
`;
