import React, { useState } from 'react';
import styles from './Search.module.css';

const Search = (props) => {
    // const [id, setId] = useState('');
    // const [type, setType] = useState('PLACEHOLDER');
    // const [name, setName] = useState('');
    // const [status, setStatus] = useState('PLACEHOLDER');


    const handleReset = () => {
        props.setId('');
        props.setType('PLACEHOLDER');
        props.setName('');
        props.setStatus('PLACEHOLDER');
        props.handleGetAllUsers();
    };

  return (
    <div className={styles.search}>
        <div className={styles.search_line}>
            <div className={styles.search_line_form}>
                <h5 className={styles.search_line_form_label}>ID пользователя</h5>
                <input value={props.id} onChange={e=>props.setId(e.target.value)} placeholder='Введите id пользователя' type="search" name="" id="" className={styles.search_line_form_input}/>
            </div>
            <div className={styles.search_line_form}>
                <h5 className={styles.search_line_form_label}>Тип пользователя</h5>
                {/* <input  placeholder='Выберите тип пользователя' type="search" name="" id="" className={styles.search_line_form_input}/> */}
                <select value={props.type} onChange={e=>props.setType(e.target.value)} className={styles.search_line_form_input_select} name="user_types" id="">
                    <option disabled className={styles.search_line_form_input_select_placeholder} value="PLACEHOLDER">Выберите тип пользователя</option>
                    <option value="WAIT">WAIT</option>
                    <option value="REGULAR">REGULAR</option>
                    <option value="PREMIUM">PREMIUM</option>
                    <option value="VIP">VIP</option>
                </select>
            </div>
            <div className={styles.search_line_buttons}>
                {}
                <button disabled={!props.id&&!(props.type!=='PLACEHOLDER')&&!props.name&&!(props.status!=='PLACEHOLDER')} onClick={handleReset} className={styles.search_line_buttons_button_reset}>Сбросить</button>
            </div>
        </div>
        <div className={styles.search_line}>
            <div className={styles.search_line_form}>
                <h5 className={styles.search_line_form_label}>Имя пользователя</h5>
                <input value={props.name} onChange={e=>props.setName(e.target.value)} placeholder='Введите имя пользователя' type="search" name="" id="" className={styles.search_line_form_input}/>
            </div>
            <div className={styles.search_line_form}>
                <h5 className={styles.search_line_form_label}>Статус пользователя</h5>
                <select value={props.status} onChange={e=>props.setStatus(e.target.value)} className={styles.search_line_form_input_select} name="user_types" id="">
                    <option disabled selected className={styles.search_line_form_input_select_placeholder} value="PLACEHOLDER">Выберите статус пользователя</option>
                    <option value="NO_ONBOARDING">NO_ONBOARDING</option>
                    <option value="NO_BASE_USER_INFO">NO_BASE_USER_INFO</option>
                    <option value="ON_MODERATION">ON_MODERATION</option>
                    <option value="MODERATION_REJECTED">MODERATION_REJECTED</option>
                    <option value="NO_PROFILE_USER_INFO">NO_PROFILE_USER_INFO</option>
                    <option value="FULL_ACCESS">FULL_ACCESS</option>
                </select>
            </div>
            <div className={styles.search_line_buttons}>
                <button disabled={!props.id&&!(props.type!=='PLACEHOLDER')&&!props.name&&!(props.status!=='PLACEHOLDER')} onClick={props.handleSearch} className={styles.search_line_buttons_button_reset}>Найти</button>
            </div>
        </div>
    </div>
  )
}

export default Search