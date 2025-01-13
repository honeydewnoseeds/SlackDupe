import {useContext} from 'react';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Grid} from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from 'react-router-dom';
import channelContext from './contexts/channelWorkspace';

const MobileFooter = () => {
  const history = useNavigate();
  const {message, setMessage} = useContext(channelContext);

  const goHome = () => {
    setMessage(!message);
    history('/workspace');
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
                disabled={true}
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
