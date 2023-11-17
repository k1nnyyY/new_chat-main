import React, {useRef, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import styles from './Comments.module.css';
import MessageSend from './MessageSend';
import MessageGet from './MessageGet';
import CusDate from './Date';
import { format } from 'date-fns';
import Input from './Input.jsx';
import axios from 'axios';
import config from '../../config';

const Comments = ({messages}) => {
    const {id} = useParams();
    const dialogRef = useRef(null);
    const [comments, setComments] = useState([]);
    const [animateBorder, setAnimateBorder] = useState(false);
    const [message, setMessage] = useState('');
    
    useEffect(() => {
      console.log(messages);
      const dialogElement = dialogRef.current;
      if (dialogElement) {
        dialogElement.scrollTop = dialogElement.scrollHeight;
      }
    }, [messages, comments]);

    const handleSubmit = async () => {
      if (message.trim() === '') {
        if(animateBorder){
          return
        };
        setAnimateBorder(true);
        setTimeout(() => {setAnimateBorder(false)}, 1000);
      } else {
        console.log(message);
        axios
          .post(config.API_URL+'/events/comments/'+id,{
            text:message
          }).then(res=>{
            console.log(res.data)
            setComments(prev=>[...prev,res.data[0]]);

          }).catch(err=>{
            console.error(err);
          })

        setMessage('');
      }
    }
    
    
    const reversedMessages = messages;
    let currentDate = '';
    let stepDate = '';
  
    if (!reversedMessages){
        return (<></>)
    }

    return (
    <>
    <div ref={dialogRef} className={styles.dialog}>
        {
            reversedMessages?.map((el,i)=>{
                if(el.comment===null){
                    return(
                      <>
                      </>
                    )
                  }
                  const inputDateString = el.created_at;
                  const date = new Date(inputDateString);
                  const formattedTime = format(date, 'HH:mm');
                  const formattedDate = format(date, 'dd-MM-yyyy');
                  currentDate = stepDate;
                  if(formattedDate!==currentDate){
                    stepDate = formattedDate;
                  };
                  if(el.user_id===1){
                    return(
                        formattedDate!==currentDate?
                        <>
                          <CusDate key={i*200+12333} date={el.created_at}/>
                          <MessageSend  element={el} key={i*300+1239} image={null} text={el.comment} time={formattedTime}/>
                        </>
                        :
                        <>
                          <MessageSend element={el} key={i+1} image={null} text={el.comment} time={formattedTime}/>
                        </>
                      
                    )
                  }
                  return(
                    formattedDate!==currentDate?
                    <>
                      <CusDate key={i*100+56} date={el.created_at}/>
                      <MessageGet element={el} key={i*800} image={null} text={el.comment} time={formattedTime}/>
                    </>
                    :
                    <>
                      <MessageGet element={el} key={i*600+63} image={null} text={el.comment} time={formattedTime}/>
                    </>
                  )
                })
            }
            {
              comments.map((el,i)=>{
                if(el.comment===null){
                  return(
                    <>
                    </>
                  )
                }
                const inputDateString = el.created_at;
                const date = new Date(inputDateString);
                const formattedTime = format(date, 'HH:mm');
                const formattedDate = format(date, 'dd-MM-yyyy');
                currentDate = stepDate;
                if(formattedDate!==currentDate){
                  stepDate = formattedDate;
                };
                if(el.user_id===1){
                  return(
                      formattedDate!==currentDate?
                      <>
                        <CusDate key={i*200+12333} date={el.created_at}/>
                        <MessageSend  element={el} key={i*300+1239} image={null} text={el.comment} time={formattedTime}/>
                      </>
                      :
                      <>
                        <MessageSend element={el} key={i+1} image={null} text={el.comment} time={formattedTime}/>
                      </>
                    
                  )
                }
                return(
                  formattedDate!==currentDate?
                  <>
                    <CusDate key={i*100+56} date={el.created_at}/>
                    <MessageGet element={el} key={i*800} image={null} text={el.comment} time={formattedTime}/>
                  </>
                  :
                  <>
                    <MessageGet element={el} key={i*600+63} image={null} text={el.comment} time={formattedTime}/>
                  </>
                )
              })
          }
    </div>
    <Input handleSubmit={handleSubmit} animateBorder={animateBorder} setAnimateBorder={setAnimateBorder} message={message} setMessage={setMessage}></Input>
    </>
  )
}

export default Comments