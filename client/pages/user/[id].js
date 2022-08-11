import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import { Button } from '@mui/material';
const OneUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState();
  const fetchUserData = async () => {
    console.log(userId);
    const res = await axios.get(`http://localhost:5000/user/${userId}`);
    setUserData(res.data.oneUser);
  };
  useEffect(() => {
    setUserId(id);
  }, []);
  useEffect(() => {
    setUserId(id);
    fetchUserData();
  }, [userId]);
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  const changeUserStatus = async () => {
    const res = await axios.put(`http://localhost:5000/user/${userId}`, {
      status: userData.status,
    });
    setUserData(res.data.user);
  };
  return (
    <div>
      <Nav />
      <h1>current id - {id}</h1>
      <h1>{userData.username}</h1>
      <h1>{userData.status}</h1>
      <Button onClick={() => changeUserStatus()} variant="outlined">
        Change Status
      </Button>
    </div>
  );
};
export default OneUser;
