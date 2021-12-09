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
  Checkbox,
  Fab
} from '@mui/material';
import {
  Male,
  MaleOutlined,
  Female,
  FemaleOutlined,
  Transgender,
  TransgenderOutlined,
  Add
} from '@mui/icons-material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setDoc } from 'firebase/firestore';

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

  const [birth, setBirth] = useState<string | null>();
  const [gender, setGender] = useState('female');
  const [picture, setPicture] = useState<File | null>();
  const [imgData, setImgData] = useState<string | undefined>();

  const [preferGender, setPreferGender] = useState(['female']);

  const [heightVal, setHeightVal] = useState<number[]>();
  const [weightVal, setWeightVal] = useState<number[]>();
  const [ageVal, setAgeVal] = useState<number[]>();
  const [gpsVal, setGpsVal] = useState<number>();

  const [submitError, setSubmitError] = useState<string>();

  const handleBirth = (newBirth: string | null) => {
    setBirth(newBirth);
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

  /*const handlePreferGender = (event: ChangeEvent<HTMLInputElement>) => {
    setPreferGender((event.target as HTMLInputElement).value);
  };*/

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
            await signUp(email, password);
            /*await setDoc(usersDocument(email),{
              firstname,
              lastname,
              birth: birth || "",
              bio,
              gender,
              height: +height,
              weight: +weight,
              photos: ["zatim nic"],
              preferences: {
                gender,
                age: '',
                gps_radius: '',
                height: 1,
                weight: 1
              };
            })*/
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
        <TextField label="Username" {...usernameProps} type="input" />
        <TextField label="Password" {...passwordProps} type="password" />
        <TextField label="Confirm Password" type="password" />
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
          <Box sx={{ width: '30%' }}>
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
          <FormLabel component="legend">GPS Radius</FormLabel>
          <Box sx={{ width: '30%' }}>
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
          <FormLabel component="legend">Height</FormLabel>
          <Box sx={{ width: '30%' }}>
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
          <Box sx={{ width: '30%' }}>
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
