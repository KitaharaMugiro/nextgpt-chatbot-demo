import { ArrowPathIcon, InboxArrowDownIcon } from '@heroicons/react/24/outline';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';

import { useRouter } from 'next/router';

import { useLoginUser } from '@/services/hooks/loginUser';

import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  createStyles,
  rem,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  form: {
    borderRight: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: rem(900),
    maxWidth: rem(450),
    paddingTop: rem(80),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export function LoginPaper() {
  const { classes } = useStyles();

  const onChangeButton = () => {
    if (formState === 'login') setFormState('signup');
    else setFormState('login');
  };

  const [formState, setFormState] = useState<'login' | 'reset' | 'signup'>(
    'login',
  );
  const [authError, setAuthError] = useState<string>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showSignedUpConfirmation, setShowSignedUpConfirmation] =
    useState<boolean>(false);

  const { refreshUserSettings } = useLoginUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const ForgotYourPassword = () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div />
        <Anchor<'a'> href="#" weight={700} onClick={resetHandler}>
          Forgot your password?
        </Anchor>
      </div>
    );
  };

  const GoogleLoginButton = () => {
    const onClick = async () => {
      setLoading(true);
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) {
        setAuthError(error.message);
      }
      setLoading(false);
      refreshUserSettings();
    };
    const GoogleIcon = () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 256 262"
        width="0.9rem"
        height="0.9rem"
      >
        <path
          fill="#4285F4"
          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
        />
        <path
          fill="#34A853"
          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
        />
        <path
          fill="#FBBC05"
          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
        />
        <path
          fill="#EB4335"
          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
        />
      </svg>
    );
    return (
      <Button
        onClick={onClick}
        mt={'md'}
        size="md"
        fullWidth
        leftIcon={<GoogleIcon />}
        variant="default"
        color="gray"
      >
        Login with Google
      </Button>
    );
  };

  const signInHandler = async (email: string, password: string) => {
    if (email === '') {
      return;
    }
    if (password === '') {
      return;
    }
    setLoading(true);

    supabaseClient.auth
      .signInWithPassword({
        email,
        password,
      })
      .then((res) => {
        if (res.error) {
          setAuthError(res.error.message);
        } else {
          refreshUserSettings();
          router.push('/');
        }
        setLoading(false);
      });
  };

  const signUpHandler = async (email: string, password: string) => {
    console.log('signUpHandler', email, password);
    if (email === '') {
      setAuthError('Email is required');
      return;
    }
    if (password === '') {
      setAuthError('Password is required');
      return;
    }

    setLoading(true);
    const { data: user, error: authError } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `https://${origin}`,
      },
    });

    if (authError) {
      console.log('authError', authError);
      setAuthError(authError.message);
      setLoading(false);
      return;
    }

    refreshUserSettings();
    setLoading(false);
    setShowSignedUpConfirmation(true);
  };

  const resetHandler = async () => {
    if (email === '') {
      setAuthError('Email is required');
      return;
    }
    setLoading(true);
    supabaseClient.auth
      .resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset`,
      })
      .then((res) => {
        if (res.error) {
          setAuthError(res.error.message);
        } else {
          setAuthError(
            `If an account exists with email (${email}), you will receive an email with a link to reset your password.`,
          );
        }
        setLoading(false);
      });
  };

  const onClickLoginOrSignup = () => {
    if (formState === 'login') {
      signInHandler(email, password);
    } else if (formState === 'signup') {
      signUpHandler(email, password);
    }
  };

  if (showSignedUpConfirmation) {
    return (
      <Paper className={classes.form} radius={0} p={60}>
        <div style={{ width: 32, height: 32 }}>
          <InboxArrowDownIcon />
        </div>
        <p>
          {email}{' '}
          に確認メールを送信しました。もし見つからない場合は迷惑メールをご確認ください！
        </p>{' '}
      </Paper>
    );
  }
  return (
    <Paper className={classes.form} radius={0} p={30}>
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        Welcome back to LangCore Chat!
      </Title>

      <TextInput
        placeholder="Email address"
        id="email-address"
        name="email"
        type="email"
        autoComplete="email"
        onChange={(e) => setEmail(e.target.value)}
        required
        size="md"
      />
      <PasswordInput
        id="password"
        name="password"
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Password"
        label="Password"
        mt="md"
        size="md"
      />
      {formState === 'login' ? <ForgotYourPassword /> : <div />}

      <Button
        fullWidth
        mt="xl"
        size="md"
        onClick={onClickLoginOrSignup}
        loading={loading}
        variant="outline"
      >
        {formState === 'login' ? 'Login' : 'Sign up'}
      </Button>

      <GoogleLoginButton />

      {authError && <Text color="red">{authError}</Text>}

      {/* <Text ta="center" mt="md">
        {formState === 'login'
          ? "Don't have an account? "
          : 'Already have an account? '}
        <Anchor<'a'> href="#" weight={700} onClick={() => onChangeButton()}>
          {formState === 'login' ? 'Sign up' : 'Login'}
        </Anchor>
      </Text> */}
    </Paper>
  );
}
