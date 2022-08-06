import { TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import Nav from '../components/Nav';
export default function New() {
  const [formData, setFormData] = useState();
  const handleFormChange = () => {
    const name = document.getElementById('name');
    setFormData(name.value);
  };
  const handleClick = async () => {
    console.log(formData);
    const res = await axios.post(`http://localhost:5000/category/new`, {
      name: formData,
    });
    const form = document.querySelector('form');
    form.reset();
  };
  return (
    <div className="flex flex-col justify-center content-center min-h-screen border-4 border-red-500">
      <Nav />
      <h1 className="text-xl font-extrabold">Create a New Category</h1>
      <form className="border border-red-500 flex flex-col ">
        <TextField
          type="text"
          name="name"
          id="name"
          placeholder="name"
          className="border border-black"
          onChange={() => handleFormChange()}
        />
        <button onClick={() => handleClick()} type="button">
          Submit
        </button>
      </form>
    </div>
  );
}
