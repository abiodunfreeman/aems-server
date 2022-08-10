import Nav from '../components/Nav';
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
        <div key={x._id}>
          <Link href={`/category/${x.name}`}>
            <h1 className="text-3xl">{x.name}</h1>
          </Link>
          <h4>{x._id}</h4>
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
      <div className="flex justify-center p-3">
        <Link href="/category/new">
          <Button variant="outlined">Create a New Category</Button>
        </Link>
      </div>

      <div className="flex flex-col gap-8">{data}</div>
    </div>
  );
}
