import {
  Grid,
  List,
  ListItemButton,
  Avatar,
  ListItemAvatar,
  ListItemText,
  ListItem,
  Divider,
  Fab,
  Paper,
  TextField
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';

const Chats = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };
  return (
    <Grid container component={Paper} spacing={2} sx={{ height: '92vh' }}>
      <Grid item xs={4}>
        <List
          sx={{
            bgcolor: 'background.paper',
            overflow: 'auto',
            height: '80vh'
          }}
          component="nav"
          aria-label="main mailbox folders"
        >
          {[...Array(100).keys()].map(item => (
            <ListItemButton
              key={item}
              selected={selectedIndex === item}
              onClick={() => handleListItemClick(item)}
            >
              <ListItemAvatar>
                <Avatar>N</Avatar>
              </ListItemAvatar>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          ))}
        </List>
      </Grid>
      <Grid item xs={8}>
        <List
          sx={{
            bgcolor: 'background.paper',
            overflow: 'auto',
            height: '80vh'
          }}
        >
          <ListItem key="1">
            <Grid container>
              <Grid item xs={12}>
                <ListItemText sx={{ textAlign: 'right' }} primary="Hey man, What's up ?" />
              </Grid>
              <Grid item xs={12}>
                <ListItemText sx={{ textAlign: 'right' }} secondary="09:30" />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem key="2">
            <Grid container>
              <Grid item xs={12}>
                <ListItemText
                  sx={{ textAlign: 'left' }}
                  primary="Hey, Iam Good! What about you ?"
                />
              </Grid>
              <Grid item xs={12}>
                <ListItemText sx={{ textAlign: 'left' }} secondary="09:31" />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem key="3">
            <Grid container>
              <Grid item xs={12}>
                <ListItemText
                  sx={{ textAlign: 'right' }}
                  primary="Cool. i am good, let's catch up!"
                />
              </Grid>
              <Grid item xs={12}>
                <ListItemText sx={{ textAlign: 'right' }} secondary="10:30" />
              </Grid>
            </Grid>
          </ListItem>
        </List>
        <Divider />
        <Grid container>
          <Grid item xs={11}>
            <TextField id="outlined-basic-email" label="Type Something" size="small" fullWidth />
          </Grid>
          <Grid xs={1} sx={{ textAlign: 'right' }}>
            <Fab color="primary" aria-label="add" size="small">
              <SendIcon />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Chats;
