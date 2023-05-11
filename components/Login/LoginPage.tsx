import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
`;

const Input = styled.input`
  margin-bottom: 1em;
  padding: 0.5em;
  font-size: 1em;
`;

const Button = styled.button`
  padding: 0.5em;
  font-size: 1em;
  background-color: #0070f3;
  color: white;
  border: none;
  cursor: pointer;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.875em;
`;

const Logo = styled.img`
  display: block;
  margin: 0 auto 2em;
  width: 300px; // or your desired size
  height: 120px;
  object-fit: cover;
`;

interface IFormInputs {
  account: string;
  password: string;
}

interface Props {
  onLogin: () => void;
}

export default (props: Props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormInputs>();
  const onSubmit = (data: IFormInputs) => {
    console.log(data);
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('user_name', data.account);
          props.onLogin();
        } else {
          throw new Error('ログインに失敗しました');
        }
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  return (
    <div>
      <div style={{ margin: 30 }}></div>
      <Logo src="/logo.png" alt="Logo" />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="account"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} type="text" placeholder="ユーザ名" />
          )}
        />
        {errors.account && (
          <ErrorMessage>{errors.account.message}</ErrorMessage>
        )}

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input {...field} type="password" placeholder="Password" />
          )}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}

        <Button type="submit">Log In</Button>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </Form>
    </div>
  );
};
