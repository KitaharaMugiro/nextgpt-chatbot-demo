import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';
import { MantineProvider } from '@mantine/core';
import {
  createBrowserSupabaseClient,
  createServerSupabaseClient,
} from '@supabase/auth-helpers-nextjs';

const inter = Inter({ subsets: ['latin'] });

function App(props: AppProps) {
  const queryClient = new QueryClient();
  const { Component, pageProps } = props;

  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());


  return (
    <div className={inter.className}>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: 'light',
            }}
          >
            <Component {...pageProps} />
          </MantineProvider>
        </QueryClientProvider>
      </SessionContextProvider>
    </div>
  );
}

export default appWithTranslation(App);
