import {
  Button,
  Card,
  CardActions,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const ItemCard = props => {
  const { item, users } = props;
  const { brand, model, category, quantity } = item;
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const ppu = formatter.format(item.price);
  const total = formatter.format(item.price * item.quantity);

  //   console.log(item);
  return (
    <div className="item-card-container">
      <Card sx={{ minWidth: '275px' }}>
        <CardContent>
          <h1>{model}</h1>
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
          <div className="border border-black min-w-full">
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
                  border: '2px solid black',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button variant="outlined">assign to user</Button>
              </AccordionDetails>
            </Accordion>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};
export default ItemCard;
