import React from 'react';
import { Provider } from 'next-auth/client';
import type { AppProps } from 'next/app';
import 'antd/dist/antd.less';

const App = ({ Component, pageProps }: AppProps) => (
  <Provider
    options={{
      clientMaxAge: 60,
      keepAlive: 60,
    }}
    session={pageProps.session}
  >
    <Component {...pageProps} />
  </Provider>
);

export default App;
