import React from 'react';
import type { AppProps } from 'next/app';
import 'antd/dist/antd.less';

const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default App;
