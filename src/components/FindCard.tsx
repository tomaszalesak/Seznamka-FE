import {
  CardMedia,
  CardContent,
  Card,
  Typography,
  CardHeader,
  Button,
  Grid,
  Box
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
      <Card sx={{ height: 500 }}>
        <Button onClick={() => navigate(`/profile/${id}`)}>
          <CardHeader title={`${first_name} ${last_name}`} />
        </Button>

        <Box
          sx={{
            height: 330
          }}
        >
          <CardMedia component="img" image={profilePhoto} alt="random" />
        </Box>
        <CardContent sx={{ flexGrow: 1, position: 'relative', paddingBottom: 0 }}>
          <Typography sx={{ margin: 0, position: 'absolute', bottom: '-50%' }}>{bio}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default FindCard;
