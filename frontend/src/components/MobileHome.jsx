import React from 'react';
import '../App.css';
// import MobileHeader from './MobileHeader';
// import MobileFooter from './MobileFooter';
import menuContext from './contexts/MenuContext';
import cworkspaceContext from './contexts/CWorkspaceContext';
// import workspaceContext from './contexts/WorkspaceContext';
// import userContext from './UserContext';
import {useState} from 'react';
import {CssBaseline} from '@mui/material';
import MobileMenu from './MobileMenu';

/**
 * returns home
 * @return {object} home object
 */
export default function Home() {
  // if we should open the drawer of not
  const [open, setOpen] = useState(false);
  // contaisn workspaces
  // [{name:value, id: value}, {name:value, id: value}...]
  // const [workspaces, setWorkspaces] = React.useState([]);
  // current workspace
  // {name: value, id:valuie}
  const [currentW, setcurrentW] = React.useState({});
  // current channels
  // [{name:value, id: value}, {name:value, id: value}...]
  // const [message, setMessage] = React.useState(true);
  return (
    <menuContext.Provider value={{open, setOpen}}>
      <cworkspaceContext.Provider value={{currentW, setcurrentW}}>
        <div>
          <CssBaseline/>
          <MobileMenu/>
        </div>
      </cworkspaceContext.Provider>
    </menuContext.Provider>
  );
}
