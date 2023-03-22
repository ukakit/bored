'use client';

import pb from '../lib/pocketbase'
import { useState } from 'react';

interface LoginData {
  email: string;
  password: string;
}

export default function LoginForm() {

  const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });
    console.log(response.body)
    // const data = await response.json();

    // if (data.success) {
    //   // redirect to dashboard or protected route
    //   console.log('success')
    // } else {
    //   // show error message
    //   console.log(data)
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={loginData.email} onChange={(event) => setLoginData({ ...loginData, email: event.target.value })} />
      </label>
      <label>
        Password:
        <input type="password" value={loginData.password} onChange={(event) => setLoginData({ ...loginData, password: event.target.value })} />
      </label>
      <button type="submit">Log in</button>
    </form>
  );
}
