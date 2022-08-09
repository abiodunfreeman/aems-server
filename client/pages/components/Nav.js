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
    Router.push('/');
  };

  useEffect(() => {
    // console.log(user);
  }, [user]);
  const toggleHam = () => {
    const hamburgerIcon = document.getElementById('ham-container');
    hamburgerIcon.classList.toggle('change');
  };
  return (
    <nav id="navbar">
      <div id="nav-container">
        {/* ALWAYS */}
        <Link href="/">
          <div
            id="nav-logo"
            className="flex justify-center items-center gap-1 cursor-pointer"
          >
            <div className="orange-dot"></div>
            <h1 className="text-bold text-center text-3xl uppercase">aptiv</h1>
            <div className="orange-dot" />
          </div>
        </Link>
        {/* USER AUTH */}
        {user && (
          <div id="nav-logged-in" className="">
            <div id="nav-logged-in-desktop">
              <Link href="/category">
                <p className="nav-link">categories</p>
              </Link>
              <Link href="/item/all">
                <p className="nav-link">items</p>
              </Link>
              <Link href="/item/new">
                <p className="nav-link">new item</p>
              </Link>
              <Link href="/">
                <p onClick={() => logout()} className="nav-link">
                  logout
                </p>
              </Link>
            </div>
            <div id="ham-container" onClick={() => toggleHam()}>
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
          </div>
        )}

        {/* LOGGED OUT */}
        {!user && (
          <div id="nav-logged-out">
            {' '}
            <Link href="/user/signup">
              <p className="nav-link">sign up</p>
            </Link>
            <Link href="/user/login">
              <p className="nav-link">login</p>
            </Link>
          </div>
        )}
      </div>

      {/* {user && (
        <p className="text-white text-center mb-3">Welcome: {user.username}</p>
      )} */}
    </nav>
  );
}
