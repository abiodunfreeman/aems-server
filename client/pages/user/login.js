import Nav from '../components/Nav';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from '@mui/material';

import axios from 'axios';
import Router from 'next/router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      light: '#f25633e2',
      main: '#f84018',
    },
  },
});
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
      const user = { username: 'guest', password: 'guest' };
      const res = await axios.post('http://localhost:5000/user/login', user);

      if (res.data.user) {
        console.log('redirect');
        Router.push('/item/new');
      }
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="page-container">
        <Nav />
        <Card raised={true} className="mt-4 p-4 self-center  max-w-screen-sm ">
          <form className=" flex flex-col " onSubmit={e => loginAuto(e)}>
            <CardContent className=" flex flex-col">
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
            </CardContent>
            <CardActions className="flex flex-col items-center">
              <Button type="submit" variant="outlined">
                login
              </Button>
            </CardActions>
          </form>
          <div className="flex gap-3">
            <Button variant="outlined" onClick={() => login('default')}>
              <p className="login-link">login as guest</p>
            </Button>
            <Button variant="outlined" onClick={() => login('admin')}>
              <p className="login-link"> login as ADMIN</p>
            </Button>
          </div>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default Login;
