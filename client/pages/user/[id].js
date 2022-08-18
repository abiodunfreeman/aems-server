import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import { Button } from '@mui/material';
import Link from 'next/link';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import InstanceCard from '../components/InstanceCard';
const theme = createTheme({
  palette: {
    primary: {
      light: '#f25633e2',
      main: '#f84018',
    },
  },
});
const OneUser = () => {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState();
  const [userItems, setUserItems] = useState([]);
  const [userItemsJSX, setUserItemsJSX] = useState();
  const [totalItemValue, setTotalItemValue] = useState(0);
  const fetchUserData = async () => {
    // console.log(userId);
    const res = await axios.get(`http://localhost:5000/user/${userId}`);
    setUserData(res.data.oneUser);
  };
  const fetchUserItems = async () => {
    const res = await axios.get(`http://localhost:5000/user/item/${userId}`);
    // console.log(res.data);
    setUserItems(res.data.userItems);
  };
  const deleteItemInstance = async (itemId, price) => {
    const res = await axios.delete(
      `http://localhost:5000/iteminstance/${itemId}`
    );
    console.log(res.data);
    setTotalItemValue(prevVal => prevVal - price);
    fetchUserItems();
  };
  useEffect(() => {
    setUserId(id);
  }, []);
  useEffect(() => {
    setUserId(id);
    fetchUserData();
    fetchUserItems();
  }, [userId]);
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  useEffect(() => {
    console.log(userItems);
    const jsx = userItems.map(instance => {
      if (instance.item === null) {
        deleteItemInstance(instance._id);
        return;
      }
      setTotalItemValue(prevValue => prevValue + instance.item.price);
      return (
        <InstanceCard
          key={instance._id}
          instance={instance}
          deleteInstance={deleteItemInstance}
        />
      );
    });
    setUserItemsJSX(jsx);
  }, [userItems]);
  const changeUserStatus = async () => {
    const res = await axios.put(`http://localhost:5000/user/${userId}`, {
      status: userData.status,
    });
    setUserData(res.data.user);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className=" bg-white min-h-screen flex flex-col ">
        <Nav />
        <div className="text-lg flex flex-col items-center pt-8 border border-black min-w-screen- self-center">
          <h1>
            User :{' '}
            <span className="font-bold uppercase">{userData.username}</span>
          </h1>
          <h1>
            Status:{' '}
            <span className="font-bold uppercase">{userData.status}</span>
          </h1>
          <Button onClick={() => changeUserStatus()} variant="outlined">
            Change Status
          </Button>
        </div>

        <div className="userJSX">{userItemsJSX}</div>
        <h1 className="text-center">
          Total Value of Items - {formatter.format(totalItemValue)}
        </h1>
      </div>
    </ThemeProvider>
  );
};
export default OneUser;
