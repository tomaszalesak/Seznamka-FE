import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  ImageList,
  ImageListItem
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { deleteDoc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useUser } from '../hooks/useLoggedInUser';
import {
  chatsDocument,
  User,
  userBlockedDocument,
  userFollowDocument,
  usersDocument
} from '../utils/firebase';
import useProfilePicture from '../hooks/useProfilePicture';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
    title: 'Bed'
  },
  {
    img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
    title: 'Books'
  },
  {
    img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    title: 'Sink'
  },
  {
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen'
  },
  {
    img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
    title: 'Blinds'
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs'
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop'
  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    title: 'Doors'
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Coffee'
  },
  {
    img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
    title: 'Storage'
  },
  {
    img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
    title: 'Candle'
  },
  {
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    title: 'Coffee table'
  }
];

const Profile = () => {
  const { profileId } = useParams();
  const user = useUser();

  const [profile, setProfile] = useState<User>();
  const [blocked, setBlocked] = useState<boolean>();
  const [follow, setFollow] = useState<boolean>();

  useEffect(() => {
    const getProfile = async () => {
      if (profileId && user?.email) {
        const followDoc = await getDoc(userFollowDocument(user?.email, profileId));
        const blockedDoc = await getDoc(userBlockedDocument(profileId, user?.email));
        if (followDoc.exists()) {
          setFollow(true);
        }
        if (blockedDoc.exists()) {
          setBlocked(true);
        }
      }
      if (profileId || user?.email) {
        let userDoc;
        if (profileId) {
          userDoc = usersDocument(profileId);
        } else if (user?.email) {
          userDoc = usersDocument(user.email);
        } else {
          return;
        }
        userDoc = await getDoc(userDoc);
        if (userDoc.exists()) {
          setProfile(userDoc.data());
        } else {
          console.log('No such document!');
        }
      }
    };
    getProfile();
  }, [user, profileId]);

  const followHandler = async () => {
    if (user?.email && profileId) {
      await setDoc(userFollowDocument(user?.email, profileId), {
        email: profileId,
        first_name: profile?.first_name,
        last_name: profile?.last_name
      });

      const q1 = await getDoc(chatsDocument(`${user?.email}${profileId}`));
      const q2 = await getDoc(chatsDocument(`${profileId}${user?.email}`));
      if (!q1.exists() && !q2.exists())
        await setDoc(chatsDocument(`${user?.email}${profileId}`), {
          user1: user?.email,
          user2: profileId
        });
      setFollow(true);
    }
  };

  const blockHandler = async () => {
    if (user?.email && profileId) {
      await setDoc(userBlockedDocument(profileId, user?.email), {
        email: profileId,
        first_name: profile?.first_name,
        last_name: profile?.last_name
      });

      const q1 = await getDoc(chatsDocument(`${user?.email}${profileId}`));
      const q2 = await getDoc(chatsDocument(`${profileId}${user?.email}`));
      if (q1.exists()) {
        await deleteDoc(chatsDocument(`${user?.email}${profileId}`));
      }
      if (q2.exists()) {
        await deleteDoc(chatsDocument(`${profileId}${user?.email}`));
      }

      setBlocked(true);
    }
  };

  const photo = useProfilePicture(profile?.photo);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={4}>
        <Card>
          <CardActions>
            {profileId ? (
              <>
                {!follow ? (
                  <Button size="small" onClick={followHandler}>
                    Follow
                  </Button>
                ) : (
                  ''
                )}
                {!blocked ? (
                  <Button size="small" onClick={blockHandler}>
                    Block
                  </Button>
                ) : (
                  ''
                )}
                <Button size="small">Chat</Button>
              </>
            ) : (
              ''
            )}
          </CardActions>
          <CardMedia component="img" image={photo} alt="random" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {profile ? `${profile?.first_name} ${profile?.last_name}` : ''}
            </Typography>
            <Typography>BIRTH</Typography>
            <Typography sx={{ ml: 1, mb: 2 }} variant="body2" color="text.secondary">
              {profile ? `${profile?.birth}` : ''}
            </Typography>
            <Typography>GENDER</Typography>
            <Typography sx={{ ml: 1, mb: 2 }} variant="body2" color="text.secondary">
              {profile ? `${profile?.gender}` : ''}
            </Typography>
            <Typography>HEIGHT</Typography>
            <Typography sx={{ ml: 1, mb: 2 }} variant="body2" color="text.secondary">
              {profile ? `${profile?.height}` : ''}
            </Typography>
            <Typography>WEIGHT</Typography>
            <Typography sx={{ ml: 1, mb: 2 }} variant="body2" color="text.secondary">
              {profile ? `${profile?.weight}` : ''}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={8}>
        <Typography gutterBottom variant="h3" component="div">
          Bio
        </Typography>
        <Typography>{profile?.bio}</Typography>
        <Typography gutterBottom variant="h3" component="div">
          Photo Feed
        </Typography>
        <ImageList variant="masonry" cols={3} gap={8}>
          {itemData.map(item => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    </Grid>
  );
};

export default Profile;
