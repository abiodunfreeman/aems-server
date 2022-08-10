import * as React from 'react';
import Nav from '../components/Nav';
import {
  Button,
  TextField,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Card,
  CardActions,
  CardContent,
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const theme = createTheme({
  palette: {
    primary: {
      light: '#f25633e2',
      main: '#f84018',
    },
  },
});
const New = () => {
  const [categoryData, setCategoryData] = useState([]);

  const [catFormData, setCatFormData] = useState('');

  const handleChange = event => {
    setCatFormData(event.target.value);
  };

  const getAllCategories = async () => {
    const res = await axios.get(`http://localhost:5000/category/all`);
    setCategoryData(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  const handleFormSubmit = async e => {
    e.preventDefault();
    const category = catFormData;
    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;

    const formData = { category, brand, model, price, quantity };

    try {
      const res = await axios.post('http://localhost:5000/item/new', formData);
      console.log(res.data);
      const form = document.querySelector('form');
      form.reset();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <div id="new-item-container" className="flex flex-col ">
        <Nav />
        <Card className="p-4 self-center  max-w-screen-sm " raised={true}>
          <form onSubmit={e => handleFormSubmit(e)} className="">
            <CardContent className=" flex flex-col">
              <FormControl fullWidth required>
                <InputLabel required id="demo-simple-select-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="category"
                  value={catFormData}
                  label="Category"
                  onChange={handleChange}
                  required
                >
                  {categoryData.map(category => {
                    return (
                      <MenuItem value={category._id} key={category._id}>
                        {category.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <TextField
                type="text"
                placeholder="(Dell, LogiTech, etc...)"
                label="Brand"
                name="brand"
                variant="standard"
                id="brand"
                required
              />
              <TextField
                type="text"
                placeholder="(Latitude 5560, Zone 900, etc...)"
                label="Model"
                name="model"
                variant="standard"
                id="model"
                required
              />
              <TextField
                type="number"
                placeholder="Price (in dollars)"
                label="Price ($)"
                name="price"
                variant="standard"
                id="price"
                required
              />
              <TextField
                type="number"
                label="Quantity"
                name="quantity"
                variant="standard"
                id="quantity"
                required
              />
            </CardContent>
            <CardActions className="flex justify-center">
              <Button type="submit" variant="outlined">
                Add New Item
              </Button>
            </CardActions>
          </form>
        </Card>
      </div>
    </ThemeProvider>
  );
};
export default New;
