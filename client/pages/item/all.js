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
  const [chosenUser, setChosenUser] = useState();
  const handleChosenUserChange = e => {
    setChosenUser(e.target.value);
  };
  const handleAssignItem = async item_id => {
    console.log(item_id);
    console.log(chosenUser);
  };
  const getAllUsers = async () => {
    const res = await axios.get('http://localhost:5000/user/all');
    return res.data;
  };
  const [user, setUser] = useState({});
  const getUser = async () => {
    const res = await axios.get('http://localhost:5000');
    console.log(res.data);
    setUser(res.data.user);
  };

  useEffect(() => {
    getUser();
  }, []);
  const [errMsg, settErrMsg] = useState('');
  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    const res = await axios.get('http://localhost:5000/item/all');
    const allUsers = await getAllUsers();
    const allUsersMenuItem = allUsers.map(user => {
      return (
        <MenuItem value={user.username} key={user._id}>
          {user.username}
        </MenuItem>
      );
    });
    const itemsJSX = res.data.map(item => {
      const url = `http://localhost:3000/item/category/${item.category.name}`;
      const idUrl = `http://localhost:3000/item/${item._id}`;
      // Create our number formatter.
      var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });
      const ppu = formatter.format(item.price);
      const total = formatter.format(item.price * item.quantity);
      return (
        <div key={items._id} className="item-box relative">
          <Card sx={{ minWidth: '200px' }}>
            <CardContent>
              <div className=" min-w-full flex flex-col gap-2 p-2 pl-0">
                <h1 className="text-center font-semibold">{item.model}</h1>
                <p className="border-b border-black">Stock: {item.quantity}</p>
                <p className="border-b border-black">
                  PPU<span className="invisible">...</span>: {ppu}
                </p>
                <p className="">
                  Total<span className="invisible">..</span>: {total}
                </p>
              </div>
            </CardContent>
            <CardActions>
              <div className=" min-w-full">
                <Link href={url}>
                  <p className="cursor-pointer underline text-center">
                    view {item.category.name}
                  </p>
                </Link>
                <Accordion sx={{}}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <p className="text-black">assign to user</p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel id="user-select-label">
                          Choose User
                        </InputLabel>
                        <Select
                          labelId="user-select-label"
                          label="assign-user"
                          value={chosenUser}
                          onChange={handleChosenUserChange}
                        >
                          {allUsersMenuItem}
                        </Select>
                      </FormControl>
                    </Box>
                    <Button
                      variant="outlined"
                      onClick={() => handleAssignItem(item._id)}
                    >
                      Assign to (chosen user)
                    </Button>
                    <Button onClick={getAllUsers}>Get users</Button>
                  </AccordionDetails>
                </Accordion>
              </div>
            </CardActions>
          </Card>
        </div>
      );
    });
    // console.log(itemsJSX);
    setItems(itemsJSX);
    console.log(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);
  async function handleDeleteItem(id) {
    if (user && user.status === 'admin') {
      const res = await axios.delete(`http://localhost:5000/item/delete/${id}`);
      // fetchItems();
      setTimeout(fetchItems, 0);
      console.log(res);
    } else {
      settErrMsg('insufficient rights, please see an admin');
    }
  }
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
          <section id="items-jsx-container">{items}</section>
        </main>
      </div>
    </ThemeProvider>
  );
}
