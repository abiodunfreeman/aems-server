import {
  Button,
  Card,
  CardActions,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const ItemCard = props => {
  const { item, users, deleteItem, categoryData } = props;

  // console.log(categoryData);
  const { brand, model, category, quantity } = item;

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const ppu = formatter.format(item.price);
  const total = formatter.format(item.price * item.quantity);

  const [catFormData, setCatFormData] = useState('');
  const [userData, setUserData] = useState('');
  const handleChange = event => {
    setCatFormData(event.target.value);
  };
  const handleUserChange = event => {
    setUserData(event.target.value);
  };
  const editItem = async id => {
    // e.preventDefault();
    // console.log(id);
    let category = catFormData;
    category = category === '' ? item.category._id : category;
    let brand = document.getElementById(`brand-${item._id}`).value;
    brand = brand === '' ? item.brand : brand;
    let model = document.getElementById(`model-${item._id}`).value;
    model = model === '' ? item.model : model;
    let price = document.getElementById(`price-${item._id}`).value;
    price = price === '' ? item.price : price;
    let quantity = document.getElementById(`quantity-${item._id}`).value;
    quantity = quantity === '' ? item.quantity : quantity;

    const formData = { category, brand, model, price, quantity };
    // console.log(formData);
    const res = await axios.put(
      `http://localhost:5000/item/${item._id}`,
      formData
    );
    props.fetchItems();
    console.log(res);
  };
  const assignToUser = async id => {
    const res = await axios.put(`http://localhost:5000/user/item/${userData}`, {
      itemID: id,
    });
    console.log(res.data);
    if (res && res.data.success === false) {
      props.setErrMsg(res.data.err);
      return;
    }
    props.setSuccessMsg(
      `Succesfully added ${res.data.addedItem.item.model} to ${res.data.addedItem.owner.username}`
    );
    props.setErrMsg('');
  };
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  //   console.log(item);
  return (
    <div className="item-card-container">
      <Card sx={{ minWidth: '275px' }}>
        <CardContent>
          <h1 className="text-center font-bold">{model}</h1>
          <h2>Brand: {brand}</h2>
          <h3>Category: {category.name}</h3>
          <ul>
            <li>Stock: {quantity}</li>
            <li>
              PPU: <span className="invisible">...</span>
              {ppu}
            </li>
            <li>
              Total:<span className="invisible">..</span> {total}
            </li>
          </ul>
        </CardContent>
        <CardActions>
          <div className=" min-w-full">
            {/* assign to user */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                assign to user
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: 'flex',
                  gap: '.5em',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <FormControl fullWidth variant="standard">
                  <InputLabel required id="demo-user-select-label">
                    Choose User
                  </InputLabel>
                  <Select
                    labelId="demo-user-select-label"
                    id={`category-${item._id}`}
                    value={userData}
                    // placeholder={catFormData}
                    label="User"
                    onChange={handleUserChange}
                  >
                    {users.map(user => {
                      return (
                        <MenuItem value={user._id} key={user._id}>
                          {user.username}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  onClick={() => assignToUser(item._id)}
                >
                  assign to user
                </Button>
              </AccordionDetails>
            </Accordion>
            {/* edit item */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                edit item
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '.5em',
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id={`category-${item._id}`}
                    value={catFormData}
                    // placeholder={catFormData}
                    label="Category"
                    onChange={handleChange}
                  >
                    {categoryData.map(category => {
                      return (
                        <MenuItem value={category._id} key={category._id}>
                          {category.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <TextField
                  type="text"
                  placeholder="(Dell, LogiTech, etc...)"
                  label="Brand"
                  name="brand"
                  variant="standard"
                  id={`brand-${item._id}`}
                />
                <TextField
                  type="text"
                  placeholder="(Latitude 5560, Zone 900, etc...)"
                  label="Model"
                  name="model"
                  variant="standard"
                  id={`model-${item._id}`}
                />
                <TextField
                  type="number"
                  placeholder="Price (in dollars)"
                  label="Price ($)"
                  name="price"
                  variant="standard"
                  id={`price-${item._id}`}
                />
                <TextField
                  type="number"
                  label="Quantity"
                  name="quantity"
                  variant="standard"
                  id={`quantity-${item._id}`}
                />
                <Button variant="outlined" onClick={() => editItem(item._id)}>
                  confirm changes
                </Button>
              </AccordionDetails>
            </Accordion>
            {/* delete item */}
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                delete item
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button variant="outlined" onClick={() => deleteItem(item._id)}>
                  delete
                </Button>
              </AccordionDetails>
            </Accordion>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};
export default ItemCard;
