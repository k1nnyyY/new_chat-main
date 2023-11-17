import React, { useEffect, useState } from 'react';
import styles from './Navigation.module.css';
import Users from '../../assets/icUsers.svg';
import Star from '../../assets/icStar.svg';
import Profile from '../../assets/icProfile.svg';
import Pay from '../../assets/icPay.svg';
import Sett from '../../assets/icSett.svg';
import Exit from '../../assets/icExit.svg';
import Mess from '../../assets/icMess.svg';
import Gift from '../../assets/gift.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom';

const Navigation = ({isAlert, setIsAlert}) => {
    const location = useLocation();
    const URL = location.pathname;
    const navigate = useNavigate();
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

    useEffect(()=>{
        
    },[])

    const handleExit = () => {
        localStorage.removeItem('token');
        navigate('/')
        window.location.reload();
    }

  return (
    <nav className={styles.nav}>
        <Link to={'/users'}>
            <button className={(URL==='/users'||URL.substring(0,5)=='/user')?styles.nav_button_active:styles.nav_button}>
                <img src={Users} alt="" />
            </button>
        </Link>
        <Link to={'/events'}>
            <button className={URL==='/events'||URL.substring(0,7)=='/events'?styles.nav_button_active:styles.nav_button}>
                <img src={Star} alt="" />
            </button>
        </Link>
        <Link to={'/profile'}>
            <button className={URL==='/profile'?styles.nav_button_active:styles.nav_button}>
                <img src={Profile} alt="" />
            </button>
        </Link>
        <Link to={'/messages'}>
            <button className={URL==='/messages'?styles.nav_button_active:styles.nav_button}>
                <img src={Mess} alt="" />
            </button>
        </Link>
        <Link to={'/pay'}>
            <button className={URL==='/pay'?styles.nav_button_active:styles.nav_button}>
                <img src={Pay} alt="" />
            </button>
        </Link>
        {/* <Link to={'/settings'}> */}
            <button onClick={showModal} className={URL==='/settings'?styles.nav_button_active:styles.nav_button}>
                <img src={Sett} alt="" />
            </button>

            <Modal title="Настройки" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <label class={styles.form_control}>
                    <input type="checkbox" onClick={(e)=>console.log(e.target.value)} name="checkbox" />
                    Всплывающие уведомления
                </label>            
            </Modal>
            <Link to={'/gift'}>
                <button className={URL==='/gift'?styles.nav_button_active:styles.nav_button}>
                    <img src={Gift} alt="" />
                </button>
            </Link>
        {/* </Link> */}
        <Link to={'/'}>
            <button onClick={handleExit} className={URL==='/exit'?styles.nav_button_active:styles.nav_button}>
                <img src={Exit} alt="" />
            </button>
        </Link>
    </nav>
  )
}

export default Navigation