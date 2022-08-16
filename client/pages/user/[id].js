import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import { Button } from '@mui/material';
import Link from 'next/link';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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
    setUserItems(res.data.userItems);
  };
  const deleteItemInstance = async (id, price) => {
    const res = await axios.delete(`http://localhost:5000/iteminstance/${id}`);
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
      setTotalItemValue(prevValue => prevValue + instance.item.price);
      return (
        <div
          key={instance._id}
          className="max-w-screen-sm border border-black m-3"
        >
          <a href={`/item/${instance.item._id}`}>
            {' '}
            <h1 className="font-bold text-center">{instance.item.model}</h1>
          </a>
          <h1>{instance.item.brand}</h1>
          <h2>Category: {instance.item.category.name}</h2>

          <Button
            onClick={() =>
              deleteItemInstance(instance._id, instance.item.price)
            }
          >
            Delete Item
          </Button>
        </div>
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
      <div>
        <Nav />
        <h1>Total Item Value - {formatter.format(totalItemValue)}</h1>
        <h1>current id - {id}</h1>
        <h1>{userData.username}</h1>
        <h1>{userData.status}</h1>
        <Button onClick={() => changeUserStatus()} variant="outlined">
          Change Status
        </Button>
        {userItemsJSX}
      </div>
    </ThemeProvider>
  );
};
export default OneUser;
