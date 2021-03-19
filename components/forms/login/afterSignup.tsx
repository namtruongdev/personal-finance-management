import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  min-height: 100%;
`;
export default function AfterSignup() {
  return (
    <>
      <Div>
        ban da dang ki thanh cong nhap vao
        <Link href="/signin">
          <a>Day</a>
        </Link>
        de dang nhap
      </Div>
    </>
  );
}
