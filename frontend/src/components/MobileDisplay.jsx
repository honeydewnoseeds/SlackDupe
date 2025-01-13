import React from 'react';
import List from '@mui/material/List';
import {useEffect} from 'react';
import {ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText} from '@mui/material';
// import cchannelContext from './contexts/CChannelContext';
import ForumIcon from '@mui/icons-material/Forum';
import cworkspaceContext from './contexts/CWorkspaceContext';
import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';

const MobileDisplay = () => {
  const history = useNavigate();
  const [channels, setChannels] = React.useState([]);
  const {currentW} = useContext(cworkspaceContext);
  // let bool = true;
  const link = 'http://localhost:3010/v0/workspace/' +
    currentW.id + '/channels';
  useEffect(() => {
    // from book example
    if (currentW.id !== undefined) {
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
            setChannels(json.channels);
          });
    }
  }, [currentW.id, link, setChannels]);

  const getChannel = (name) => {
    const obj = channels.filter((c) => c.name === name);
    localStorage.setItem('channel', JSON.stringify(obj[0]));
    localStorage.setItem('workspace', JSON.stringify(currentW));
    history('/channel');
  };

  return (
    <List>
      {channels.map((c) => (
        <ListItem key={c.name} disablePadding>
          <ListItemButton
            sx={{textAlign: 'left'}}
            onClick={() => {
              getChannel(c.name);
            }}>
            <ListItemIcon>
              <ForumIcon/>
            </ListItemIcon>
            <ListItemText primary={c.name}/>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default MobileDisplay;
