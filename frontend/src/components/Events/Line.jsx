import React from 'react';
import styles from './Line.module.css';
import Info from '../../assets/info.svg';
import Mess from '../../assets/user.svg';
import Ban from '../../assets/fav.svg';
import { Link } from 'react-router-dom';

const Line = (props) => {
    const isDark = props.idx % 2 == 0;
    const el = props.info;
  return (
    <div className={styles.line}>
        <div className={isDark?styles.line_start:styles.line_start_light}>{el.id}</div>
        <div className={isDark?styles.line_mid_name:styles.line_mid_light_name} title={el.name}>{el.name}</div>
        <div className={isDark?styles.line_mid:styles.line_mid_light}>{el.city?el.city:'Город не указан'}</div>
        <div className={isDark?styles.line_mid:styles.line_mid_light}>{el.creator.lastname+' '+el.creator.firstname}</div>
        <div className={isDark?styles.line_mid:styles.line_mid_light}>{el.status}</div>
        <div className={isDark?styles.line_end:styles.line_end_light}>
            <Link to={'/events/'+props?.index}>
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