import React from 'react';
import styles from './Line.module.css';
import Info from '../../assets/info.svg';
import Mess from '../../assets/mess.svg';
import Ban from '../../assets/ban.svg';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Line = (props) => {
    const user = props.user;
    const birthday = moment(user.birthday).format('DD.MM.YYYY');
    const isDark = props.idx % 2 == 0;
  return (
    <div className={styles.line}>
        <div className={isDark?styles.line_start:styles.line_start_light}>{user.id}</div>
        <div className={isDark?styles.line_mid:styles.line_mid_light}>
          <div className={styles.line_mid_img} >
            {
              user?.avatars ?
              <img src={'https://storage.yandexcloud.net/'+user.avatars[0]} alt="" />
              :
              <></>
            }
          </div>
          {user.firstname+' '+user.lastname}</div>
        <div className={isDark?styles.line_mid:styles.line_mid_light}>{birthday}</div>
        <div className={isDark?styles.line_mid:styles.line_mid_light}>{user.type}</div>
        <div className={isDark?styles.line_mid:styles.line_mid_light}>{user.status}</div>
        <div className={isDark?styles.line_end:styles.line_end_light}>
            <Link to={'/user/'+user.id}>
              <button className={styles.line_end_light_button}>
                  <img src={Info} alt="" />
              </button>
            </Link>
            <button className={styles.line_end_light_button}><img src={Mess} alt="" /></button>
            <button className={styles.line_end_red_button}><img src={Ban} alt="" /></button>
        </div>
    </div>
  )
}

export default Line