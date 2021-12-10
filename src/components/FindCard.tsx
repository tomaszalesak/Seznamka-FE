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
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';

import { UserWithId, storage } from '../utils/firebase';

const FindCard: FC<UserWithId> = ({ first_name, last_name, bio, id, photo }) => {
  const navigate = useNavigate();

  const [myPhoto, setPhoto] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchImage = async () => {
      const pathReference = ref(storage, `images/${photo}`);
      const url = await getDownloadURL(pathReference);
      setPhoto(url);
    };
    fetchImage();
  }, []);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <Button onClick={() => navigate(`/profile/${id}`)}>
          <CardHeader title={`${first_name} ${last_name}`} />
        </Button>

        <CardMedia
          component="img"
          image={
            myPhoto ??
            'https://www.anchormortgagellc.com/wp-content/uploads/2015/09/placeholder.png'
          }
          alt="random"
        />
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
