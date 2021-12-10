import {
  CardMedia,
  CardContent,
  Card,
  Typography,
  CardActions,
  CardHeader,
  Button,
  Grid
} from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import useProfilePicture from '../hooks/useProfilePicture';
import { UserWithId } from '../utils/firebase';

const FindCard: FC<UserWithId> = ({ first_name, last_name, bio, id, photo }) => {
  const profilePhoto = useProfilePicture(photo);
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <Button onClick={() => navigate(`/profile/${id}`)}>
          <CardHeader title={`${first_name} ${last_name}`} />
        </Button>

        <CardMedia component="img" image={profilePhoto} alt="random" />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography>{bio}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Follow</Button>
          <Button size="small">Block</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default FindCard;
