import Link from 'next/link';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Router from 'next/router';
export default function Nav() {
  const [user, setUser] = useState({});
  const getUser = async () => {
    const res = await axios.get('http://localhost:5000');
    // console.log(res.data);
    setUser(res.data.user);
    if (res.locals) console.log(res.locals.user + 'FUKC');
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = async () => {
    const res = await axios.get('http://localhost:5000/logout');
    // console.log(res.data);
    if (res) Router.push('/');
  };

  useEffect(() => {
    // console.log(user);
  }, [user]);
  return (
    <nav className="flex  gap-5  ">
      {user && <p>Welcome: {user.username}</p>}

      {/* ALWAYS */}
      <Link href="/">
        <p className="text-red-400 cursor-pointer">Home</p>
      </Link>
      {/* USER AUTH */}
      {user && (
        <div>
          <Link href="/category">
            <p className="text-gray-400 cursor-pointer">view categories</p>
          </Link>
          <Link href="/item/all">
            <p className="text-blue-400 cursor-pointer">view items</p>
          </Link>
          <Link href="/item/new">
            <p className="cursor-pointer text-purple-400">new item</p>
          </Link>
          <Link href="/">
            <p onClick={() => logout()} className="cursor-pointer text-red-700">
              logout
            </p>
          </Link>
        </div>
      )}

      {/* LOGGED OUT */}
      {!user && (
        <div>
          {' '}
          <Link href="/user/signup">
            <p className="text-orange-400 cursor-pointer">sign up</p>
          </Link>
          <Link href="/user/login">
            <p className="cursor-pointer text-pink-400">login</p>
          </Link>
        </div>
      )}
    </nav>
  );
}
