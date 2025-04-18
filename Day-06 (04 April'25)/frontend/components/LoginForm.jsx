'use client';

import Link from 'next/link';
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Logging in with: ${email}`);
    // Add login logic here
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold text-center">Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit" className="bg-blue-600 text-white py-2 rounded">Login</button>

      <div className="text-sm text-center mt-2">
        <p>
          Don&apos;t have an account?{' '}
          <Link href="/registration" className="text-blue-500 underline">
            Register
          </Link>
        </p>
        <p>
          <Link href="/forgot-password" className="text-blue-500 underline">
            Forgot Password?
          </Link>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;