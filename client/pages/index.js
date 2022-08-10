import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Example from './components/Example';
import Nav from './components/Nav';
export default function Home() {
  return (
    <div>
      <Head>
        <title>AEMS</title>
        <meta name="description" content="Aptiv Electronic Management System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="page-container">
        <Nav />
        <div className="bg-black p-12">
          <h1>Welcome to Aptiv Electronic Management System Homepage</h1>
          <Example />
        </div>
      </main>
    </div>
  );
}
