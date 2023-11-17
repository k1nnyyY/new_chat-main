import React, {useEffect, useState, useContext} from 'react';
import styles from './User.module.css';
import Avatar from './../assets/avatar.jpg';
import Edit from './../assets/edit.svg';
import Film from './../assets/film.jpg';
import Serial from './../assets/serial.jpg';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import LoadingSpinner from '../components/LoadingSpinner'
import { useAlert } from 'react-alert'
import { ServiceContext } from './../apolloClient.jsx';
import { GET_MESSAGES_QUERY, GET_MOVIES_BY_ID, READ_MESSAGES_MUTATION } from "./../query/queries";
import Dialog from '../components/Dialog/Dialog';
import config from '../config';
const User = () => {
    const [isModer, setIsModer] = useState(null);
    const { client } = useContext(ServiceContext);
    const [isImageFullscreen, setIsImageFullscreen] = useState(false); // Состояние для увеличенного изображения
    const [activeImg, setActiveImg] = useState(null);      
    let { id } = useParams();
    const [userInfo, setUserInfo] = useState(null);
    const [created, setCreated] = useState('');
    const alert = useAlert();
    const [phone, setPhone ] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail ] = useState('');
    const [username, setUsername ] = useState('');
    const [osVersion, setOsVersion] = useState('');
    const [device, setDevice] = useState('');
    const [messages, setMessages]=useState(null);
    const [movies, setMovies] = useState(null);
    const [serials, setSerials] = useState(null);
    // Обработчик события нажатия клавиш
    const handleKeyDown = (event) => {
        if (isImageFullscreen) {
        if (event.key === 'ArrowLeft') {
            setActiveImg(prevActiveImg => (prevActiveImg > 0 ? prevActiveImg - 1 : userInfo.avatar.length - 1));
        } else if (event.key === 'ArrowRight') {
            setActiveImg(prevActiveImg => (prevActiveImg < userInfo.avatar.length - 1 ? prevActiveImg + 1 : 0));
        }
        }
    };

    // Добавляем слушатель событий при монтировании компонента
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
        document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isImageFullscreen, activeImg]); // Зависимости важны, чтобы слушатель обновлялся при изменении isImageFullscreen или activeImg

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`${config.API_URL}/user/${id}`, {
                username: username,
                phone: phone==='+null'?"":phone,
                email: email,
                birthday: birthday,
            });
            alert.show(<h5>Обновление данных прошло успешно</h5>, {
                type:'success',
                timeout:4000,
              });
            getUserData();
    
            console.log('Успешно обновлено!', response.data);
          } catch (error) {
            alert.show(<h5>{error.message}</h5>, {
                type:'error',
                timeout:4000,
              });
            getUserData();

            console.error('Произошла ошибка:', error);
          }
    }

    useEffect(()=>{
        client.query({
            query: GET_MESSAGES_QUERY,
            variables: {
                page: 1,
                size: 200,
                dialog: "1:"+id,
            }
          }).then(response => {
            setMessages(response.data);
            console.log(response.data)
          }).catch(err=>console.log(err));
    }, [])

    const [temp, setTemp] = useState({
        phone: null,
        email: null,
        username: null,
        birthday: null,
    })

    const getUserData = () => {
        try {
            axios.get(config.API_URL+'/user/'+id).then((res)=>{
                const data = res.data[0];
                console.log(data.statuses);
                setIsModer(data.statuses.base_moderation);
                setUserInfo(data);
                setBirthday(moment(data.birthday).format('DD.MM.YYYY'));
                setCreated(moment(data.created_at).format('DD.MM.YYYY'));
                setUsername(data.firstname+' '+data.lastname);
                setPhone('+'+data.phone_number);
                setEmail(data.email);
                if(res?.data[0]?.movies){
                    client.query({
                        query: GET_MOVIES_BY_ID,
                        variables: {
                            id: res.data[0].movies[0]
                        },
                        context: {
                            clientName: 'profile'
                        }
                    }).then(res=>{
                        console.log(res);
                        setMovies(res.data.findMovieById.info.poster);
                    }).catch(err=>{
                        console.error(err);
                    })
                }

                if(res?.data[0]?.serials){
                    client.query({
                        query: GET_MOVIES_BY_ID,
                        variables: {
                            id: res.data[0].serials[0]
                        },
                        context: {
                            clientName: 'profile'
                        }
                    }).then(res=>{
                        console.log(res);
                        setSerials(res?.data?.findMovieById?.info?.poster);
                    }).catch(err=>{
                        console.error(err);
                    })
                }

                setTemp({
                    phone: '+'+data.phone_number,
                    email: data.email,
                    username: data.firstname+' '+data.lastname,
                    birthday: moment(data.birthday).format('DD.MM.YYYY'),
                })
            });
        } catch (error) {
            console.error(error)
        }
    }

    const changeModeration = (status) => {
        if (status) {
            axios.post(config.API_URL+'/user/cancel/'+id).then(res=>{
                setIsModer(prev=>!prev);
                alert.show(<h5>Обновление данных прошло успешно</h5>, {
                    type:'success',
                    timeout:4000,
                });    
            }).catch(e=>console.error(e))
            console.log('Отмена модерации')
        } else {
            axios.post(config.API_URL+'/user/accept/'+id).then(res=>{
                setIsModer(prev=>!prev);
                alert.show(<h5>Обновление данных прошло успешно</h5>, {
                    type:'success',
                    timeout:4000,
                });    
            }).catch(e=>console.error(e))
            console.log('Одобрение модерации')
        }
    }

    useEffect( ()=>{
        getUserData()
        },[])
    
        if(!userInfo){
        return(
            <LoadingSpinner></LoadingSpinner>
        )
    }

    return (

    <div className={styles.user}>
        <div className={styles.user_left}>
            <div className={styles.user_left_info}>
                <div className={styles.user_left_info_text}>
                    <h2 className={styles.user_left_info_text_title}>Базовая информация</h2>
                    <h4 className={styles.user_left_info_text_id}>#{userInfo.id}</h4>
                </div>
                
                <div className={styles.user_left_info_left}>
                    <div className={styles.user_left_info_left_avatar}>
                        <img src={'https://storage.yandexcloud.net/'+userInfo.avatar[userInfo.avatar.length - 1].path} className={styles.user_left_info_left_avatar_img} alt="" />
                    </div>
                    <div className={styles.user_left_info_left_input}>
                        <h6><img src={Edit} alt="" />Дата рождения</h6>
                        <input className={birthday!==temp.birthday?styles.user_left_info_left_input_changed:''} value={birthday} onChange={e=>setBirthday(e.target.value)} type="text" />         
                    </div>
                    <div className={styles.user_left_info_left_input}>
                        <h6>Статус пользователя</h6>
                        <input disabled value={userInfo.statuses.status} type="text" />         
                    </div>
                </div>
                <div className={styles.user_left_info_right}>
                    <div className={styles.user_left_info_left_input}>
                        <h6><img src={Edit} alt="" />Имя пользователя</h6>
                        <input className={username!==temp.username?styles.user_left_info_left_input_changed:''} value={username} onChange={e=>{setUsername(e.target.value) }} type="text" />         
                    </div>
                    <div className={styles.user_left_info_left_input}>
                        <h6><img src={Edit} alt="" />Телефон</h6>
                        <input placeholder='Номер слитно и без +' className={phone!==temp.phone?styles.user_left_info_left_input_changed:''} value={phone==="+null"?'':phone} onChange={e=>{setPhone(e.target.value)}} type="tel" pattern="[+]{1}[0-9]{11,14}"/>
                    </div>
                    <div className={styles.user_left_info_left_input}>
                        <h6><img src={Edit} alt="" />E-mail</h6>
                        <input className={email!==temp.email?styles.user_left_info_left_input_changed:''} value={email} onChange={e=>setEmail(e.target.value)} type="text" />         
                    </div>
                    <div className={styles.user_left_info_left_input}>
                        <h6>Тип пользователя</h6>
                        <input disabled value={userInfo.type} type="text" />         
                    </div>
                </div>
            </div>
            <div className={styles.user_left_env}>
                <h2>Окружение</h2>
                <div className={styles.user_left_env_input}>
                    <h6>Apple ID Token</h6>
                    <input disabled value={userInfo.apple_id} type="text" />         
                </div>
                <div className={styles.user_left_env_bot}>
                    <div className={styles.user_left_env_bot_input}>
                        <h6>Устройство</h6>
                        <input value={device} disabled type="text" />         
                    </div>
                    <div className={styles.user_left_env_bot_input}>
                        <h6>Версия OS</h6>
                        <input value={osVersion} disabled type="text" />         
                    </div>
                </div>
            </div>
            <div className={styles.user_left_env}>
                <h2>Статистика</h2>
                <div className={styles.user_left_env_input}>
                    <h6>Дата регистрации</h6>
                    <input disabled value={created} type="text" />         
                </div>
                <div className={styles.user_left_env_input}>
                    <h6>Подарки</h6>
                    <input disabled type="text" />         
                </div>
                <div className={styles.user_left_env_input}>
                    <h6>Подписка</h6>
                    <input disabled type="text" />         
                </div>
            </div>
        </div>
        <div className={styles.user_mid}>
            <div className={styles.user_mid_profile}>
                <h2>Профиль</h2>
                <div className={styles.user_mid_profile_photos}>
                    {
                        userInfo.avatar.map((el,i)=>{
                            return (
                                <>
                                    <img onClick={()=>{setIsImageFullscreen(true); setActiveImg(userInfo.avatar.length-i-1)}} src={'https://storage.yandexcloud.net/'+userInfo.avatar[userInfo.avatar.length-i-1].path} alt="" />
                                </>
                            )
                        })
                    }
                </div>
                <div className={styles.user_mid_profile_textarea}>
                    <h6>О себе</h6>
                    <textarea disabled value={userInfo.about_me} type="text" />         
                </div>
                <div className={styles.user_mid_profile_goal}>
                    <div className={styles.user_mid_profile_goal_el}>
                        <h6>Цель знакомства</h6>
                        <input disabled value={userInfo.dating_purpose} type="text" />         
                    </div>
                    {/* <div className={styles.user_mid_profile_goal_el}>
                        <h6>Цель знакомства</h6>
                        <input type="text" />         
                    </div> */}
                </div>
                <div className={styles.user_mid_profile_fav}>
                    {
                        movies?
                            <div className={styles.user_mid_profile_fav_film}>
                                <h6><img src={Edit} alt="" />Любимый фильм</h6>
                                <img className={styles.user_mid_profile_fav_film_el} src={movies?movies:''} alt="" />
                            </div>
                        :
                            <></>
                    }
                    {
                        serials?
                            <div className={styles.user_mid_profile_fav_serial}>
                                <h6><img src={Edit} alt="" />Любимый сериал</h6>
                                <img className={styles.user_mid_profile_fav_serial_el} src={serials?serials:''} alt="" />
                            </div>
                        :
                            <></>
                    }
                </div>
                <div className={styles.user_mid_profile_char}>
                    <div className={styles.user_mid_profile_char_el}>
                        <h6>Интересы</h6>
                        <input disabled value={userInfo.interests ? userInfo?.interests.join(' | ') : ''} type="text" />         
                    </div>
                    <div className={styles.user_mid_profile_char_el}>
                        <h6>Отношение к курению</h6>
                        <input disabled value={userInfo.smoking} type="text" />         
                    </div>
                    <div className={styles.user_mid_profile_char_el}>
                        <h6>Отношение к алкоголю</h6>
                        <input disabled value={userInfo.alcohol} type="text" />         
                    </div>
                    <div className={styles.user_mid_profile_char_el}>
                        <h6>Рост</h6>
                        <input disabled value={userInfo.height} type="text" />         
                    </div>
                    <div className={styles.user_mid_profile_char_el}>
                        <h6>Вес</h6>
                        <input disabled value={userInfo.weight} type="text" />         
                    </div>
                    <div className={styles.user_mid_profile_char_el}>
                        <h6>Телосложение</h6>
                        <input disabled value={userInfo.physique} type="text" />         
                    </div>
                    <div className={styles.user_mid_profile_char_el}>
                        <h6>Глаза</h6>
                        <input disabled value={userInfo.eyes} type="text" />         
                    </div>
                    <div className={styles.user_mid_profile_char_el}>
                        <h6>Цвет волос</h6>
                        <input disabled value={userInfo.hairs} type="text" />         
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.user_right}>
            <button onClick={handleUpdate} className={temp.phone === phone && temp.email === email && temp.username === username && temp.birthday === birthday?styles.user_right_button:styles.user_right_update} disabled={temp.phone === phone && temp.email === email && temp.username === username && temp.birthday === birthday}>Сохранить изменения</button>
            <button onClick={()=>changeModeration(isModer)} disabled={isModer} className={styles.user_right_button}>Подтвердить модерацию</button>
            <button onClick={()=>changeModeration(isModer)} disabled={!isModer} className={styles.user_right_button}>Отклонить модерацию</button>
            <button className={styles.user_right_button}>Посмотреть диалоги пользователя</button>
            <button className={styles.user_right_button}>Просмотреть лайки и совпадения пользователя</button>
            <button className={styles.banned_button}>Заблокировать пользователя</button>
            {
                userInfo.id != 1?
                <div className={styles.user_right_chat}>
                    {
                        messages?.getMessages?
                        <>
                            <Dialog messages={messages.getMessages}></Dialog>
                        </>
                        :
                        <>
                            <Dialog messages={[]}></Dialog>
                        </>
                    }
                </div>
                :
                <></>
            }
        </div>
        {isImageFullscreen && userInfo && (
        <div className={styles.imageFullscreenBackdrop} onClick={()=>{setIsImageFullscreen(false);setActiveImg(null)}}>
          <img
            src={'https://storage.yandexcloud.net/'+userInfo.avatar[activeImg].path}
            className={styles.imageFullscreen}
            alt=""
          />
        </div>
      )}

    </div>
  )
}

export default User