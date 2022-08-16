import Nav from '../../components/Nav';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';

export default function Home() {
  const deleteCategoryClick = async id => {
    const res = await axios.delete(`http://localhost:5000/category/${id}`);
    getAllCategories();
    console.log(res.data);
  };
  const [data, setData] = useState([]);
  const getAllCategories = async () => {
    const res = await axios.get(`http://localhost:5000/category/all`);
    const jsxData = res.data.map(x => {
      return (
        <div key={x._id} className="border border-black p-3 flex flex-col ">
          <Link href={`/category/${x.name}`}>
            <h1 className="text-3xl text-center">{x.name}</h1>
          </Link>

          <Button variant="outlined" onClick={() => deleteCategoryClick(x._id)}>
            Delete
          </Button>
        </div>
      );
    });
    setData(jsxData);
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div id="category-index">
      <Nav />
      <div className="flex flex-col items-center justify-center p-3">
        <Link href="/item/category/new">
          <Button variant="outlined">Create a New Category</Button>
        </Link>
        <h1 className="font-bold text-4xl">
          Deleting a category will also delete all items and instances of items
          with that category.
        </h1>
      </div>

      <div className="flex gap-8">{data}</div>
    </div>
  );
}
