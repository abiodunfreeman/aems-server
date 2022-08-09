import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '../../components/Nav';
const Type = () => {
  const router = useRouter();
  const { type } = router.query;
  const [typeState, setTypeState] = useState('');
  useEffect(() => {
    setTypeState(type);
  }, []);

  const [items, setItems] = useState([]);

  const getData = async () => {
    const res = await axios.get(
      `http://localhost:5000/item/category/${typeState}`
    );
    setItems(res.data);
    console.log(res.data);
  };
  useEffect(() => {
    getData();
  }, [typeState]);
  return (
    <div>
      <Nav />
      <p>Type: {type}</p>
      {items.map(item => {
        const totalValue = item.price * item.quantity;
        return (
          <div className="m-8" key={item._id}>
            <h1>{item.model}</h1>
            <h1>Stock - {item.quantity}</h1>
            <h1>{item.price}</h1>
            <h1>Total Value - ${totalValue.toFixed(2)}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Type;
