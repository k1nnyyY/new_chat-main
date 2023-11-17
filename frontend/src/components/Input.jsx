import React from 'react';
import styles from './Input.module.css';
import Add from '../assets/add.svg';
import Send from '../assets/send.svg';

const Input = () => {
  return (
    <div className={styles.input}>
        <img src={Add} alt="" />
        <input type="text" name="" placeholder='Введите сообщение...' id="" />
        <img src={Send} alt="" />
    </div>
  )
}

export default Input