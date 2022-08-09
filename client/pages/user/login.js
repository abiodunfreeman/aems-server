import Nav from '../components/Nav';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import Router from 'next/router';
function Login() {
  axios.defaults.withCredentials = true;
  const loginAuto = async e => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const form = document.querySelector('form');

    const user = { username, password };

    const res = await axios.post('http://localhost:5000/user/login', user);
    if (res.data.user) {
      console.log('redirect');
      Router.push('/');
    }
  };
  const login = async status => {
    if (status === 'admin') {
      const user = { username: 'jayshonk', password: 'aptiv' };
      const res = await axios.post('http://localhost:5000/user/login', user);

      console.log('redirect');
      Router.push('/item/all');
    } else {
      const user = { username: 'test', password: 'pass' };
      const res = await axios.post('http://localhost:5000/user/login', user);

      if (res.data.user) {
        console.log('redirect');
        Router.push('/item/new');
      }
    }
  };
  return (
    <div className="min-h-screen">
      <Nav />
      <form
        className="flex flex-col border border-black p-8 items-center"
        onSubmit={e => login(e)}
      >
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
            login
          </Button>
        </div>
      </form>
      <div className="text-center">
        <p
          onClick={() => login('default')}
          className="cursor-pointer text-green-400"
        >
          login as test user
        </p>
        <p
          onClick={() => login('admin')}
          className="cursor-pointer text-red-400"
        >
          login as test ADMIN{' '}
        </p>
      </div>
    </div>
  );
}

export default Login;
