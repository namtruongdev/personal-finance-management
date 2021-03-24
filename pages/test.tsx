import React from 'react';
import styled from 'styled-components';

export default function Test() {
  const Div = styled.div`
    font-size: 30px;
  `;
  return (
    <>
      <Div>hello</Div>
      <input type="text" size={10} />
    </>
  );
}
