import React from 'react';
import styles from './List.module.css';

const List = () => {
  return (
    <div className={styles.head}>
        <div className={styles.head_start}>ID</div>
        <div className={styles.head_mid}>Название</div>
        <div className={styles.head_mid}>Город</div>
        <div className={styles.head_mid}>Организатор</div>
        <div className={styles.head_mid}>Статус</div>
        <div className={styles.head_end}>Быстрые действия</div>
    </div>
  )
}

export default List