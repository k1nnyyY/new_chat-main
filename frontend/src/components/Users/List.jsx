import React, {useEffect} from 'react';
import styles from './List.module.css';

const List = ({setSort, sort, setUsers}) => {

  useEffect(()=>{
    // if (sort?.type==='ID' && sort?.status===1){
    //   setUsers(prevUsers=>[...prevUsers].reverse)
    // }
  },[sort])

  const handleSetSort = (type) => {
    if (sort?.type===type) {
      if (sort.status === 0) {
        setSort({
          type:type,
          status:1,
        })
      } else {
        setSort(null);
      }
    } else {
      setSort({
        type:type,
        status:0,
      })
    }
  }

  return (
    <div className={styles.head}>
        <div onClick={()=>handleSetSort("ID")} className={styles.head_start}>ID</div>
        <div onClick={()=>handleSetSort("username")} className={styles.head_mid}>Имя пользователя</div>
        <div onClick={()=>handleSetSort("birthday")} className={styles.head_mid}>Дата рождения</div>
        <div onClick={()=>handleSetSort("type")} className={styles.head_mid}>Тип пользователя</div>
        <div onClick={()=>handleSetSort("status")} className={styles.head_mid}>Статус пользователя</div>
        <div className={styles.head_end}>Быстрые действия</div>
    </div>
  )
}

export default List