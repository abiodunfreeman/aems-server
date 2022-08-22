import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import InstanceCard from '../components/InstanceCard';
import { useUserContext } from '../../context/user';
const theme = createTheme({
  palette: {
    primary: {
      light: '#f25633e2',
      main: '#f84018',
    },
  },
});
const OneUser = () => {
  const [user, setUser] = useUserContext();
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState();
  const [userItems, setUserItems] = useState([]);
  const [allUserItems, setAllUserItems] = useState([]);
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
    setAllUserItems(res.data.userItems);
  };
  const deleteItemInstance = async (itemId, price, setMsg) => {
    if (!user) {
      setMsg('please log in');
      return;
    } else if (user.status !== 'admin') {
      setMsg('only admins can delete items');
      return;
    }
    const res = await axios.delete(
      `http://localhost:5000/iteminstance/${itemId}`
    );

    setTotalItemValue(prevVal => prevVal - price);
    fetchUserItems();
  };
  useEffect(() => {
    setUserId(id);
  }, []);
  useEffect(() => {
    fetchUserData();
    fetchUserItems();
  }, [userId]);
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  useEffect(() => {
    console.log(allUserItems);
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
          fetchUserItems={fetchUserItems}
          user={user}
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
  function handleFilterInstances(e) {
    setUserItems(
      allUserItems.filter(instance => {
        const modelName = instance.item.model.toLowerCase();
        return modelName.includes(e.target.value.toLowerCase());
      })
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <div className=" bg-darkgray min-h-screen flex flex-col max-w-screen ">
        <Nav />
        <div className="bg-white max-w-full text-lg flex gap-6 justify-around flex-wrap items-center p-8   w-full ">
          <div>
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
          <div>
            <h1 className="text-center">
              Total Value of Items - {formatter.format(totalItemValue)}
            </h1>
            <h1>Number of Items: {userItemsJSX && userItemsJSX.length}</h1>

            <TextField
              className=""
              id="filter-instance-input"
              variant="standard"
              placeholder="enter model name"
              label="filter items"
              onChange={handleFilterInstances}
            />
          </div>
        </div>

        <div className="  flex p-3 flex-wrap gap-6  justify-center">
          {userItemsJSX}
        </div>
      </div>
    </ThemeProvider>
  );
};
export default OneUser;
