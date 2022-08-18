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
  //   console.log(props);
  return (
    <div>
      <Card>
        <CardContent></CardContent>
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
