import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '~/styles/tailwind.css';
import 'aos/dist/aos.css';

import AOS from 'aos';
import { Toaster } from 'react-hot-toast';
import { Tooltip } from 'react-tooltip';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: true,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return (
    <>
      <style jsx global>
        {`
          :root {
            --poppins-font: ${poppins.style.fontFamily};
          }
        `}
      </style>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" reverseOrder={false} />
        <Component {...pageProps} />
        <Tooltip id="onlyself-tooltip" style={{ zIndex: 9999 }} />
      </QueryClientProvider>
    </>
  );
}
