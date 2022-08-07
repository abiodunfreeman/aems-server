import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AllUsers() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await axios.get('http://localhost:5000/user/all');
    const userJSX = res.data.map(user => {
      return (
        <div key={user._id}>
          <h1>{user.username}</h1>
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
      <h1>View All Users</h1>
      {users}
    </div>
  );
}
