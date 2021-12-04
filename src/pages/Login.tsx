import { Button, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Login = () => (
  <div>
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
        <Typography variant="caption" textAlign="right" sx={{ color: 'error.main' }} />
        <Button
          type="submit"
          variant="outlined"
          onClick={() => {
            true;
          }}
        >
          Sign Up
        </Button>
        <Button type="submit" variant="contained">
          Log In
        </Button>
      </Box>
    </Paper>
  </div>
);

export default Login;
