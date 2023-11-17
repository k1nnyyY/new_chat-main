import React, {useState, useEffect} from 'react';
import styles from './Auth.module.css';
import Woman from '../assets/woman.svg';
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert'

const Auth = (props) => {

  useEffect(()=>{
    if(props.isAuth){
      navigate('/users')
    }
  },[])

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const alert = useAlert()
  const handleSubmit = () => {
    if(email!=='admin@korpu.ru' || password !== 'adminforkorpu2023'){
      setError('Некорректные данные. Ошибка доступа!')
    } else {
      props.setIsAuth(true);
      localStorage.setItem('token', 'a87asd8g_HWDJ123&1231');
      setError(null);
      
      navigate("/users");
      alert.show(<h6>Здравствуйте, камилла!</h6>, {
        type:'success',
        timeout:4000,
      });

    }
  } 


  return (
    <div className={styles.auth}>
        <div className={styles.auth_form}>
          
            <h2 className={styles.auth_form_title}>Авторизация</h2>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className={styles.auth_form_email} placeholder='Email'/>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" name="" id="" className={styles.auth_form_pass}  placeholder='Пароль'/>
            {
              error &&
               (<h6 className={styles.auth_form_title_error}>{error}</h6>)
            } 

            <button onClick={handleSubmit} className={styles.auth_form_button}>Войти</button>
        </div>
        <img src={Woman} className={styles.auth_image} alt="" />
    </div>
  )
}

export default Auth