import {useState, useEffect} from 'react';
import {Drawer, Toolbar} from '@mui/material';
import menuContext from './contexts/MenuContext';
// import workspaceContext from './contexts/WorkspaceContext';
import cworkspaceContext from './contexts/CWorkspaceContext';
import {useContext} from 'react';
import React from 'react';
import MobileHeader from './MobileHeader';
import List from '@mui/material/List';
import {ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import MobileFooter from './MobileFooter';
import MobileDisplay from './MobileDisplay';

// inspired by MUI drawer example
const MobileMenu = () => {
  const {open, setOpen} = useContext(menuContext);
  // contain workspaces
  // [{name:value, id: value}, {name:value, id: value}...]
  const [workspaces, setWorkspaces] = React.useState([]);
  const [currentW, setcurrentW] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  const link = 'http://localhost:3010/v0/workspace/' + user.id;
  useEffect(() => {
    const prev = localStorage.getItem('workspace');
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
          setWorkspaces(json.workspaces);
          if (prev !== null) {
            setcurrentW(JSON.parse(prev));
            localStorage.removeItem('workspace');
          } else {
            // default the first one
            const current = json.workspaces;
            setcurrentW(current[0]);
          }
        });
  }, [setWorkspaces, link]);
  // const getWorkspace = () => {
  //   // console.log('calling');
  //   const prev = localStorage.getItem('workspace');
  //   fetch(link, {
  //     method: 'GET',
  //   })
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw res;
  //         }
  //         return res.json();
  //       })
  //       .then((json) => {
  //         setWorkspaces(json.workspaces);
  //         if (prev !== null) {
  //           setcurrentW(JSON.parse(prev));
  //           localStorage.removeItem('workspace');
  //         } else {
  //           // default the first one
  //           const current = json.workspaces;
  //           setcurrentW(current[0]);
  //         }
  //       });
  // };
  // {user && getWorkspace();}
  /**
   * set the current workspace
   * @param {object} name
   */
  const changeWorkspace = (name) => {
    const obj = workspaces.filter((w) => w.name === name);
    setcurrentW(obj[0]);
    setOpen(!open);
  };

  return (
    <div>
      <cworkspaceContext.Provider value={{currentW, setcurrentW}}>
        <MobileHeader/>
        <Toolbar/>
        <MobileDisplay/>
        <MobileFooter/>
      </cworkspaceContext.Provider>
      <Drawer
        anchor='top'
        id='workspaces'
        open={open}>
        <Toolbar/>
        <div>
          <List>
            {workspaces.map((w) => (
              <ListItem
                key={w.name}
                disablePadding
              >
                <ListItemButton
                  sx={{textAlign: 'left'}}
                  onClick={() => {
                    changeWorkspace(w.name);
                  }}>
                  <ListItemIcon>
                    <WorkIcon/>
                  </ListItemIcon>
                  <ListItemText primary={w.name}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
};
export default MobileMenu;
