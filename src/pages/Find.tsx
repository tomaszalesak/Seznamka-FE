import { Grid, Chip } from '@mui/material';
import { useState } from 'react';

import FindCard from '../components/FindCard';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

type ChipData = {
  key: number;
  label: string;
  used: boolean;
};

const Find = () => {
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
        {cards.map(card => (
          <Grid item key={card} xs={12} sm={6} md={4}>
            <FindCard />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Find;
