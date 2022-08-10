import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import axios from 'axios';
import Nav from '../components/Nav';
import { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      light: '#f25633e2',
      main: '#f84018',
    },
  },
});
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
    <ThemeProvider theme={theme}>
      <div
        id="signup-container"
        className="flex flex-col justify-center min-h-screen "
      >
        <Nav />

        <form
          className="flex flex-col m-8 p-8 items-center"
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
    </ThemeProvider>
  );
}
