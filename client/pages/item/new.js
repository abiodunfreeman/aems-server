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
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
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
    // e.preventDefault();
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
    <div id="new-item-container">
      <Nav />
      <h1>New Items</h1>
      <form>
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
        <Button
          //   type="submit"
          variant="outlined"
          onClick={() => handleFormSubmit()}
        >
          Add New Item
        </Button>
      </form>
    </div>
  );
};
export default New;
