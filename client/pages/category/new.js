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
    <div className="flex flex-col justify-center content-center min-h-screen border-4 border-red-500">
      <Nav />
      <h1 className="text-xl font-extrabold aptiv-primary">
        Create a New Category
      </h1>
      <form
        onSubmit={e => handleClick(e)}
        className="border border-blue-600 flex flex-col "
      >
        <TextField
          type="text"
          name="name"
          id="name"
          placeholder="name"
          className="border border-black"
          onChange={() => handleFormChange()}
        />
        <button type="submit" onClick={e => handleClick(e)}>
          Submit
        </button>
      </form>
    </div>
  );
}
