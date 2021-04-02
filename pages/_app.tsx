import 'antd/dist/antd.less';
import React from 'react';
import { Provider } from 'next-auth/client';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => (
  <Provider
    session={pageProps.session}
    options={{
      clientMaxAge: 60,
      keepAlive: 5 * 60,
    }}
  >
    <Component {...pageProps} />
  </Provider>
);

export default App;
