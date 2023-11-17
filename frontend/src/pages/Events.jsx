import React, {useState, useEffect} from 'react';
import styles from './Events.module.css';
import Search from '../components/Events/Search';
import List from '../components/Events/List';
import Line from '../components/Events/Line';
import axios from 'axios';
import Pagination from '../components/Users/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAlert } from 'react-alert'
import config from '../config';

const Events = () => {
    const alert = useAlert();
    const [events, setEvents] = useState([[]]);
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsCount, setEventsCount] = useState(0);
  
    const [id,setId] = useState('')
    const [name,setName] = useState('')
    const [city,setCity] = useState('PLACEHOLDER')
    const [status,setStatus] = useState('PLACEHOLDER')
    const [creator,setCreator] = useState('PLACEHOLDER')

    const handleSearch = () => {
      const params = {
        params: {
          id: id,
          name: name,
          status: status,
          city: city,
          creator: creator,
        }};
        console.log(params);
        try {
           axios.get(config.API_URL+'/events', {       
          params: {
            id: id,
            name: name,
            status: status,
            city: city,
            creator: creator,
          }})
           .then((res)=>{
            console.log(res.data);
            setEventsCount(res.data.length);
            setEvents(splitArray(res.data, 6));
            setCurrentPage(1);
            if (res.data.length >0){
              alert.show(<h5>Найдено мероприятий: {res.data.length}</h5>, {
                type:'success',
                timeout:4000,
              });
            } else {
              alert.show(<h5>По такому запросу мероприятия найдены не были!</h5>, {
                type:'error',
                timeout:4000,
              });
            }
  
          });
        } catch (error) {
          console.error(error)
        }
      }
  
      const handleGetAllEvents = () => {
        try {
          axios.get(config.API_URL+'/events').then((res)=>{
           console.log(res.data);
           setEventsCount(res.data.length);
           setEvents(splitArray(res.data, 6));
           if (res.data.length >0){
            alert.show(<h5>Найдено мероприятий: {res.data.length}</h5>, {
              type:'success',
              timeout:4000,
            });
          } else {
            alert.show(<h5>По такому запросу мероприятия найдены не были!</h5>, {
              type:'error',
              timeout:4000,
            });
          }

         });
       } catch (error) {
         console.error(error)
       }
       }

    function splitArray(arr, chunkSize) {
      const result = [];
      const array = [...arr];
      for (let i = 0; i < array.length; i += chunkSize) {
          const chunk = array.slice(i, i + chunkSize);
          result.push(chunk);
      }
      return result;
  }
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

    useEffect( ()=>{
      try {
         axios.get(config.API_URL+'/events').then((res)=>{
          console.log(res.data);
          setEventsCount(res.data.length);
          setEvents(splitArray(res.data, 6));

        });
      } catch (error) {
        console.error(error)
      }
    },[])
  
  return (
    <div className={styles.events}>   
        <Search handleGetAllEvents={handleGetAllEvents} handleSearch={handleSearch} id={id} setId={setId} name={name} setName={setName} status={status} setStatus={setStatus} creator={creator} setCreator={setCreator} city={city} setCity={setCity}></Search>
        <List></List>
        {
          events[0]?
            events[0][0]?
              events[Array.isArray(events[1])?currentPage-1:0].map((el,i)=>{
                  return (
                  <Line index={el.id} info={el} idx={i} key={i}></Line>
                  )
              })
            :
              <>
              <LoadingSpinner></LoadingSpinner>
              </>
          :
            <>
            </>
        }
        {
          eventsCount > 6?
          <Pagination         
            totalItems={eventsCount}
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

export default Events