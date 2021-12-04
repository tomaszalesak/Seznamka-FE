import { Button, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useState } from 'react';

const Login = () => {
  const [isSignUp, setSignUp] = useState(false);

  const [submitError, setSubmitError] = useState<string>();

  return (
    <Paper
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        p: 4,
        gap: 2
      }}
    >
      <Typography variant="h4" component="h2" textAlign="center" mb={3}>
        Login
      </Typography>
      <TextField label="Username" type="email" />
      <TextField label="Password" type="password" />
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
        <Button type="submit" variant="outlined" onClick={() => setSignUp(true)}>
          Sign Up
        </Button>
        <Button type="submit" variant="contained">
          Log In
        </Button>
      </Box>
    </Paper>
  );
};

export default Login;
