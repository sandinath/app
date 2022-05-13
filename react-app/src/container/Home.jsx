import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import { Sidebar, UserProfile } from '../components';
import Pins from './Pins';

const Home = () => {

  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();
  const [userID, setUserID] = useState();
  const scrollRef = useRef(null);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(()=> {
    getUserInfo();
  }, [])

  async function getUserInfo() {
    try {
      const response = await fetch('/.auth/me')
      const payload = await response.json()
      const { clientPrincipal } = payload;

      if (clientPrincipal){
        setUser(clientPrincipal)
        userHasAuthenticated(true)
        console.log(`clientPrincipal = 
        ${JSON.stringify(clientPrincipal)}`);
      }
    } catch (error){
      console.error(error)
    }
  }

  useEffect(() =>{
    getUserID()
  }, [user])

  async function getUserID() {
    let url = `https://finalproject-links.azurewebsites.net/api/user-createuser?username=${user.userDetails}&email=${user.userDetails}`
    console.log(url)
    const r = await fetch(url)
    const p = await r.json()
    setUserID(p.id)
    console.log(p.id)
  }

  return (
    <div className="flex bg-gray-50 lg:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden lg:flex h-screen flex-initial">
        <Sidebar userID={userID && userID} user={user && user} />
      </div>
      <div className="flex lg:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(true)} />
          <Link to="/">
          </Link>
          <Link to={`user-profile/${userID}`}>
          </Link>
        </div>

        {toggleSidebar && (
        <div className="fixed w-96 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
          <div className="absolute w-full flex justify-end items-center p-2">
            <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSidebar(false)} />
          </div>
          <Sidebar closeToggle={setToggleSidebar} userID={userID && userID} user={user && user} />
        </div>
        )}

      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userID" element={<UserProfile />} />
          <Route path="/*" element={<Pins userID={userID && userID} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;