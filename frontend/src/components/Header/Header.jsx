import React from 'react';
import styles from './Header.module.css';
import Logo from '../../assets/Logo.svg';

const Header = () => {
  return (
    <div className={styles.header}>
        <img src={Logo} className={styles.header_logo} alt="" />
    </div>
  )
}

export default Header