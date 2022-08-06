import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../components/Nav';
const Type = () => {
  const router = useRouter();
  const { type } = router.query;
  const [items, setItems] = useState([]);

  const getData = async () => {
    const res = await axios.get(`http://localhost:5000/item/${type}`);
    setItems(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Nav />
      <p>Type: {type}</p>
      {items.map(item => {
        return (
          <div className="m-8" key={item._id}>
            <h1>
              {item.category} - {item.model}
            </h1>

            <h1>{item.price}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Type;
