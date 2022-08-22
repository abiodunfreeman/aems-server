import Nav from '../../components/Nav';
import axios from 'axios';
import { useEffect, useState } from 'react';
import InstanceCard from '../../components/InstanceCard';
import { useUserContext } from '../../../context/user';

export default function Home() {
  const [user, setUser] = useUserContext();
  const [instanceJSX, setInstanceJSX] = useState();
  const [itemInstances, setItemInstances] = useState([]);
  const [options, setOptions] = useState([]);
  const fetchOptions = async () => {
    const res = await axios.get('http://localhost:5000/user/all');
    const options = res.data.map(user => {
      return { label: user.username, id: user._id };
    });
    console.log(options);
    setOptions(options);
  };
  const fetchItemInstances = async () => {
    const res = await axios.get(`http://localhost:5000/iteminstance/all`);
    console.log(res.data);
    setItemInstances(res.data.itemInstances);
  };
  const deleteItemInstance = async (itemId, price, setMsg) => {
    if (!user) {
      setMsg('please log in');
      return;
    } else if (user.status !== 'admin') {
      setMsg('only admins can delete items');
      return;
    }
    const res = await axios.delete(
      `http://localhost:5000/iteminstance/${itemId}`
    );

    fetchItemInstances();
  };
  useEffect(() => {
    fetchItemInstances();
    fetchOptions();
  }, []);
  useEffect(() => {
    setInstanceJSX(
      itemInstances.map(instance => (
        <InstanceCard
          key={instance._id}
          instance={instance}
          deleteInstance={deleteItemInstance}
          fetchUserItems={fetchItemInstances}
          options={options}
          user={user}
        />
      ))
    );
  }, [itemInstances]);
  return (
    <div>
      <Nav />
      <h1>Insances</h1>
      <div className="flex flex-wrap">{instanceJSX}</div>
    </div>
  );
}
