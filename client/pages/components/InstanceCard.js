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
        <CardActions
          sx={{
            display: 'flex',
            flexDirection: 'column',
            border: '3px solid blue',
          }}
        >
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
                  name="name"
                  id="name"
                  placeholder="name"
                  className="border border-black"
                />
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </CardActions>
      </Card>
    </div>
  );
}
