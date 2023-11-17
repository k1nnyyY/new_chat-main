import React, {useRef, useEffect} from 'react'
import styles from './Chat.module.css';
import MessageSend from './MessageSend';
import MessageGet from './MessageGet';
import CusDate from './Date';
import { format } from 'date-fns';
import Input from './Input.jsx';

const Chat = ({messages}) => {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialogElement = dialogRef.current;
        if (dialogElement) {
          dialogElement.scrollTop = dialogElement.scrollHeight;
        }
      }, [messages]);

    const reversedMessages = messages ? messages.slice().sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
    }) : null;  
    let currentDate = '';
    let stepDate = '';
  
    if (!reversedMessages){
        return (
            <></>
        )
    }

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
                      <MessageGet avatar={el.owner.avatar.path} key={i*800} image={el.image} text={el.message} time={formattedTime}/>
                    </>
                    :
                    <>
                      <MessageGet avatar={el.owner.avatar.path} key={i*600+63} image={el.image} text={el.message} time={formattedTime}/>
                    </>
                  )
                })
            }
    </div>
    <Input></Input>
    </>
  )
}

export default Chat