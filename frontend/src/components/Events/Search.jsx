import React, {useState, useEffect} from 'react';
import styles from './Search.module.css';
import axios from 'axios';
import config from '../../config';
const Search = (props) => {
    const [creators, setCreators] = useState([]);

    useEffect(()=>{
        axios
            .get(config.API_URL+'/events/creators')
            .then(res=>{
                console.log(res.data);
                setCreators(res.data);
            }).catch(err=>{
                console.error(err);
            })
    },[])

    const handleReset = () => {
        props.setCity('PLACEHOLDER')
        props.setStatus('PLACEHOLDER')
        props.setCreator('PLACEHOLDER')
        props.setId('')
        props.setName('')
        props.handleGetAllEvents()
    }



  return (
    <div className={styles.search}>
        <div className={styles.search_line}>
            <div className={styles.search_line_form}>
                <h5 className={styles.search_line_form_label}>ID мероприятия</h5>
                <input value={props.id} onChange={e=>props.setId(e.target.value)} placeholder='Введите id мероприятия' type="search" name="" id="" className={styles.search_line_form_input}/>
            </div>
            <div className={styles.search_line_form}>
                <h5 className={styles.search_line_form_label}>Город мероприятия</h5>
                <select value={props.city} onChange={e=>props.setCity(e.target.value)} className={styles.search_line_form_input_select} name="events_types" id="">
                    <option disabled selected className={styles.search_line_form_input_select_placeholder} value="PLACEHOLDER">Выберите город мероприятия</option>
                    <option value="ACCEPTED">ACCEPTED</option>
                </select>
            </div>
            <div className={styles.search_line_form}>
                <h5 className={styles.search_line_form_label}>Организатор мероприятия</h5>
                <select value={props.creator} onChange={e=>props.setCreator(e.target.value)} className={styles.search_line_form_input_select} name="events_types" id="">
                    <option disabled selected className={styles.search_line_form_input_select_placeholder} value="PLACEHOLDER">Выберите организатора мероприятия</option>
                    {
                        creators.map((el,i)=>{
                            return (
                                <option value={el.organizer}>{el.organizer}</option>
                            )
                        })
                    }
                </select>
            </div>
        </div>
        <div className={styles.search_line}>
            <div className={styles.search_line_form}>
                <h5 className={styles.search_line_form_label}>Название мероприятия</h5>
                <input  value={props.name} onChange={e=>props.setName(e.target.value)} placeholder='Введите название мероприятия' type="search" name="" id="" className={styles.search_line_form_input}/>
            </div>
            <div className={styles.search_line_form}>
                <h5 className={styles.search_line_form_label}>Статус мероприятия</h5>
                <select value={props.status} onChange={e=>props.setStatus(e.target.value)} className={styles.search_line_form_input_select} name="events_types" id="">
                    <option disabled selected className={styles.search_line_form_input_select_placeholder} value="PLACEHOLDER">Выберите статус мероприятия</option>
                    <option value="ACCEPTED">ACCEPTED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="ON_MODERATION">ON_MODERATION</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="FINISHED">FINISHED</option>
                    <option value="DELETED">DELETED</option>
                </select>
            </div>
            <div className={styles.search_line_buttons}>
                <button onClick={handleReset} className={styles.search_line_buttons_button}>Сбрость</button>
                <button onClick={props.handleSearch} className={styles.search_line_buttons_button}>Найти</button>
            </div>
        </div>
    </div>
  )
}

export default Search