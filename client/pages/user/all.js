import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from '../components/Nav';
import { useUserContext } from '../../context/user';

export default function AllUsers() {
  const [user, setUser] = useUserContext();
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    console.log(user);
  }, [user]);
  const [users, setUsers] = useState([]);
  const [usersJSX, setUsersJSX] = useState([]);
  function returnUserJSX(users) {
    const userJSX = users.map(u => {
      const url = `/user/${u._id}`;
      return (
        <div
          key={u._id}
          className="border border-black p-4 flex flex-col items-center gap-3"
        >
          <h1 className="cursor-pointer text-bold text-3xl">{u.username}</h1>

          <Link href={url}>
            <Button variant="outlined">View Profile</Button>
          </Link>
          <Button
            variant="outlined"
            onClick={() => deleteUser(u._id)}
            color="error"
          >
            Delete User
          </Button>
        </div>
      );
    });
    return userJSX;
  }
  const deleteUser = async id => {
    console.log(user.status);
    if (user.status !== 'admin') {
      setErrMsg('please see an admin to delete a user');
      return;
    }
    const res = await axios.delete(`http://localhost:5000/user/${id}/delete`);

    getUsers();
    if (res.data.success === true) console.log(res.data);
    setErrMsg(`User ${res.data.deletedUser.username} deleted successfully`);
  };
  const getUsers = async () => {
    const res = await axios.get('http://localhost:5000/user/all');

    setUsersJSX(returnUserJSX(res.data));
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);
  useEffect(() => {
    console.log(users);
  }, [users]);

  function handleFilterUsers(e) {
    const filteredUsers = users.filter(user =>
      user.username.includes(e.target.value)
    );
    setUsersJSX(returnUserJSX(filteredUsers));
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <h1>{errMsg}</h1>
      <TextField
        className="self-center mb-4"
        id="filter-user-input"
        variant="standard"
        placeholder="enter name"
        label="filter users"
        onChange={handleFilterUsers}
      />
      <div className=" flex gap-4 flex-wrap p-4 self-center  justify-center">
        {usersJSX}
      </div>
    </div>
  );
}
