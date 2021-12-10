import { Grid } from '@mui/material';
import { onSnapshot, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import FindCard from '../components/FindCard';
import { User, usersCollection, UserWithId, usersDocument } from '../utils/firebase';
import { useUser } from '../hooks/useLoggedInUser';

const Following = () => {
  const loggedInUser = useUser();
  const [users, setUsers] = useState<UserWithId[]>([]);
  const [profile, setProfile] = useState<User>();
  const user = useUser();

  useEffect(() => {
    (async () => {
      if (user?.email) {
        const userDoc = usersDocument(user.email);
        const uDoc = await getDoc(userDoc);
        setProfile(uDoc.data());
      }
    })();
  }, []);

  useEffect(() => {
    // Call onSnapshot() to listen to changes
    const unsubscribe = onSnapshot(usersCollection, snapshot => {
      // Access .docs property of snapshot
      setUsers(
        snapshot.docs
          .filter(doc => doc.id !== loggedInUser?.email)
          .map(doc => ({ id: doc.id, ...doc.data() }))
      );
      setUsers(
        snapshot.docs
          .filter(doc => profile?.follow?.find((e: string) => e === doc.id))
          .map(doc => ({ id: doc.id, ...doc.data() }))
      );
    });
    // Don't forget to unsubscribe from listening to changes
    return () => {
      unsubscribe();
    };
  }, [loggedInUser, profile]);

  return (
    <Grid container spacing={4}>
      {users.map((user, index) => (
        <FindCard key={index} {...user} />
      ))}
    </Grid>
  );
};

export default Following;
