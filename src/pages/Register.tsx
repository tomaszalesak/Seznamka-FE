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
  Slider
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setDoc } from 'firebase/firestore';
import { ref, uploadString } from 'firebase/storage';
import { v1 as uuidv1 } from 'uuid';

import { signUp, usersDocument, storage } from '../utils/firebase';
import useField from '../hooks/useField';

const Register = () => {
  const navigate = useNavigate();

  const [email, usernameProps] = useField('email', true);
  const [password, passwordProps] = useField('password', true);
  const [firstname, firstnameProps] = useField('firstname', true);
  const [lastname, lastnameProps] = useField('lastname', true);
  const [bio, bioProps] = useField('bio', true);
  const [height, heightProps] = useField('height', true);
  const [weight, weightProps] = useField('weight', true);
  const [birth, setBirth] = useState(new Date());
  const [gender, setGender] = useState('female');
  const [picture, setPicture] = useState<File | null>();
  const [imgData, setImgData] = useState<string | undefined>();

  const [heightVal, setHeightVal] = useState<number[]>([150, 175]);
  const [weightVal, setWeightVal] = useState<number[]>([50, 70]);
  const [ageVal, setAgeVal] = useState<number[]>([15, 99]);
  const [gpsVal, setGpsVal] = useState<number>(5);

  const [submitError, setSubmitError] = useState<string>();

  const handleBirth = (newBirth: Date | null) => {
    if (newBirth !== null) {
      setBirth(newBirth);
    }
  };
  const handleGender = (event: ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value);
  };
  const handleUpload = (e: { target: { files: FileList | null } }) => {
    if (e.target.files?.[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgData(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleHeight = (_event: Event, newValue: number | number[]) => {
    setHeightVal(newValue as number[]);
  };

  const handleWeight = (_event: Event, newValue: number | number[]) => {
    setWeightVal(newValue as number[]);
  };

  const handleAge = (_event: Event, newValue: number | number[]) => {
    setAgeVal(newValue as number[]);
  };

  const handleGps = (_event: Event, newValue: number | number[]) => {
    setGpsVal(newValue as number);
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
        onSubmit={async (e: FormEvent) => {
          e.preventDefault();
          try {
            const id = uuidv1();
            await setDoc(usersDocument(email), {
              first_name: firstname,
              last_name: lastname,
              birth: birth.toJSON().slice(0, 10).split('-').reverse().join('.'),
              bio,
              gender,
              height: +height,
              weight: +weight,
              photo: `${id}.jpg`,
              preferences: {
                min_age: ageVal[0],
                max_age: ageVal[1] as number,
                gps_radius: gpsVal,
                min_height: heightVal[0],
                max_height: heightVal[1],
                min_weight: weightVal[0],
                max_weight: weightVal[1]
              }
              //follow: [],
              //blocked: []
            });
            if (picture?.name) {
              const storageRef = ref(storage, `images/${id}.jpg`);
              await uploadString(storageRef, imgData as string, 'data_url');
            }
            await signUp(email, password);
            navigate('/');
          } catch (err) {
            setSubmitError((err as { message?: string })?.message ?? 'Unknown error occurred');
          }
        }}
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
        <TextField label="Username" {...usernameProps} type="email" />
        <TextField label="Password" {...passwordProps} type="password" />
        <Divider />
        <Typography variant="h6" component="h6" textAlign="left" mb={3}>
          Personal Info
        </Typography>
        <TextField label="First Name" {...firstnameProps} type="input" />
        <TextField label="Last name" {...lastnameProps} type="input" />
        <DesktopDatePicker
          label="Birth Date"
          inputFormat="dd.MM.yyyy"
          value={birth}
          renderInput={params => <TextField {...params} />}
          onChange={handleBirth}
        />
        <TextField label="Bio" {...bioProps} multiline minRows={3} />
        <FormLabel component="legend">Gender</FormLabel>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            minWidth: '97%',
            p: 4,
            gap: 2,
            paddingTop: 0,
            marginTop: '-2%'
          }}
        >
          <RadioGroup
            aria-label="gender"
            defaultValue="female"
            name="radio-buttons-group"
            value={gender}
            onChange={handleGender}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              minWidth: '40%'
            }}
          >
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          <TextField label="Height (cm)" {...heightProps} type="number" />
          <TextField label="Weight (kg)" {...weightProps} type="number" />
        </Box>
        <FormLabel component="legend">Profile photo</FormLabel>
        <img
          alt=""
          className="playerProfilePic_home_tile"
          src={imgData}
          style={{ maxWidth: 100, height: 'auto' }}
        />
        {!imgData && (
          <>
            <input
              accept="image/*"
              className="input"
              id="raised-button-file"
              multiple
              type="file"
              style={{ display: 'none' }}
              onChange={handleUpload}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span" className="button">
                <Add />
              </Button>
            </label>
          </>
        )}

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
            gap: 2,
            paddingTop: 0,
            marginTop: '-2%'
          }}
        >
          <FormLabel component="legend">Age</FormLabel>
          <Box sx={{ width: '30%' }}>
            <Slider
              aria-label="Always visible"
              value={ageVal}
              onChange={handleAge}
              getAriaValueText={valuetext}
              step={1}
              marks={marksa}
              valueLabelDisplay="auto"
              min={15}
              max={99}
            />
          </Box>
          <FormLabel component="legend">GPS Radius</FormLabel>
          <Box sx={{ width: '30%' }}>
            <Slider
              aria-label="Always visible"
              value={gpsVal}
              onChange={handleGps}
              getAriaValueText={valuetext}
              step={1}
              marks={marksg}
              valueLabelDisplay="auto"
              min={1}
              max={100}
            />
          </Box>
          <FormLabel component="legend">Height</FormLabel>
          <Box sx={{ width: '30%' }}>
            <Slider
              aria-label="Always visible"
              value={heightVal}
              onChange={handleHeight}
              getAriaValueText={valuetext}
              step={1}
              marks={marksh}
              valueLabelDisplay="auto"
              min={100}
              max={250}
            />
          </Box>
          <FormLabel component="legend">Weight</FormLabel>
          <Box sx={{ width: '30%' }}>
            <Slider
              aria-label="Always visible"
              value={weightVal}
              onChange={handleWeight}
              getAriaValueText={valuetext}
              step={1}
              marks={marksw}
              valueLabelDisplay="auto"
              min={30}
              max={200}
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
