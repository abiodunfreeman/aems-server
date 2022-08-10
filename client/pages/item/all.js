import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import { Button } from '@mui/material';
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
    setItems(res.data);
    // console.log(res.data);
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
      <div>
        <main>
          <Nav />
          {user && user.status === 'admin' && (
            <div className="flex justify-center p-3">
              <Link href="/item/new">
                <Button variant="outlined">Create a new Item</Button>
              </Link>
            </div>
          )}
          <h1 className="text-center">{errMsg}</h1>
          <section className="border-8 border-blue-400 flex gap-4 flex-wrap justify-evenly">
            {items.map(item => {
              const url = `http://localhost:3000/item/category/${item.category.name}`;
              const idUrl = `http://localhost:3000/item/${item._id}`;
              return (
                <div className="m-8" key={item._id}>
                  <Link href={url}>
                    <h2 className="cursor-pointer">{item.category.name}</h2>
                  </Link>

                  <Link href={idUrl}>
                    <h2>{item.model}</h2>
                  </Link>
                  <h2>{item.Total_Value}</h2>
                  <h3 className="text-bold text-2xl">
                    ${item.quantity * item.price}
                  </h3>

                  {user && (
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => handleDeleteItem(item._id)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              );
            })}
          </section>
        </main>
      </div>
    </ThemeProvider>
  );
}
