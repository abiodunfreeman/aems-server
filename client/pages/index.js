import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';

export default function Home() {
  const fetchData = async () => {
    const res = await axios.get('localhost:5000');
    console.log(res.data);
  };
  fetchData();

  return (
    <div>
      <Head>
        <title>AEMS</title>
        <meta name="description" content="Aptiv Electronic Management System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-bold text-center text-3xl uppercase">aems</h1>
      </main>
    </div>
  );
}
