import {
  Button,
  Paper,
  TextField,
  Typography,
  Divider,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  Box,
  Slider,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextareaAutosize,
  Checkbox
} from '@mui/material';
import {
  Male,
  MaleOutlined,
  Female,
  FemaleOutlined,
  Transgender,
  TransgenderOutlined
} from '@mui/icons-material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { ChangeEvent, ChangeEventHandler, FormEvent, useRef, useState } from 'react';

const Register = () => {
  const [isSignUp, setSignUp] = useState(false);

  const [submitError, setSubmitError] = useState<string>();

  const [value, setValue] = useState<string | null>();
  const [heightVal, setHeightVal] = useState<number[]>();
  const [weightVal, setWeightVal] = useState<number[]>();
  const [ageVal, setAgeVal] = useState<number[]>();
  const [gpsVal, setGpsVal] = useState<number>();
  const [gender, setGender] = useState('');

  const handleChange = (newValue: string | null, keyboardInputValue?: string | undefined) => {
    setValue(newValue);
  };

  const marksh = [
    {
      value: 100,
      label: '100 cm'
    },
    {
      value: 250,
      label: '250 cm'
    }
  ];

  const marksw = [
    {
      value: 30,
      label: '30 kg'
    },
    {
      value: 200,
      label: '200 kg'
    }
  ];

  const marksa = [
    {
      value: 15,
      label: '15 y/o'
    },
    {
      value: 99,
      label: '99 y/o'
    }
  ];

  const marksg = [
    {
      value: 1,
      label: '1 km'
    },
    {
      value: 100,
      label: '100 km'
    }
  ];

  const valuetext = (value: number) => `${value}`;

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Paper
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '97%',
          p: 4,
          gap: 2
        }}
      >
        <Typography variant="h4" component="h2" textAlign="center" mb={3}>
          Register
        </Typography>
        <TextField label="Username" type="input" />
        <TextField label="Password" type="password" />
        <TextField label="Confirm Password" type="password" />
        <Divider />
        <Typography variant="h6" component="h6" textAlign="left" mb={3}>
          Personal Info
        </Typography>
        <TextField label="First Name" type="input" />
        <TextField label="Last name" type="input" />
        <DesktopDatePicker
          label="Birth Date"
          inputFormat="dd.MM.yyyy"
          value={value}
          renderInput={params => <TextField {...params} />}
          onChange={handleChange}
        />
        <TextField label="Bio" multiline minRows={3} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            minWidth: '97%',
            p: 4,
            gap: 2
          }}
        >
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup
            aria-label="gender"
            defaultValue="female"
            name="radio-buttons-group"
            sx={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          <TextField label="Height (cm)" type="number" />
          <TextField label="Weight (kg)" type="number" />
        </Box>

        <Divider />
        <Typography variant="h6" component="h6" textAlign="left" mb={3}>
          Preferences
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '97%',
            p: 4,
            gap: 2
          }}
        >
          <FormLabel component="legend">Gender</FormLabel>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <Checkbox icon={<Female />} checkedIcon={<FemaleOutlined />} />
            <Checkbox icon={<Male />} checkedIcon={<MaleOutlined />} />
            <Checkbox icon={<Transgender />} checkedIcon={<TransgenderOutlined />} />
          </Box>
          <FormLabel component="legend">Age</FormLabel>
          <Box sx={{ width: '20%' }}>
            <Slider
              aria-label="Always visible"
              value={ageVal}
              defaultValue={[15, 99]}
              getAriaValueText={valuetext}
              step={1}
              marks={marksa}
              valueLabelDisplay="auto"
              min={15}
              max={99}
            />
          </Box>
          <FormLabel component="legend">Height</FormLabel>
          <Box sx={{ width: '20%' }}>
            <Slider
              aria-label="Always visible"
              value={heightVal}
              defaultValue={[150, 175]}
              getAriaValueText={valuetext}
              step={1}
              marks={marksh}
              valueLabelDisplay="auto"
              min={100}
              max={250}
            />
          </Box>
          <FormLabel component="legend">Weight</FormLabel>
          <Box sx={{ width: '20%' }}>
            <Slider
              aria-label="Always visible"
              value={weightVal}
              defaultValue={[50, 70]}
              getAriaValueText={valuetext}
              step={1}
              marks={marksw}
              valueLabelDisplay="auto"
              min={30}
              max={200}
            />
          </Box>
          <FormLabel component="legend">GPS Radius</FormLabel>
          <Box sx={{ width: '20%' }}>
            <Slider
              aria-label="Always visible"
              value={gpsVal}
              defaultValue={5}
              getAriaValueText={valuetext}
              step={1}
              marks={marksg}
              valueLabelDisplay="auto"
              min={1}
              max={100}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            alignSelf: 'flex-end',
            mt: 2
          }}
        >
          {submitError && (
            <Typography variant="caption" textAlign="right" sx={{ color: 'error.main' }}>
              {submitError}
            </Typography>
          )}
          <Button type="submit" variant="contained">
            Register
          </Button>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default Register;
