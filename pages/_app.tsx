import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import LoginPage from '@/components/Login/LoginPage';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps<{}>) {
  const queryClient = new QueryClient();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const storedUserName = localStorage.getItem('user_name');
    if (!storedUserName) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, []);

  if (!isLogin) {
    return (
      <div>
        <LoginPage onLogin={() => setIsLogin(true)} />
      </div>
    );
  }

  return (
    <div className={inter.className}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}

export default appWithTranslation(App);
