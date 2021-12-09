import { Button, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useField from '../hooks/useField';
import { signIn } from '../utils/firebase';

const Login = () => {
  const navigate = useNavigate();

  const [email, usernameProps] = useField('email', true);
  const [password, passwordProps] = useField('password', true);

  const [submitError, setSubmitError] = useState<string>();

  return (
    <div>
      <Paper
        component="form"
        onSubmit={async (e: FormEvent) => {
          e.preventDefault();
          try {
            await signIn(email, password);
            navigate('/');
          } catch (err) {
            setSubmitError((err as { message?: string })?.message ?? 'Unknown error occurred');
          }
        }}
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
        <TextField label="Username" {...usernameProps} type="email" />
        <TextField label="Password" {...passwordProps} type="password" />
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
          <Button
            variant="outlined"
            onClick={() => {
              navigate('/register');
            }}
          >
            Register
          </Button>
          <Button type="submit" variant="contained">
            Log In
          </Button>
        </Box>
      </Paper>
    </div>
  );
};

export default Login;
