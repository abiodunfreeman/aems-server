import Nav from '../components/Nav';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const deleteCategoryClick = async id => {
    const res = axios.delete(`http://localhost:5000/category/${id}`);
    getAllCategories();
    console.log(res.data);
  };
  const [data, setData] = useState([]);
  const getAllCategories = async () => {
    const res = await axios.get(`http://localhost:5000/category/all`);
    const jsxData = res.data.map(x => {
      return (
        <div key={x._id}>
          <h1 className="text-3xl">{x.name}</h1>
          <h4>{x._id}</h4>
          <button
            onClick={() => deleteCategoryClick(x._id)}
            className="border-2 border-black cursor-pointer"
          >
            delete
          </button>
        </div>
      );
    });
    setData(jsxData);
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div>
      <h1 className="text-bold text-center text-3xl uppercase">aems</h1>
      <Nav />
      <Link href="/category/new">
        <h1 className="my-8 cursor-pointer">Create a New Category</h1>
      </Link>

      <div className="flex flex-col gap-8">{data}</div>
    </div>
  );
}
