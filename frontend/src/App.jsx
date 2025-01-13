/*
 * Copyright (C) 2022-2024 David C. Harrison. All right reserved.
 *
 * You may not use, distribute, publish, or modify this code without
 * the express written permission of the copyright holder.
 */
import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import SignIn from './components/MobileLogin';
import Home from './components/MobileHome';
import MobileChannel from './components/MobileChannel';
import ResponsiveLayout from './components/contexts/ResponsiveLayout';
import channelContext from './components/contexts/channelWorkspace';

/**
 * Simple component with no state.
 *
 * @return {object} JSX
 */
function App() {
  // current channels
  // [{name:value, id: value}, {name:value, id: value}...]
  const user = localStorage.getItem('user');
  const [message, setMessage] = React.useState(true);
  return (
    <channelContext.Provider value={{message, setMessage}}>
      <BrowserRouter>
        <ResponsiveLayout
          renderDefault={() => {
            let rerouting = undefined;
            // let workspace = undefined;
            if (user) {
              rerouting = '/workspace';
              // workspace = <Home/>;
            } else {
              // workspace = <Navigate to='/login'/>;
              rerouting = '/login';
            }
            return (
              <div>
                <Routes>
                  <Route path="/login" exact element={<SignIn/>} />
                  <Route path="/workspace" element={<Home/>} />
                  <Route path="/channel" element={<MobileChannel />} />
                  <Route path="*" element={<Navigate to={rerouting}/>}/>
                </Routes>
              </div>
            );
          }}
          renderNarrow={() => {
            let rerouting = undefined;
            // let workspace = undefined;
            if (user) {
              rerouting = '/workspace';
              // workspace = <Home/>;
            } else {
              // workspace = <Navigate to='/login'/>;
              rerouting = '/login';
            }
            return (
              <div>
                <Routes>
                  <Route path="/login" exact element={<SignIn/>} />
                  <Route path="/workspace" element={<Home/>} />
                  <Route path="/channel" element={<MobileChannel />} />
                  <Route path="/*" element={<Navigate to={rerouting}/>}/>
                </Routes>
              </div>
            );
          }}
        />
      </BrowserRouter>
    </channelContext.Provider>
  );
}

export default App;
