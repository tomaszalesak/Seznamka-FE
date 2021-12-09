import { Grid, Chip } from '@mui/material';
import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import FindCard from '../components/FindCard';
import { usersCollection, UserWithId } from '../utils/firebase';

type ChipData = {
  key: number;
  label: string;
  used: boolean;
};

const Find = () => {
  const [users, setUsers] = useState<UserWithId[]>([]);

  useEffect(() => {
    // Call onSnapshot() to listen to changes
    const unsubscribe = onSnapshot(usersCollection, snapshot => {
      // Access .docs property of snapshot
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    // Don't forget to unsubscribe from listening to changes
    return () => {
      unsubscribe();
    };
  }, []);

  const [chipData, setChipData] = useState<readonly ChipData[]>([
    { key: 0, label: 'Angular', used: true },
    { key: 1, label: 'jQuery', used: true },
    { key: 2, label: 'Polymer', used: true },
    { key: 3, label: 'React', used: true },
    { key: 4, label: 'Vue.js', used: true }
  ]);

  const addtoFilter = (chipToDelete: ChipData) => () => {
    setChipData(chips =>
      chips.map(chip => {
        if (chip.key === chipToDelete.key) {
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
