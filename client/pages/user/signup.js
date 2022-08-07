import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';
export default function User() {
  const createUser = async e => {
    e.preventDefault();
    try {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const form = document.querySelector('form');
      // form.reset();
      const user = { username, password };

      const res = await axios.post('http://localhost:5000/user/signup', user);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      id="signup-container"
      className="pl-8 flex flex-col items-center justify-center min-h-screen"
    >
      <h1>Sign up</h1>
      <Link href="/user/all">
        <Button variant="outlined">View All Users</Button>
      </Link>
      <form className="flex flex-col border border-black p-8 items-center">
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
          <Button type="submit" onClick={e => createUser(e)} variant="outlined">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
