import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Nav from './components/Nav';
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
        <Nav />
        <h1 className="text-center text-4xl text-red-400">homepage</h1>
      </main>
    </div>
  );
}
