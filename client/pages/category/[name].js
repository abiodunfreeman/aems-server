import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';

const Name = () => {
  const router = useRouter();
  const { name } = router.query;

  const [items, setItems] = useState([]);
  const [catInfo, setCatInfo] = useState([]);
  const getData = async () => {
    const res = await axios.get(`http://localhost:5000/category/${name}`);
    setCatInfo(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Nav />
      <p>Category: {name}</p>
      <h1 className="text-bold text-2xl text-red-600 text-center">
        {catInfo.name} - {catInfo._id}
      </h1>
    </div>
  );
};
export default Name;
