import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from '@mui/icons-material';

import { useUser } from '../hooks/useLoggedInUser';
import { signOut } from '../utils/firebase';

const notLoginPages = [{ name: 'Home', link: '/' }];
const loginPages = [
  { name: 'Home', link: '/' },
  { name: 'Find', link: '/find' },
  { name: 'Chats', link: '/chats' }
];
//const loginSettings = [{ name: 'Profile', link: '/profile' }, 'Sign out'];

const Layout: FC = ({ children }) => {
  const user = useUser();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              Dating
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                {user
                  ? loginPages.map(page => (
                      <MenuItem
                        component={Link}
                        to={page.link}
                        key={page.name}
                        onClick={handleCloseNavMenu}
                      >
                        <Typography textAlign="center">{page.name}</Typography>
                      </MenuItem>
                    ))
                  : notLoginPages.map(page => (
                      <MenuItem
                        component={Link}
                        to={page.link}
                        key={page.name}
                        onClick={handleCloseNavMenu}
                      >
                        <Typography textAlign="center">{page.name}</Typography>
                      </MenuItem>
                    ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              Dating
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {user
                ? loginPages.map(page => (
                    <Button
                      component={Link}
                      to={page.link}
                      key={page.name}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page.name}
                    </Button>
                  ))
                : notLoginPages.map(page => (
                    <Button
                      component={Link}
                      to={page.link}
                      key={page.name}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page.name}
                    </Button>
                  ))}
            </Box>

            {user ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <AccountCircle />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    component={Link}
                    to="/profile"
                    key="Profile"
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem
                    component={Button}
                    key="Sign out"
                    onClick={() => {
                      handleCloseNavMenu();
                      signOut();
                    }}
                  >
                    <Typography textAlign="center">Sign out</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button component={Link} to="/login">
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Container component="main" sx={{ py: 8, pt: 11 }} maxWidth="md">
        {children}
      </Container>
    </>
  );
};
export default Layout;
