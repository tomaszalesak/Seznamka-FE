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
import { useEffect, useState } from 'react';
import { addDoc, onSnapshot, orderBy, query } from 'firebase/firestore';

import { chatMessagesCollection, chatsCollection, ChatWithEmail, Message } from '../utils/firebase';
import { useUser } from '../hooks/useLoggedInUser';

const Chats = () => {
  const loggedInUser = useUser();
  const [selectedChat, setSelectedChat] = useState('');

  const [chats, setChats] = useState<ChatWithEmail[]>([]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [fieldValue, setFieldValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(chatsCollection, snapshot => {
      const result = snapshot.docs
        .filter(
          chat =>
            chat.data().user1 === loggedInUser?.email || chat.data().user2 === loggedInUser?.email
        )
        .map(doc => {
          const secondUser =
            loggedInUser?.email === doc.data().user1 ? doc.data().user2 : doc.data().user1;
          return { email: secondUser, id: doc.id, ...doc.data() };
        });
      setChats(result);
    });
    return () => {
      unsubscribe();
    };
  }, [loggedInUser]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let unsubscribe = () => {};
    if (selectedChat !== '') {
      const q = query(chatMessagesCollection(selectedChat), orderBy('createdAt'));
      unsubscribe = onSnapshot(q, snapshot => {
        const result = snapshot.docs.map(doc => doc.data());
        setMessages(result);
      });
    }
    return () => {
      unsubscribe();
    };
  }, [selectedChat]);

  const handleListItemClick = (index: string) => {
    setSelectedChat(index);
  };

  const addMessage = async () => {
    if (selectedChat !== '')
      await addDoc(chatMessagesCollection(selectedChat), {
        createdAt: new Date(),
        time: new Date().toJSON().slice(0, 10).split('-').reverse().join('.'),
        author: loggedInUser?.email,
        message: fieldValue
      });
    setFieldValue('');
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
          {chats.map(item => (
            <ListItemButton
              key={item.id}
              selected={selectedChat === item.id}
              onClick={() => handleListItemClick(item.id)}
            >
              <ListItemAvatar>
                <Avatar>N</Avatar>
              </ListItemAvatar>
              <ListItemText>{item.email}</ListItemText>
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
          {messages.map((item, index) => (
            <ListItem key={index}>
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    sx={{ textAlign: loggedInUser?.email === item.author ? 'right' : 'left' }}
                    primary={item.message}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ListItemText
                    sx={{ textAlign: loggedInUser?.email === item.author ? 'right' : 'left' }}
                    secondary={item.time}
                  />
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Grid container>
          <Grid item xs={11}>
            <TextField
              id="outlined-basic-email"
              label="Type Something"
              size="small"
              value={fieldValue}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={1} sx={{ textAlign: 'right' }}>
            <Fab color="primary" aria-label="add" size="small" onClick={addMessage}>
              <SendIcon />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Chats;
