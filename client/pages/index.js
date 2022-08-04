import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
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
      <Head>
        <title>AEMS</title>
        <meta name="description" content="Aptiv Electronic Management System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-bold text-center text-3xl uppercase">aems</h1>
        {items.map(item => {
          return (
            <div className="m-8">
              <h2>{item.category}</h2>
              <h2>{item.model}</h2>
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
