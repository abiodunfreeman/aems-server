import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from '../components/Nav';
export default function AllUsers() {
  const [user, setUser] = useState({});
  const [errMsg, setErrMsg] = useState('');
  const getUser = async () => {
    const res = await axios.get('http://localhost:5000');
    if (!res.data.user) {
      setErrMsg('please log in');
      return;
    }
    setUser(res.data.user);
  };

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    console.log(user);
  }, [user]);
  const [users, setUsers] = useState([]);
  const deleteUser = async id => {
    const res = await axios.delete(`http://localhost:5000/user/${id}/delete`);

    getUsers();
    if (res.data.success === true)
      setErrMsg(`User ${res.data.user.username} deleted successfully`);
  };
  const getUsers = async () => {
    const res = await axios.get('http://localhost:5000/user/all');
    const userJSX = res.data.map(user => {
      const url = `/user/${user._id}`;
      return (
        <div key={user._id} className="">
          <Link href={url}>
            <h1 className="cursor-pointer text-bold text-3xl">
              {user.username}
            </h1>
          </Link>

          <Button variant="outlined" onClick={() => deleteUser(user._id)}>
            Delete User
          </Button>
        </div>
      );
    });
    setUsers(userJSX);
    console.log(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="">
      <Nav />
      <h1>{errMsg}</h1>
      <h1>View All Users</h1>
      {users}
    </div>
  );
}
