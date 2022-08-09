import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from '../components/Nav';
export default function AllUsers() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await axios.get('http://localhost:5000/user/all');
    const userJSX = res.data.map(user => {
      const url = `/user/${user._id}`;
      return (
        <div key={user._id}>
          <Link href={url}>
            <h1 className="cursor-pointer text-bold text-3xl">
              {user.username}
            </h1>
          </Link>
          <h2>{user.password}</h2>
          <Button variant="outlined" onClick={() => deleteUser(user._id)}>
            Delete User
          </Button>
        </div>
      );
    });
    setUsers(userJSX);
    console.log(res.data);
  };
  const deleteUser = async id => {
    const res = await axios.delete(`http://localhost:5000/user/${id}/delete`);
    console.log(res.data);
    getUsers();
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <Nav />
      <h1>View All Users</h1>
      {users}
    </div>
  );
}
