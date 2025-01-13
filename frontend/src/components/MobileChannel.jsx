import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Typography} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {IconButton} from '@mui/material';
import MobileMessage from './MobileMessage';
import {useNavigate} from 'react-router-dom';
import MobileFooter from './MobileFooter2';
import channelContext from './contexts/channelWorkspace';
import {useContext} from 'react';
// import {useEffect} from 'react';

const MobileChannel = () => {
  const channel = JSON.parse(localStorage.getItem('channel'));
  const history = useNavigate();
  const {message, setMessage} = useContext(channelContext);
  {message && setMessage(!message);}
  const goBack = () => {
    setMessage(!message);
    history('/workspace');
  };
  return (
    <div>
      <AppBar
        className='nav'
        sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
        <Toolbar>
          <IconButton
            aria-label='back'
            sx={{color: 'white'}}
            onClick={() => {
              goBack();
            }}>
            <ArrowBackIosNewIcon id='back'/>
          </IconButton>
          <Typography>
            {channel.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      <MobileMessage />
      <MobileFooter/>
    </div>
  );
};

export default MobileChannel;
