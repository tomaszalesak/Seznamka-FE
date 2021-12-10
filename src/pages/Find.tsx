import { Grid, Chip } from '@mui/material';
import { onSnapshot, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import FindCard from '../components/FindCard';
import { User, usersCollection, UserWithId, usersDocument } from '../utils/firebase';
import { useUser } from '../hooks/useLoggedInUser';

type ChipData = {
  key: number;
  label: string;
  used: boolean;
};

const Find = () => {
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
    });
    // Don't forget to unsubscribe from listening to changes
    return () => {
      unsubscribe();
    };
  }, [loggedInUser]);

  const [chipData, setChipData] = useState<readonly ChipData[]>([
    { key: 0, label: 'Age', used: false },
    { key: 1, label: 'Height', used: false },
    { key: 2, label: 'Weight', used: false },
    { key: 3, label: 'GPS radius', used: false }
  ]);

  const addtoFilter = (chipToAdd: ChipData) => () => {
    setChipData(chips =>
      chips.map(chip => {
        if (chip.key === chipToAdd.key) {
          chip.used = true;
          return chip;
        }
        return chip;
      })
    );
  };

  const deleteFromFilter = (chipToDelete: ChipData) => () => {
    setChipData(chips =>
      chips.map(chip => {
        if (chip.key === chipToDelete.key) {
          chip.used = false;
          return chip;
        }
        return chip;
      })
    );
  };

  return (
    <>
      <Grid sx={{ mb: 2 }} container spacing={2}>
        {chipData.map(data => (
          <Grid key={data.key} item>
            <Chip
              variant={data.used ? 'filled' : 'outlined'}
              label={data.label}
              onClick={addtoFilter(data)}
              onDelete={deleteFromFilter(data)}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        {users.map((user, index) => (
          <FindCard key={index} {...user} />
        ))}
      </Grid>
    </>
  );
};

export default Find;
