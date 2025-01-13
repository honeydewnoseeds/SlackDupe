import React from 'react';
import {useContext} from 'react';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import menuContext from './contexts/MenuContext';
import {Grid} from '@mui/material';
// import userContext from './UserContext';
import Typography from '@mui/material/Typography';
// import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import HomeIcon from '@mui/icons-material/Home';
// import {useNavigate} from 'react-router-dom';
import cworkspaceContext from './contexts/CWorkspaceContext';
// import MobileDisplay from './MobileDisplay';
// import channelContext from './contexts/channelWorkspace';

const MobileHeader = () => {
  // const history = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const {currentW} = useContext(cworkspaceContext);
  const [name] = React.useState(user.name);
  const {open, setOpen} = useContext(menuContext);

  return (
    <div>
      <AppBar
        className='header'
        sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid
              item xs={6}
              justifyContent='flex-start'>
              <IconButton
                aria-label='dropDown'
                onClick={() => setOpen(!open)}
                sx={{color: 'white'}}
              >
                <ExpandMoreIcon id='dropDown'/>
                <Typography>
                  {currentW.name}
                </Typography>
              </IconButton>
            </Grid>
            <Grid
              item xs={6}
              justifyContent='flex-end'
              display='flex'>
              <Typography id='greeting'>
                Hello {name}!
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MobileHeader;
