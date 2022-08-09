import Nav from '../components/Nav';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

function Login() {
  axios.defaults.withCredentials = true;
  const login = async e => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const form = document.querySelector('form');

    const user = { username, password };

    const res = await axios.post('http://localhost:5000/user/login', user);
    console.log(res);
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
    </div>
  );
}

export default Login;
