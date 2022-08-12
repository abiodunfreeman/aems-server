import { Button, Card, CardActions, CardContent } from '@mui/material';

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
      <Card>
        <CardContent>
          <h1>{model}</h1>
          {total} - {ppu} - {quantity}
        </CardContent>
      </Card>
    </div>
  );
};
export default ItemCard;
