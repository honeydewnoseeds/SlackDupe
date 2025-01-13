import React from 'react';
import {useContext} from 'react';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Grid} from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from 'react-router-dom';
import cworkspaceContext from './contexts/CWorkspaceContext';
import channelContext from './contexts/channelWorkspace';

const MobileFooter = () => {
  const history = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [name, setName] = React.useState(user.name);
  const {message} = useContext(channelContext);
  const {setcurrentW} = useContext(cworkspaceContext);

  const goHome = () => {
    history('/workspace');
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('workspace');
    setName('');
    setcurrentW('');
    history('/login');
  };
  return (
    <div>
      <AppBar
        className='footer'
        sx={{
          top: 'auto',
          bottom: 0,
          backgroundColor: 'transparent',
          boxShadow: 0}}>
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={6} justifyContent='flex-start'>
              <IconButton
                aria-label="home"
                disabled={message}
                onClick={goHome}
              >
                <HomeIcon/>
              </IconButton>
            </Grid>
            <Grid item
              xs={6}
              display='flex'
              justifyContent='flex-end'>
              <IconButton
                disabled={!name}
                onClick={logout}
                aria-label="logout"
              >
                <LogoutOutlinedIcon/>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MobileFooter;
