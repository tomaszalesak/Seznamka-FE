import {
  CardMedia,
  CardContent,
  Card,
  Typography,
  CardActions,
  CardHeader,
  Button
} from '@mui/material';

const FindCard = () => (
  <Card>
    <CardHeader title="Name" />
    <CardMedia component="img" image="https://source.unsplash.com/random" alt="random" />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography>
        This is a media card. You can use this section to describe the content.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Follow</Button>
      <Button size="small">Block</Button>
    </CardActions>
  </Card>
);

export default FindCard;
