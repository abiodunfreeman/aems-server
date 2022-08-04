import axios from 'axios';
import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
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
  return (
    <div>
      <main>
        <h1 className="text-bold text-center text-3xl uppercase">aems</h1>
        <Nav />
        {items.map(item => {
          return (
            <div className="m-8" key={item._id}>
              <h2>{item.category}</h2>
              <h2>{item.model}</h2>
              <h2>{item.Total_Value}</h2>
              <h3 className="text-bold text-2xl">
                ${item.quantity * item.price}
              </h3>
            </div>
          );
        })}
      </main>
    </div>
  );
}
