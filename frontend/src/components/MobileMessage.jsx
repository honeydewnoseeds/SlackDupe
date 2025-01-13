import List from '@mui/material/List';
import {ListItem,
  ListItemButton,
  ListItemText} from '@mui/material';
import {useEffect, useState} from 'react';

const MobileMessage = () => {
  const channel = JSON.parse(localStorage.getItem('channel'));
  const [messages, setMessages] = useState([]);
  const link = 'http://localhost:3010/v0/channel/' + channel.id;
  useEffect(() => {
    fetch(link, {
      method: 'GET',
    })
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((json) => {
          setMessages(json.messages);
        });
  }, [link, messages]);
  return (
    <List>
      {messages.map((m) => (
        <ListItem
          key={m.id}
        >
          <ListItemButton>
            <ListItemText primary={m.message}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
export default MobileMessage;
