import Link from 'next/link';
import axios from 'axios';
import {
  Button,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Menu,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useEffect, useState } from 'react';
import Router from 'next/router';
import { useUserContext } from '../../context/user';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      light: '#f25633e2',
      main: '#f84018',
    },
  },
});
export default function Nav() {
  const [user, setUser] = useUserContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const userOpen = Boolean(userAnchorEl);
  const [itemAnchorEl, setItemAnchorEl] = useState(null);
  const itemOpen = Boolean(itemAnchorEl);
  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleUserMenuClick = event => {
    setUserAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setUserAnchorEl(null);
  };
  const handleItemMenuClick = event => {
    setItemAnchorEl(event.currentTarget);
  };
  const handleItemMenuClose = () => {
    setItemAnchorEl(null);
  };

  useEffect(() => {
    console.log(user);
  }, []);
  const handleLinkClick = string => {
    // Closes/Opens menu and changes hamburger icon on click
    // Click with param "onlyClose" only closes the menu and reverts the ham Icon
    const hamburgerIcon = document.getElementById('ham-container');
    const dropDown = document.getElementById('nav-drop-down');
    const body = document.querySelector('body');
    body.classList.remove('overflow-hidden');
    if (string === 'onlyClose') {
      !dropDown.classList.contains('hidden') &&
        dropDown.classList.add('hidden');

      dropDown.classList.contains('flex') && dropDown.classList.remove('flex');

      hamburgerIcon &&
        hamburgerIcon.classList.contains('change') &&
        hamburgerIcon.classList.remove('change');

      return;
    }

    dropDown.classList.toggle('hidden');
    dropDown.classList.toggle('flex');
    hamburgerIcon.classList.toggle('change');
  };
  const logout = async () => {
    const res = await axios.get('http://localhost:5000/logout');
    setUser(false);
    Router.push('/user/logout');
  };

  useEffect(() => {
    // console.log(user);
  }, [user]);
  const toggleHam = () => {
    const hamburgerIcon = document.getElementById('ham-container');
    const dropDown = document.getElementById('nav-drop-down');
    const body = document.querySelector('body');
    body.classList.toggle('overflow-hidden');
    dropDown.classList.toggle('hidden');
    dropDown.classList.toggle('flex');
    hamburgerIcon.classList.toggle('change');
  };
  const [selectUrl, setSelectUrl] = useState('');
  const handleChange = e => {
    console.log(e.target.value);
    handleLinkClick();
    Router.push(e.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="nav-container">
        <nav id="navbar">
          {user ? (
            <p className="text-white absolute bottom-1 right-3 aptiv-primary">
              Welcome:{' '}
              <span className="text-white font-bold">{user.username}</span>
            </p>
          ) : (
            <p className="aptiv-primary absolute bottom-1 right-3">
              not logged in
            </p>
          )}
          <div id="nav-container">
            {/* ALWAYS */}
            <Link href="/">
              <div
                id="nav-logo"
                className="flex justify-center items-center  cursor-pointer"
                onClick={() => handleLinkClick('onlyClose')}
              >
                <div className="orange-dot"></div>
                <h1 className="text-bold text-center text-3xl uppercase ">
                  aptiv
                </h1>
                <div className="orange-dot" />
              </div>
            </Link>
            {/* USER AUTH */}
            {user && (
              <div id="nav-logged-in" className="">
                <div id="nav-logged-in-desktop">
                  <div>
                    <Button
                      id="basic-user-button"
                      aria-controls={userOpen ? 'basic-user-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={userOpen ? 'true' : undefined}
                      onClick={handleUserMenuClick}
                    >
                      USER
                    </Button>
                    <Menu
                      id="basic-user-menu"
                      anchorEl={userAnchorEl}
                      open={userOpen}
                      onClose={handleUserMenuClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-user-button',
                      }}
                    >
                      <MenuItem onClick={handleUserMenuClose}>
                        {' '}
                        <Link href="/user/all">
                          <p className="nav-link">view all users</p>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleUserMenuClose}>
                        {' '}
                        <Link href="/user/signup">
                          <p className="nav-link">create</p>
                        </Link>
                      </MenuItem>
                    </Menu>
                  </div>
                  <div>
                    <Button
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleMenuClick}
                    >
                      CATEGORIES
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleMenuClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={handleMenuClose}>
                        {' '}
                        <Link href="/item/category">
                          <p className="nav-link">view all</p>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>
                        {' '}
                        <Link href="/item/category/new">
                          <p className="nav-link">create</p>
                        </Link>
                      </MenuItem>
                    </Menu>
                  </div>
                  <div>
                    <Button
                      id="basic-item-button"
                      aria-controls={itemOpen ? 'basic-item-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={itemOpen ? 'true' : undefined}
                      onClick={handleItemMenuClick}
                    >
                      ITEMS
                    </Button>
                    <Menu
                      id="basic-item-menu"
                      anchorEl={itemAnchorEl}
                      open={itemOpen}
                      onClose={handleItemMenuClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-item-button',
                      }}
                    >
                      <MenuItem onClick={handleItemMenuClose}>
                        {' '}
                        <Link href="/item/all">
                          <p className="nav-link">view all</p>
                        </Link>
                      </MenuItem>
                      <MenuItem onClick={handleItemMenuClose}>
                        {' '}
                        <Link href="/item/new">
                          <p className="nav-link">create</p>
                        </Link>
                      </MenuItem>
                    </Menu>
                  </div>

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

          {/* MOBILE NAV */}
          <section id="nav-drop-down" className="hidden">
            <Accordion
              sx={{
                backgroundColor: 'rgb(0,0,0)',
                width: '100%',
                borderBottom: '1px solid #6c757d',
                borderRadius: '0',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: '#f84018' }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ color: 'white' }}
              >
                <span className="ml-5vw">ITEMS</span>
              </AccordionSummary>
              <AccordionDetails sx={{ color: 'white', paddingLeft: '70px;' }}>
                <Link href="/item/all">
                  <p className="nav-link " onClick={() => handleLinkClick()}>
                    all items
                  </p>
                </Link>
                <Link href="/item/new">
                  <p className="nav-link " onClick={() => handleLinkClick()}>
                    new item
                  </p>
                </Link>
                <Link href="/item/category">
                  <p className="nav-link " onClick={() => handleLinkClick()}>
                    sort by categories
                  </p>
                </Link>
              </AccordionDetails>
            </Accordion>
            <Accordion
              sx={{
                backgroundColor: 'rgb(0,0,0)',
                width: '100%',
                borderBottom: '1px solid #6c757d',
                borderRadius: '0',
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: '#f84018' }} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ color: 'white' }}
              >
                <span className="ml-5vw">CATEGORIES</span>
              </AccordionSummary>
              <AccordionDetails sx={{ color: 'white', paddingLeft: '70px;' }}>
                <Link href="/item/category">
                  <p className="nav-link" onClick={() => handleLinkClick()}>
                    veiw all categories
                  </p>
                </Link>
                <Link href="/item/category/new">
                  <p className="nav-link" onClick={() => handleLinkClick()}>
                    create a new category
                  </p>
                </Link>
              </AccordionDetails>
            </Accordion>

            {user && (
              <Link href="/user/all">
                <Button
                  variant="contained"
                  onClick={() => handleLinkClick()}
                  sx={{ backgroundColor: 'white' }}
                >
                  View All Users
                </Button>
              </Link>
            )}
            <Link href="/">
              <p onClick={() => logout()} className="nav-link">
                logout
              </p>
            </Link>
          </section>
        </nav>
        <div id="nav-padding"></div>
      </div>
    </ThemeProvider>
  );
}
