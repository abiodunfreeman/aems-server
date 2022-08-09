import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
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
  return (
    <div>
      <Nav />
      <h1>current id - {id}</h1>
      <h1>{userData.username}</h1>
      <h1>{userData.status}</h1>
      <h1>{userData.password}</h1>
    </div>
  );
};
export default OneUser;
