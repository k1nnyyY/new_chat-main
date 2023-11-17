import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import Auth from './pages/Auth';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import Users from './pages/Users';
import User from './pages/User';
import Events from './pages/Events';
import Event from './pages/Event';
import Chats from './pages/Chats';
import Subscribtion from './pages/Subscribtion';
import Gifts from './pages/Gifts';

import { ServiceContext } from './apolloClient.jsx';
import { GET_MY_DIALOGS_QUERY, RECEIVE_MESSAGE_SUBSCRIPTION, USER_PREVIEW_QUERY } from './query/queries.js';
import ChatPage from './pages/ChatPage';


function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("token")==='a87asd8g_HWDJ123&1231'?true:false);
  const [isAlert, setIsAlert] = useState(true);
  const { client, webSocketClient } = useContext(ServiceContext);
  const [dialogs, setDialogs] = useState([]);
  const [user, setUser] = useState({});
  const [lastMessages, setLastMessages] = useState([])

  useEffect(()=>{
    client.query({
      query: GET_MY_DIALOGS_QUERY,
    }).then(response => {
      console.log(response.data.getMyDialogs);
      setDialogs(response.data.getMyDialogs);
      let lastMess = [];
      response.data.getMyDialogs.forEach((v,i)=>{
        console.log(v, i)
        lastMess.push({
          dialog: v.token,
          lastMessage: v.message?.message,
          ownerId: v.message?.ownerId,
          createdAt: v.message?.createdAt,
          isRead: v.message?.isRead,
        });
        console.log(lastMess)
      })
      setLastMessages(lastMess);
      console.log(lastMessages)

    }).catch(error => {
      console.log(error);
    });

    client.query({
      query: USER_PREVIEW_QUERY,
      variables: { asVIP: false },
      context: {
        clientName: 'search',
      },
    }).then(response => {
      console.log(response.data.userPreview);
      setUser(response.data.userPreview);
    }).catch(error => {
      console.log(error);
    });
  },[])


  return (
    <>
          {isAuth && (<Header isAuth={isAuth}></Header>)}
          <div className='main_nav'>
            {isAuth && (<Navigation setIsAlert={setIsAlert} isAlert={isAlert} isAuth={isAuth}></Navigation>)}
            <Routes>
              <Route path='/' element={<Auth setIsAuth={setIsAuth} isAuth={isAuth}></Auth>}></Route>
              {
                isAuth && (
                  <>
                    <Route path='/users' element={<Users isAuth={isAuth}></Users>}></Route>
                    <Route path='/events' element={<Events isAuth={isAuth}></Events>}></Route>
                    <Route path='/user/:id' element={<User isAuth={isAuth}></User>}></Route>
                    <Route path='/events/:id' element={<Event isAuth={isAuth}></Event>}></Route>
                    <Route path='/messages' element={<Chats isAuth={isAuth}></Chats>}></Route>                  
                    <Route path='/pay' element={<Subscribtion></Subscribtion>}></Route>
                    <Route path='/gift' element={<Gifts></Gifts>}></Route>  
                    <Route path='/profile' element={<ChatPage lastMessages={lastMessages} setLastMessages={setLastMessages} dialogs={dialogs} setDialogs={setDialogs} user={user}></ChatPage>}  />        
                  </>
                )
              }
            </Routes>
          </div>
    </>
  )
}

export default App
