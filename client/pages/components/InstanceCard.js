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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function InstanceCard(props) {
  const [errMsg, setErrMsg] = useState('');
  const { instance, user } = props;
  const { item } = instance;
  const { brand, model, category, quantity } = item;
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const ppu = formatter.format(item.price);
  const total = formatter.format(item.price * item.quantity);

  async function handleNewNote(e, id) {
    e.preventDefault();
    const form = document.getElementById(`form-${id}`);
    const newNoteText = document.getElementById(`new-note-${id}`).value;
    const res = await axios.post(
      `http://localhost:5000/iteminstance/notes/${id}`,
      {
        instanceId: id,
        note: newNoteText,
      }
    );
    props.fetchUserItems();
    form.reset();
  }
  async function deleteNote(instanceId, note) {
    if (!user) {
      setErrMsg('must be logged in to delete a note');
      return;
    } else if (user.status !== 'admin') {
      setErrMsg('contact an admin to delete this note');
      return;
    }

    const res = await axios.put(
      `http://localhost:5000/iteminstance/notes/${instanceId}`,

      { instanceId, note }
    );
    props.fetchUserItems();
    console.log(res.data);
  }
  return (
    <div className="">
      <Card sx={{ width: '300px' }}>
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
          <p className="text-red-500 text-center">{errMsg}</p>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className=" flex flex-col">
            <Accordion sx={{ width: '250px' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                notes
              </AccordionSummary>
              <AccordionDetails
                sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
              >
                {instance.notes.length > 0 ? (
                  instance.notes.map((note, pos) => (
                    <div
                      className="instance-note"
                      key={`${instance._id}-note-${pos}`}
                    >
                      <p>{note}</p>
                      <div
                        className="delete-icon self-center"
                        onClick={() => deleteNote(instance._id, note)}
                      >
                        <DeleteForeverIcon />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>no notes</p>
                )}
              </AccordionDetails>
            </Accordion>
            {/* add notes */}
            <Accordion sx={{ width: '250px' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                add notes
              </AccordionSummary>
              <AccordionDetails>
                <form
                  onSubmit={e => handleNewNote(e, instance._id)}
                  id={`form-${instance._id}`}
                >
                  <FormControl
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      padding: '15px',
                    }}
                  >
                    <TextField
                      variant="standard"
                      type="text"
                      name="new-note"
                      id={`new-note-${instance._id}`}
                      placeholder="Add a note"
                      className=""
                    />
                    <Button type="submit" variant="outlined">
                      Add note
                    </Button>
                  </FormControl>
                </form>
              </AccordionDetails>
            </Accordion>
            <Button
              onClick={() =>
                props.deleteInstance(
                  instance._id,
                  instance.item.price,
                  setErrMsg
                )
              }
            >
              Delete Instance
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}
