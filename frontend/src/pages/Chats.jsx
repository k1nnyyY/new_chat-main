import React, { useState, useEffect, useContext } from 'react';
import styles from './Chats.module.css';
import Add from '../assets/add.svg';
import Kids from '../assets/icKids.png';
import Image from '../assets/imageUpload.svg';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { Modal } from 'antd';
import { ServiceContext } from './../apolloClient.jsx';
import { GET_CHAT_ROOMS_QUERY, GET_MESSAGES_QUERY } from "./../query/queries";
import Chat from '../components/Chats/Chat';

const Chats = () => {
    const { client } = useContext(ServiceContext);
    
    const [selectedChatIndex, setSelectedChatIndex] = useState(null);
    const [messages, setMessages] = useState(null);
    const [title, setTitle] = useState(null);
    const [chats, setChats] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const getMessages = (chatRoomId) => {
        client.query({
            query: GET_MESSAGES_QUERY,
            variables: {
                page:1,
                size: 20,
                chatRoomId: chatRoomId,
            }
        }).then(res=>{
            console.log(res.data.getMessages)
            setMessages(res.data.getMessages);
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        client.query({
            query: GET_CHAT_ROOMS_QUERY,
          }).then(response => {
            setChats(response.data.getChatRooms);
            getMessages(0);
            console.log(response.data)
          }).catch(err=>console.log(err));    
        }, 
    [])

    const handleSelect = (i) => {
        setSelectedChatIndex(i);
    }

  return (
    <div className={styles.chats}>
        <div className={styles.chats_list}>
            <button onClick={showModal} className={styles.chats_list_button}>
                <img src={Add} alt="" />
            </button>
            <Modal  title={<span style={{ color: "#ffffff" }}>Создайте комнату</span>}
                    open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className='custom_modal'>
                <div className='div'>
                    <label for="fusk"><img src={Image} alt="" /></label>
                </div>
                <input id="fusk" type="file" style={{display: "none"}}></input>            
                <input placeholder='Введите название...' type="text" />
                <textarea placeholder='Введите описание...' name="" id="" cols="30" rows="10"></textarea>
            </Modal>
            <div className={styles.chats_list_items}>
            {
                chats[0]?
                chats.map((el,i)=>{
                    return (
                            <div onClick={()=>{handleSelect(i);getMessages(el.id);setTitle(el.description)}} className={selectedChatIndex===i?styles.chats_list_items_el_active:styles.chats_list_items_el}>
                                <h2>{el.description}</h2>
                                <img src={el.picture} alt="" />
                            </div>
                    )
                })
                :
                <>
                    <LoadingSpinner></LoadingSpinner>
                </>
            }
            </div>
        </div>
        <div className={styles.chats_chat}>
            <div className={styles.chats_chat_head}>
                <h3>{
                    title?
                    title
                    :
                    ""
                    }</h3>
                {/* <h4>44 онлайн</h4> */}
            </div>
            <div className={styles.chats_chat_body}>
                {
                    messages?
                    <Chat messages={messages}></Chat>
                    :
                    <></>
                }
            </div>
        </div>
    </div>
  )
}

export default Chats