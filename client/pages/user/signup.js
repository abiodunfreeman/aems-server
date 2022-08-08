import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';
import Nav from '../components/Nav';
import { useState } from 'react';
export default function User() {
  const [errMsg, setErrMsg] = useState('');
  const createUser = async e => {
    e.preventDefault();
    try {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const form = document.querySelector('form');

      const user = { username, password };

      const res = await axios.post('http://localhost:5000/user/signup', user);
      if (res) {
        form.reset();
        setErrMsg('');
      }
    } catch (err) {
      setErrMsg('Username taken');
      console.log(err);
    }
  };
  return (
    <div
      id="signup-container"
      className="pl-8 flex flex-col items-center justify-center min-h-screen border-8 border-red-500"
    >
      <Nav />
      <h1>Sign up</h1>
      <Link href="/user/all">
        <Button variant="outlined">View All Users</Button>
      </Link>
      <form
        className="flex flex-col border border-black p-8 items-center"
        onSubmit={e => createUser(e)}
      >
        <p>{errMsg}</p>
        <TextField
          type="string"
          placeholder="enter a username"
          label="username"
          name="username"
          variant="standard"
          id="username"
          required
        />
        <TextField
          type="password"
          placeholder="enter a password"
          label="password"
          name="password"
          variant="standard"
          id="password"
          required
        />
        <div className="pt-8">
          <Button type="submit" variant="outlined">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
