import React, {useRef, useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import styles from './Dialog.module.css';
import MessageSend from './MessageSend';
import MessageGet from './MessageGet';
import CusDate from './Date';
import Input from './Input.jsx';

import { SEND_MESSAGE_MUTATION, GET_MESSAGES_QUERY } from "./../../query/queries";
import { ServiceContext } from './../../apolloClient.jsx';

const Dialog = ({messages}) => {
    const { client } = useContext(ServiceContext);
    const dialogRef = useRef(null);
    const { id } = useParams();
    const [animateBorder, setAnimateBorder] = useState(false);
    const [newMessage, setNewMessage] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const dialogElement = dialogRef.current;
        if (dialogElement) {dialogElement.scrollTop = dialogElement.scrollHeight;}
    }, [messages, newMessage]);

    useEffect(()=>{
      console.log(newMessage);
    },[newMessage])

    const handleSubmit = async () => {
      if (message.trim() === '') {
        if(animateBorder){return};
        setAnimateBorder(true);
        setTimeout(() => {setAnimateBorder(false)}, 1000);
      } else {
        console.log(message)
        try {
          if(message.trim() !== ''){
            console.log(message, +id, '1:'+id)
            client.mutate({
              mutation: SEND_MESSAGE_MUTATION,
              variables: {
                  input: {
                    message: message,
                    companion: +id,
                    // dialogToken: '1:'+id,
                  },
              },
            }).then(response => {  
              setNewMessage(newMessage=>[...newMessage, response.data.sendMessage]);
              console.log('Mutation response:', response.data.sendMessage);
            }).catch(error => {
              console.error('Mutation error:', error);
            });
          }
          // if(selectedImage instanceof File){
          //   const files = new FormData;
          //   files.append('file',selectedImage);
          //   client.mutate({
          //     mutation: SEND_IMAGE_MUTATION,
          //     variables: {
          //         input: {
          //           file: files,
          //           companion: props.dialog.companion.id,
          //           dialogToken: props.dialog.token,
          //         },
          //     },
          //     context: {
          //       clientName: 'storage'
          //     }
          //   }).then(response => {
          //     const updatedMessages = [...newMessage, response.data.sendMessage];
          //     setNewMessage(updatedMessages);
          //     console.log('Mutation response:', response.data);
          //   }).catch(error => {
          //     console.error('Mutation error:', error);
          //   });}  
          // setSelectedImage(null)
          // setRotateAddImage(false);
          // setSelectedImagePreview(null)
         
          // const date = Date.now();   
          // const formattedTime = format(date, 'HH:mm');
          // setNewMessage(prev=>[...prev,{
          //   message: message,
          //   createdAt: date,
          //   image: null,
          //   type: 'send',
          //   token: '1:'+id,
          //   ownerId: 1
          //   }])
          // }
        } catch (error) {
          console.error('Dialog.jsx error sending message:', error);
        }
        setMessage('');
      }
    };
  
    const reversedMessages = messages ? messages.slice().sort((a, b) => {return new Date(a.createdAt) - new Date(b.createdAt);}) : null;  
    let currentDate = '';
    let stepDate = '';
  
    if (!reversedMessages){return (<></>)}

    return (
    <>
      <div ref={dialogRef} className={styles.dialog}>
        {
        reversedMessages?.map((el,i)=>{
              if(el.message===null && el.image===null){
                return(
                  <>
                  </>
                )
              }
              const inputDateString = el.createdAt;
              const date = new Date(inputDateString);
              const formattedTime = format(date, 'HH:mm');
              const formattedDate = format(date, 'dd-MM-yyyy');
              currentDate = stepDate;
              if(formattedDate!==currentDate){
                stepDate = formattedDate;
              };
              if(el.ownerId===1){
                return(
                  formattedDate!==currentDate?
                    <>
                      <CusDate key={i*200+12333} date={el.createdAt}/>
                      <MessageSend  element={el} key={i*300+1239} image={el.image} text={el.message} time={formattedTime}/>
                    </>
                  :
                    <>
                      <MessageSend element={el} key={i+1} image={el.image} text={el.message} time={formattedTime}/>
                    </>          
                )
              }
                return(
                  formattedDate!==currentDate?
                    <>
                      <CusDate key={i*100+56} date={el.createdAt}/>
                      <MessageGet key={i*800} image={el.image} text={el.message} time={formattedTime}/>
                    </>
                  :
                    <>
                      <MessageGet key={i*600+63} image={el.image} text={el.message} time={formattedTime}/>
                    </>
                )
              })
            }
            {
  newMessage?.map(function(el,i){
    if((el.message===null && el.image===null) || el.dialog!=='1:'+id){
      return(
        <>
        test
        </>
      )
    }
    const inputDateString = el.createdAt;
    const date = new Date(inputDateString);
    const formattedTime = format(date, 'HH:mm');
    const formattedDate = format(date, 'dd-MM-yyyy');
    currentDate = stepDate;
    if(formattedDate!==currentDate){
      stepDate = formattedDate;
    };
    if(el.ownerId===1){
      return(
        formattedDate!==currentDate?
          <>
            <CusDate key={i*200+12333} date={el.createdAt}/>
            <MessageSend  element={el} key={i*300+1239} image={el.image} text={el.message} time={formattedTime}/>
          </>
        :
          <>
            <MessageSend element={el} key={i+1} image={el.image} text={el.message} time={formattedTime}/>
          </>     
        )}
        return(
          formattedDate!==currentDate?
            <>
              <CusDate key={i*100+56} date={el.createdAt}/>
              <MessageGet key={i*800} image={el.image} text={el.message} time={formattedTime}/>
            </>
          :
            <>
              <MessageGet key={i*600+63} image={el.image} text={el.message} time={formattedTime}/>
            </>
        )
      })
    }
    </div>
    <Input animateBorder={animateBorder} setAnimateBorder={setAnimateBorder} handleSubmit={handleSubmit} message={message} setMessage={setMessage}></Input>
    </>
  )
}

export default Dialog