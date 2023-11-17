import React, {useEffect, useState} from 'react';
import styles from './Event.module.css';
import Avatar from './../assets/event.jpg';
import Edit from './../assets/edit.svg';
import Film from './../assets/film.jpg';
import Serial from './../assets/serial.jpg';
import Input from '../components/Input';
import Map from '../assets/inEvent.jpg';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import MapComponent from '../components/MapComponent'
import LoadingSpinner from '../components/LoadingSpinner'
import Comments from '../components/Comments/Comments';
import Like from '../assets/like.svg';
import { useAlert } from 'react-alert'
import config from '../config';

const Event = () => {
    let { id } = useParams();
    const [event, setEvent] = useState(null);
    const [comments, setComments]=useState(null);
    const [likes, setLikes] = useState([]);
    const [users, setUsers ] = useState(null);
    const alert = useAlert();
    const [name, setName] = useState('');
    const [temp, setTemp] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const onFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    const onFormSubmit = async (event) => {
      event.preventDefault();
  
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
  
        try {
          const response = await axios.post(config.API_URL+'/files/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          setSelectedFile(null);
          console.log('File uploaded successfully:', response.data);
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    };
    const handleUpdate = async () => {
        try {
            // const response = await axios.put(${config.API_URL}/user/${id}`, {
            //     name: name,
            // });
            alert.show(<h5>Обновление данных прошло успешно</h5>, {
                type:'success',
                timeout:4000,
              });
            getEventData();
    
            // console.log('Успешно обновлено!', response.data);
          } catch (error) {
            alert.show(<h5>{error.message}</h5>, {
                type:'error',
                timeout:4000,
              });
            getUserData();

            console.error('Произошла ошибка:', error);
          }
    }

    const getEventData = () => {
        try {
            axios.get(config.API_URL+'/events/'+id).then((res)=>{
                const data = res.data[0];
                console.log(data);
                setEvent(data);
                setName(data.name);
                setTemp({
                    name: data.name,
                })
                setLikes(data.likes);
                setUsers(data.users);
            });
        } catch (error) {
            console.error(error)
        }
    }

    useEffect( ()=>{
        getEventData();

        try {
            axios.get(config.API_URL+'/events/comments/'+id).then((res)=>{
                console.log(res.data);
                setComments(res.data);
            })
        } catch (error) {
            
        }
      },[])

      if(!event){
        return (
            <LoadingSpinner></LoadingSpinner>
        )
      }

  return (
    <div className={styles.user}>
        <div className={styles.user_left}>
            <div className={styles.user_left_info}>
                <div className={styles.user_left_info_text}>
                    <h2 className={styles.user_left_info_text_title}>Базовая информация</h2>
                    <h4 className={styles.user_left_info_text_id}>#{event?.id}</h4>
                </div>         
                <div className={styles.user_left_info_right}>
                    <div className={styles.user_left_info_left_input}>
                        <h6><img src={Edit} alt="" />Название мероприятия</h6>
                        <input className={name!==temp.name?styles.user_left_info_left_input_changed:''} value={name} onChange={e=>setName(e.target.value)} type="text" />         
                    </div>
                    <div className={styles.user_left_info_left_input}>
                        <h6>Статус мероприятия</h6>
                        <input disabled value={event?.status} type="tel" pattern="[+]{1}[0-9]{11,14}"/>       
                    </div>
                    <div className={styles.user_left_info_left_input}>
                        <h6>Организатор</h6>
                        <input disabled value={event?.creator.firstname+' '+event?.creator.lastname}  type="text" />         
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.user_mid}>
            <div className={styles.user_mid_profile}>
                <h2>О мероприятии</h2>
                <div className={styles.user_mid_profile_photos}>
                    {
                        event?.avatar.map((el,i)=>{
                            return(
                                <img src={'https://storage.yandexcloud.net/'+el.path} alt="" />
                            )
                        })
                    }
                </div>
                <div className={styles.user_mid_profile_goal}>
                    <div className={styles.user_mid_profile_goal_el}>
                        <h6>Дата проведения</h6>
                        <input disabled value={moment(event?.start_datetime).format('DD.MM.YYYY')} type="text" />         
                    </div>
                    <div className={styles.user_mid_profile_goal_el}>
                        <h6>Время проведения</h6>
                        <input disabled value={moment(event?.start_datetime).format('HH:MM')} type="text" />         
                    </div>
                </div>
                <div className={styles.user_mid_profile_goal}>
                    <div className={styles.user_mid_profile_goal_el}>
                        <h6>Город</h6>
                        <input disabled type="text" />         
                    </div>
                    <div className={styles.user_mid_profile_goal_el}>
                        <h6>Адрес</h6>
                        <input disabled value={event?.address} type="text" />         
                    </div>
                </div>
                <div className={styles.user_mid_profile_textarea}>
                    <h6>Теги</h6>
                    <div className={styles.user_mid_profile_textarea_tags}>
                        {
                            event?.tags.map((el,i)=>{
                                return (
                                    <div className={styles.user_mid_profile_textarea_tags_tag}>{el}</div>        
                                )
                            })
                        }
                    </div>
                </div>
                <div className={styles.user_mid_profile_textarea}>
                    <h6>Описание</h6>
                    <textarea disabled value={event?.description} type="text" />         
                </div>
                {
                    event?
                    <MapComponent wkbString={event.geo_location} address={event.address}/>
                    :
                    <></>
                }
                <div className={styles.user_mid_profile_char}>
                    <h3 className={styles.user_mid_profile_char_title}>Участники</h3>
                    {
                        users?
                        <div className={styles.user_mid_profile_char_users}>
                            {

                                users.map((el,i)=>{
                                    console.log(el)
                                    return (
                                        <div className={styles.user_mid_profile_char_users_el}>
                                            <img src={'https://storage.yandexcloud.net/'+el.avatar[el.avatar.length-1].path} alt="" />
                                            {el.firstname+' '+el.lastname}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        :
                        <></>
                    }
                    {
                        likes?
                        <div className={styles.user_mid_profile_char_likes}>
                            <h4> Нравится: {likes.length}</h4>
                            <img src={Like} alt="" />

                        </div>
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
        <div className={styles.user_right}>
            <button onClick={handleUpdate} className={temp.name === name?styles.user_right_button:styles.user_right_update} disabled={temp.name === name}>Сохранить изменения</button>
            <button>Подтвердить модерацию</button>
            <button>Отклонить модерацию</button>
            <button className={styles.banned_button}>Заблокировать мероприятие</button>
            {/* <form onSubmit={onFormSubmit}>
                <input type="file" onChange={onFileChange}/>
                <button type="submit">Upload</button>
            </form>             */}
            <h3 className={styles.user_right_title}>
                Комментарии:
            </h3> 
            <div className={styles.user_right_chat}>
                {
                    comments?
                    <Comments messages={comments}></Comments>
                    :
                    <><LoadingSpinner></LoadingSpinner></>
                }
            </div>
        </div>
    </div>
  )
}

export default Event