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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
export default function InstanceCard(props) {
  const { instance } = props;
  const { item } = instance;
  const { brand, model, category, quantity } = item;
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const ppu = formatter.format(item.price);
  const total = formatter.format(item.price * item.quantity);
  //   console.log(props);
  return (
    <div>
      <Card>
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
          </ul>
        </CardContent>
        <CardActions>
          <div>
            <Accordion sx={{ width: '250px' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                notes
              </AccordionSummary>
              <AccordionDetails>
                {instance.notes.map(note => (
                  <p className="border-b border-black">{note}</p>
                ))}
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ width: '250px' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                add notes
              </AccordionSummary>
              <AccordionDetails>
                <FormControl>
                  <TextField
                    variant="standard"
                    type="text"
                    name="new-note"
                    id="new-note"
                    placeholder="Add a note"
                    multiline
                    rows={3}
                    className=""
                  />
                  <Button variant="contained">Add note</Button>
                </FormControl>
              </AccordionDetails>
            </Accordion>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}
