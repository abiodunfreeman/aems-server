import { TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import Nav from '../components/Nav';
import { Button, Card, CardActions, CardContent } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      light: '#f25633e2',
      main: '#f84018',
    },
  },
});
export default function New() {
  const [formData, setFormData] = useState();
  const handleFormChange = () => {
    const name = document.getElementById('name');
    setFormData(name.value);
  };
  const handleClick = async e => {
    e.preventDefault();
    console.log(e);
    console.log(formData);
    const res = await axios.post(`http://localhost:5000/category/new`, {
      name: formData,
    });
    const form = document.querySelector('form');
    form.reset();
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="page-container ">
        <Nav />
        <h1 className="text-center text-xl font-extrabold text-white">
          Create a New Category
        </h1>
        <Card raised={true} className="mt-4 p-4 self-center  max-w-screen-sm ">
          <form onSubmit={e => handleClick(e)} className=" flex flex-col ">
            <CardContent className=" flex flex-col">
              <TextField
                variant="standard"
                type="text"
                name="name"
                id="name"
                placeholder="name"
                className="border border-black"
                onChange={() => handleFormChange()}
              />
            </CardContent>
            <CardActions className="flex justify-center">
              {' '}
              <Button
                variant="outlined"
                type="submit"
                onClick={e => handleClick(e)}
              >
                Add New Category
              </Button>
            </CardActions>
          </form>
        </Card>
      </div>
    </ThemeProvider>
  );
}
