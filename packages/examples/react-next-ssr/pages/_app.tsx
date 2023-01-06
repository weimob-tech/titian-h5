import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { TiCol, TiRow } from 'titian-h5-react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
