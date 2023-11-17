import React, { useEffect, useState } from 'react'
import styles from './Subscribtion.module.css';
import Edit from './../assets/edit.svg';
import config from '../config';
import axios from 'axios';
import LoadingSpinner from './../components/LoadingSpinner'
const Subscribtion = () => {
  const [subs, setSubs] = useState(null);
  const [duration1, setDuration1] = useState('');
  const [duration2, setDuration2] = useState('');
  const [duration3, setDuration3] = useState('');
  const [duration4, setDuration4] = useState('');
  const [duration5, setDuration5] = useState('');
  const [duration6, setDuration6] = useState('');
  const [benefit1, setBenefit1] = useState('');
  const [benefit2, setBenefit2] = useState('');
  const [benefit3, setBenefit3] = useState('');
  const [benefit4, setBenefit4] = useState('');
  const [benefit5, setBenefit5] = useState('');
  const [benefit6, setBenefit6] = useState('');
  const [period1, setPeriod1] = useState('');
  const [period2, setPeriod2] = useState('');
  const [period3, setPeriod3] = useState('');
  const [period4, setPeriod4] = useState('');
  const [period5, setPeriod5] = useState('');
  const [period6, setPeriod6] = useState('');
  const [cost1, setCost1] = useState('');
  const [cost2, setCost2] = useState('');
  const [cost3, setCost3] = useState('');
  const [cost4, setCost4] = useState('');
  const [cost5, setCost5] = useState('');
  const [cost6, setCost6] = useState('');

  useEffect(()=>{
    try {
      axios.get(config.API_URL+'/subscriptions')
        .then(res=>{
          const data = res.data;
          console.log(res.data);
          setSubs(res.data);
          if (Array.isArray(res.data) && res.data.length >= 6) {
            const [sub1, sub2, sub3, sub4, sub5, sub6] = res.data;
  
            setDuration1(sub1.duration);
            setBenefit1(sub1.benefit);
            setPeriod1(sub1.duration_period);
            setCost1(sub1.amount);
  
            setDuration2(sub2.duration);
            setBenefit2(sub2.benefit);
            setPeriod2(sub2.duration_period);
            setCost2(sub2.amount);
  
            setDuration3(sub3.duration);
            setBenefit3(sub3.benefit);
            setPeriod3(sub3.duration_period);
            setCost3(sub3.amount);
  
            setDuration4(sub4.duration);
            setBenefit4(sub4.benefit);
            setPeriod4(sub4.duration_period);
            setCost4(sub4.amount);
  
            setDuration5(sub5.duration);
            setBenefit5(sub5.benefit);
            setPeriod5(sub5.duration_period);
            setCost5(sub5.amount);
  
            setDuration6(sub6.duration);
            setBenefit6(sub6.benefit);
            setPeriod6(sub6.duration_period);
            setCost6(sub6.amount);
          }
        }).catch(error=>{
          console.error(error);
        })
    } catch (error) {
      console.error(error);
    }
  },[])

  return (
    <div className={styles.subs}>
      {
        subs!==null?
        <>
        <div className={styles.subs_premium}>
            <h2 className={styles.subs_premium_title}>Premium</h2>
                  <div className={styles.subs_premium_div}>
                    <div className={styles.subs_premium_div_input}>
                      <h6><img src={Edit} alt="" />Длительность подписки</h6>
                      <input value={duration1} className={styles.user_left_info_left_input_changed} type="text" />         
                    </div>
                    <div className={styles.subs_premium_div_select}>
                      <h6 className={styles.subs_premium_div_select_title}>Временной отрезок</h6>
                      <select value={period1} className={styles.subs_premium_div_select_el} name="date" id="">
                            <option disabled selected className={styles.search_line_form_input_select_placeholder} value="PLACEHOLDER">Выбрать</option>
                            <option value="month">Месяц</option>
                      </select>
                    </div>
                    <div className={styles.subs_premium_div_cost}>
                      <div className={styles.subs_premium_div_cost_input}>
                        <h6 className={''}>Сумма</h6>
                        <input value={cost1} className={styles.subs_premium_div_cost_input_el} type="text" />
                      </div>
                      <div className={styles.subs_premium_div_cost_rub}>
                      ₽
                      </div>         
                    </div>
                    <div className={styles.subs_premium_div_v}>
                      <div className={styles.subs_premium_div_v_input}>             
                        <h6>Выгода</h6>
                        <input value={benefit1} className={styles.subs_premium_div_cost_input_el} type="text" /> 
                      </div>
                      <div className={styles.subs_premium_div_v_rub}>
                      %
                      </div>                
                    </div>
                  </div>
                  <div className={styles.subs_premium_div}>
                    <div className={styles.subs_premium_div_input}>
                      <h6><img src={Edit} alt="" />Длительность подписки</h6>
                      <input value={duration2} onChange={''} className={styles.user_left_info_left_input_changed} type="text" />         
                    </div>
                    <div className={styles.subs_premium_div_select}>
                      <h6 className={styles.subs_premium_div_select_title}>Временной отрезок</h6>
                      <select value={period2} className={styles.subs_premium_div_select_el} name="date" id="">
                            <option disabled selected className={styles.search_line_form_input_select_placeholder} value="PLACEHOLDER">Выбрать</option>
                            <option value="month">Месяц</option>
                      </select>
                    </div>
                    <div className={styles.subs_premium_div_cost}>
                      <div className={styles.subs_premium_div_cost_input}>
                        <h6 className={''}>Сумма</h6>
                        <input value={cost2} className={styles.subs_premium_div_cost_input_el} type="text" />
                      </div>
                      <div className={styles.subs_premium_div_cost_rub}>
                      ₽
                      </div>         
                    </div>
                    <div className={styles.subs_premium_div_v}>
                      <div className={styles.subs_premium_div_v_input}>             
                        <h6>Выгода</h6>
                        <input value={benefit2} className={styles.subs_premium_div_cost_input_el} type="text" /> 
                      </div>
                      <div className={styles.subs_premium_div_v_rub}>
                      %
                      </div>                
                    </div>
                  </div>
                  <div className={styles.subs_premium_div}>
                    <div className={styles.subs_premium_div_input}>
                      <h6><img src={Edit} alt="" />Длительность подписки</h6>
                      <input value={duration3} className={styles.user_left_info_left_input_changed} type="text" />         
                    </div>
                    <div className={styles.subs_premium_div_select}>
                      <h6 className={styles.subs_premium_div_select_title}>Временной отрезок</h6>
                      <select value={period3} className={styles.subs_premium_div_select_el} name="date" id="">
                            <option disabled selected className={styles.search_line_form_input_select_placeholder} value="PLACEHOLDER">Выбрать</option>
                            <option value="month">Месяц</option>
                      </select>
                    </div>
                    <div className={styles.subs_premium_div_cost}>
                      <div className={styles.subs_premium_div_cost_input}>
                        <h6 className={''}>Сумма</h6>
                        <input value={cost3} className={styles.subs_premium_div_cost_input_el} type="text" />
                      </div>
                      <div className={styles.subs_premium_div_cost_rub}>
                      ₽
                      </div>         
                    </div>
                    <div className={styles.subs_premium_div_v}>
                      <div className={styles.subs_premium_div_v_input}>             
                        <h6>Выгода</h6>
                        <input value={benefit3} className={styles.subs_premium_div_cost_input_el} type="text" /> 
                      </div>
                      <div className={styles.subs_premium_div_v_rub}>
                      %
                      </div>                
                    </div>
                  </div>
        </div>
        <div className={styles.subs_premium}>
            <h2 className={styles.subs_premium_title}>VIP</h2>
            <div className={styles.subs_premium_div}>
              <div className={styles.subs_premium_div_input}>
                <h6><img src={Edit} alt="" />Длительность подписки</h6>
                <input value={duration4} className={styles.user_left_info_left_input_changed} type="text" />         
              </div>
              <div className={styles.subs_premium_div_select}>
                <h6 className={styles.subs_premium_div_select_title}>Временной отрезок</h6>
                <select value={period4} className={styles.subs_premium_div_select_el} name="date" id="">
                      <option disabled selected className={styles.search_line_form_input_select_placeholder} value="PLACEHOLDER">Выбрать</option>
                      
                      <option value="month">Месяц</option>
                </select>
              </div>
              <div className={styles.subs_premium_div_cost}>
                <div className={styles.subs_premium_div_cost_input}>
                  <h6 className={''}>Сумма</h6>
                  <input value={cost4} className={styles.subs_premium_div_cost_input_el} type="text" />
                </div>
                <div className={styles.subs_premium_div_cost_rub}>
                ₽
                </div>         
              </div>
              <div className={styles.subs_premium_div_v}>
                <div className={styles.subs_premium_div_v_input}>             
                  <h6>Выгода</h6>
                  <input value={benefit4} className={styles.subs_premium_div_cost_input_el} type="text" /> 
                </div>
                <div className={styles.subs_premium_div_v_rub}>
                %
                </div>                
              </div>
            </div>
            <div className={styles.subs_premium_div}>
              <div className={styles.subs_premium_div_input}>
                <h6><img src={Edit} alt="" />Длительность подписки</h6>
                <input value={duration5} className={styles.user_left_info_left_input_changed} type="text" />         
              </div>
              <div className={styles.subs_premium_div_select}>
                <h6 className={styles.subs_premium_div_select_title}>Временной отрезок</h6>
                <select value={period5} className={styles.subs_premium_div_select_el} name="date" id="">
                      <option disabled selected className={styles.search_line_form_input_select_placeholder} value="PLACEHOLDER">Выбрать</option>
                      <option value="month">Месяц</option>
                </select>
              </div>
              <div className={styles.subs_premium_div_cost}>
                <div className={styles.subs_premium_div_cost_input}>
                  <h6  className={''}>Сумма</h6>
                  <input value={cost5} className={styles.subs_premium_div_cost_input_el} type="text" />
                </div>
                <div className={styles.subs_premium_div_cost_rub}>
                ₽
                </div>         
              </div>
              <div className={styles.subs_premium_div_v}>
                <div className={styles.subs_premium_div_v_input}>             
                  <h6>Выгода</h6>
                  <input value={benefit5} className={styles.subs_premium_div_cost_input_el} type="text" /> 
                </div>
                <div className={styles.subs_premium_div_v_rub}>
                %
                </div>                
              </div>
            </div>
            <div className={styles.subs_premium_div}>
              <div className={styles.subs_premium_div_input}>
                <h6><img src={Edit} alt="" />Длительность подписки</h6>
                <input value={duration6} className={styles.user_left_info_left_input_changed} type="text" />         
              </div>
              <div className={styles.subs_premium_div_select}>
                <h6 className={styles.subs_premium_div_select_title}>Временной отрезок</h6>
                <select value={period6} className={styles.subs_premium_div_select_el} name="date" id="">
                      <option disabled selected className={styles.search_line_form_input_select_placeholder} value="PLACEHOLDER">Выбрать</option>
                      <option value="month">Месяц</option>
                </select>
              </div>
              <div className={styles.subs_premium_div_cost}>
                <div className={styles.subs_premium_div_cost_input}>
                  <h6 className={''}>Сумма</h6>
                  <input value={cost6} className={styles.subs_premium_div_cost_input_el} type="text" />
                </div>
                <div className={styles.subs_premium_div_cost_rub}>
                ₽
                </div>         
              </div>
              <div className={styles.subs_premium_div_v}>
                <div className={styles.subs_premium_div_v_input}>             
                  <h6>Выгода</h6>
                  <input value={benefit6} className={styles.subs_premium_div_cost_input_el} type="text" /> 
                </div>
                <div className={styles.subs_premium_div_v_rub}>
                %
                </div>                
              </div>
            </div>

        </div>
        </>
        :
        <>
          <LoadingSpinner></LoadingSpinner>
        </>
        }
    </div>
  )
}

export default Subscribtion