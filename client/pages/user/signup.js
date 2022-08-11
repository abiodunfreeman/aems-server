import Link from 'next/link';
import axios from 'axios';
import Nav from '../components/Nav';
import { useState } from 'react';
import Router from 'next/router';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from '@mui/material';
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
      const password = document.getElementById('password').value;
      const confirmPass = document.getElementById('confirm-password').value;
      if (password !== confirmPass) {
        setErrMsg('passwords do not match');
        return;
      }
      const username = document.getElementById('username').value;
      const form = document.querySelector('form');

      const user = { username, password };

      const res = await axios.post('http://localhost:5000/user/signup', user);
      if (res) {
        form.reset();
        setErrMsg('');
        Router.push('/user/login');
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
        className="flex flex-col justify-center min-h-screen page-container "
      >
        <Nav />
        <Card raised={true} className="mt-4 p-4 self-center  max-w-screen-sm ">
          <form
            className="flex flex-col m-8 p-8 items-center"
            onSubmit={e => createUser(e)}
          >
            <CardContent className=" flex flex-col">
              <h1 className="text-center font-bold pb-1">create an account</h1>
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
              <TextField
                type="password"
                placeholder="Enter your password again"
                label="confirm password"
                name="confirm-password"
                variant="standard"
                id="confirm-password"
                required
              />
            </CardContent>

            <CardActions className="flex flex-col items-center">
              <Button type="submit" variant="outlined">
                Sign Up
              </Button>
            </CardActions>
          </form>
        </Card>
      </div>
    </ThemeProvider>
  );
}
