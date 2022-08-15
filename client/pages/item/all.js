import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import { Button, Card, CardActions, CardContent } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ItemCard from '../components/ItemCard';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      light: '#f25633e2',
      main: '#f84018',
    },
  },
});
export default function All() {
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [errMsg, settErrMsg] = useState('');
  const [items, setItems] = useState([]);
  const [cardJSX, setCardJSX] = useState([]);
  const getAllUsers = async () => {
    const res = await axios.get('http://localhost:5000/user/all');
    setAllUsers(res.data);
  };

  const getUser = async () => {
    const res = await axios.get('http://localhost:5000');
    setUser(res.data.user);
  };
  const fetchItems = async () => {
    const res = await axios.get('http://localhost:5000/item/all');
    setItems(res.data);
  };
  const handleChosenUserChange = (e, id) => {
    const input = document.getElementById(`hidden-${id}`);
    setChosenUser(e.target.value);
    input.value = e.target.value;
    // console.log(input.value + ' - NEW');
  };
  const handleAssignItem = async item_id => {
    console.log(item_id);
    console.log(chosenUser);
  };
  const handleAssignForm = async (e, id) => {
    e.preventDefault();

    const input = document.getElementById(`hidden-${id}`);

    console.log(input.value);
  };
  const handleDeleteItem = async id => {
    if (user && user.status === 'admin') {
      const res = await axios.delete(`http://localhost:5000/item/delete/${id}`);
      // fetchItems();
      setTimeout(fetchItems, 0);
      console.log(res);
    } else {
      settErrMsg('insufficient rights, please see an admin');
    }
  };
  const handleEditItem = async id => {
    console.log(id);
  };
  useEffect(() => {
    getUser();
    getAllUsers();
    fetchItems();
  }, []);

  useEffect(() => {
    // console.log(items);
    // console.log(user);
    // console.log(allUsers);
    const cards = items.map(item => {
      return (
        <ItemCard
          item={item}
          users={allUsers}
          key={item._id}
          deleteItem={handleDeleteItem}
          fetchItems={fetchItems}
        />
      );
    });
    setCardJSX(cards);
  }, [items]);
  useEffect(() => {
    // console.log(cardJSX);
  }, [cardJSX]);

  return (
    <ThemeProvider theme={theme}>
      <div id="items-all-container">
        <Nav />
        <main>
          {user && user.status === 'admin' && (
            <div className="flex justify-center p-3">
              <Link href="/item/new">
                <Button variant="outlined">Create a new Item</Button>
              </Link>
            </div>
          )}
          <h1 className="text-center">{errMsg}</h1>
          <section id="items-jsx-container">{cardJSX}</section>
        </main>
      </div>
    </ThemeProvider>
  );
}
