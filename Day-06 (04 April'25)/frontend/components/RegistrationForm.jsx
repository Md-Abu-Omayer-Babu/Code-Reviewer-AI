'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RegistrationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert(`Registering user: ${form.name}`);
    // Add registration logic here
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4 max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold justify-center items-center text-center">Register</h2>
      <input
        name="name"
        type="text"
        placeholder="Name"
        className="p-2 border rounded"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="p-2 border rounded"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="p-2 border rounded"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit" className="bg-green-600 text-white py-2 rounded">Register</button>

      <Link href="/login">Already have an account? <span className='text-blue-500 underline'>Login</span></Link>
    </form>
  );
}
