import React, {useState} from 'react';
import styles from './Input.module.css';
import Add from '../../assets/add.svg';
import Send from '../../assets/send.svg';

const Input = ({message, setMessage, handleSubmit, animateBorder, setAnimateBorder}) => {

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={styles.input}>
        <img src={Add} alt="" />
        <input onKeyDown={handleKeyDown} className={`${styles.main__head_input} ${animateBorder ? styles.animate_border : ''}`} value={message} onChange={e=>setMessage(e.target.value)} type="text" name="" placeholder='Введите сообщение...' id="" />
        <img src={Send} alt="" />
    </div>
  )
}

export default Input