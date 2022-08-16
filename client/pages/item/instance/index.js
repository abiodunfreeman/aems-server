import Nav from '../../components/Nav';
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function Home() {
  const [itemInstances, setItemInstances] = useState([]);
  const fetchItemInstances = async () => {
    const res = await axios.get(`http://localhost:5000/iteminstance/all`);
    console.log(res.data);
    setItemInstances(res.data.itemInstances);
  };
  useEffect(() => {
    fetchItemInstances();
  }, []);
  return (
    <div>
      <Nav />
      <h1>Insances</h1>
      {JSON.stringify(itemInstances)
        .split(',')
        .map(x => (
          <p className="text-xl mb-3">{x}</p>
        ))}
    </div>
  );
}
