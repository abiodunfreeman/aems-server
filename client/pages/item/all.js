import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import { Button } from '@mui/material';
export default function All() {
  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    const res = await axios.get('http://localhost:5000/item/all');
    setItems(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);
  async function handleDeleteItem(id) {
    const res = await axios.delete(`http://localhost:5000/item/delete/${id}`);
    // fetchItems();
    setTimeout(fetchItems, 0);
    console.log(res);
  }
  return (
    <div>
      <main>
        <h1 className="text-bold text-center text-3xl uppercase">aems</h1>
        <Nav />
        <Link href="/item/new">
          <Button variant="outlined">Create a new Item</Button>
        </Link>
        {items.map(item => {
          return (
            <div className="m-8" key={item._id}>
              {/* <h2>{item.category.name}</h2> */}
              <h2>{item.model}</h2>
              <h2>{item.Total_Value}</h2>
              <h3 className="text-bold text-2xl">
                ${item.quantity * item.price}
              </h3>
              <Button
                color="error"
                variant="outlined"
                onClick={() => handleDeleteItem(item._id)}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </main>
    </div>
  );
}
