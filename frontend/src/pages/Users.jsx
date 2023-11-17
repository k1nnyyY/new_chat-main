import React, { useState, useEffect } from 'react';
import styles from './Users.module.css';
import Search from '../components/Users/Search';
import List from '../components/Users/List';
import Line from '../components/Users/Line';
import axios from 'axios';
import Pagination from '../components/Users/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAlert } from 'react-alert'
import config from '../config';

const Users = () => {
  const alert = useAlert()
  const [users, setUsers] = useState([[]]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersCount, setUsersCount] = useState(0);

  const [sort, setSort] = useState(null);

  const [id, setId] = useState('');
  const [type, setType] = useState('PLACEHOLDER');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('PLACEHOLDER');
  const [isNonWait, setIsNonWait] = useState(false);
  const handleSearch = () => {
    console.log({
      params: {
        id: id,
        firstname: name,
        status: status,
        type: type,
      }
    })
      try {
         axios.get(config.API_URL+'/user', {
          params: {
            id: id.trim(),
            firstname: name.trim(),
            status: status.trim(),
            type: type.trim(),
          }
         }).then((res)=>{
          console.log(res.data);
          setUsersCount(res.data.length);
          setUsers(splitArray(res.data, 6));
          setCurrentPage(1);
          if (res.data.length >0){
            alert.show(<h5>Найдено пользователей: {res.data.length}</h5>, {
              type:'success',
              timeout:4000,
            });
          } else {
            alert.show(<h5>По такому запросу пользователи найдены не были!</h5>, {
              type:'error',
              timeout:4000,
            });
          }
          });
      } catch (error) {
        console.error(error)
      }
    }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  function splitArray(arr, chunkSize) {
    const result = [];
    const array = [...arr];
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        result.push(chunk);
    }
    console.log(result)
    return result;
}

  const handleGetAllUsers = () => {
    try {
      axios.get(config.API_URL+'/user', {})
      .then((res)=>{
       console.log(res.data);
       setUsersCount(res.data.length);
       setUsers(splitArray(res.data, 6));
       setCurrentPage(1);
     });
    } catch (error) {
      console.error(error)
    }
 }

  useEffect(()=>{
    try {
       axios.get(config.API_URL+'/user', {
        params: {
          id: id,
          name: name,
          status: status,
          type: type,
        }
       }).then((res)=>{
        console.log(res.data);
        setUsersCount(res.data.length);
        setUsers(splitArray(res.data, 6));
        setCurrentPage(1);
        console.log(res.data)
      });
    } catch (error) {
      console.error(error)
    }
  },[])

  return (
    <div className={styles.users}>

        <Search handleGetAllUsers={handleGetAllUsers} handleSearch={handleSearch} id={id} setId={setId} name={name} setName={setName} status={status} setStatus={setStatus} type={type} setType={setType}></Search>
        <List setSort={setSort} sort={sort} setUsers={setUsers}></List>
        {
          users[0]?
            users[0][0]?
              users[Array.isArray(users[1])?currentPage-1:0].map((el,i)=>{
                return (
                  <Line user={users[Array.isArray(users[1])?currentPage-1:0][i]} idx={i} key={i}></Line>
                )
              })
            :
              <>
                <LoadingSpinner></LoadingSpinner>            
              </>
          :
          <></>
        }
        {
          usersCount > 6?
          <Pagination         
            totalItems={usersCount}
            itemsPerPage={6}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          ></Pagination>
          :
          <></>
        }
    </div>
  )
}

export default Users