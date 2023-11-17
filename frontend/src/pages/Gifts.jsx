import React, { useState, useEffect } from 'react'
import styles from './Gifts.module.css'
import Add from './../assets/add.svg';
import Image from '../assets/imageUpload.svg';
import { Modal } from 'antd';
import axios from 'axios';
import config from '../config';

const Gifts = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

  const [imageDataList, setImageDataList] = useState(null);
  const [imageDataList2, setImageDataList2] = useState(null);
  const imageUrls = ['https://korpustage.ru/gifts/1', 'https://korpustage.ru/gifts/2']; // Замените на ваш URL изображения
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAwMDY4ODY2LCJleHAiOjE3MDc4NDQ4NjZ9.OqPvE_l5MczjoHEc_GIHtVclCE4I8v7jEXSaYHnBk6U'; // Замените на ваш Bearer токен

  const [gifts, setGifts] = useState([]);
  const [flowers, setFlowers] = useState([]);


  useEffect(() => {
    const fetchImages = async (array, setArray) => {
      try {
        const promises = array.map(async (obj) => {
          const response = await fetch('https://korpustage.ru/gifts/'+obj.id, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.blob();
            return {
              name: obj.name,
              amount: obj.amount,
              currency: obj.currency,
              url: 'https://korpustage.ru/gifts/'+obj.id,
              data: URL.createObjectURL(data),
            };
          } else {
            console.error('Failed to fetch image:', response.status, response.statusText);
            return null;
          }
        });

        const imageDataArray = await Promise.all(promises);
        console.log(imageDataArray)
        setArray(imageDataArray.filter((data) => data !== null));
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    axios.get(config.API_URL+'/gifts/gifts')
      .then(res=>{
        console.log(res.data);
        setGifts(res.data);
        fetchImages(res.data, setImageDataList);
      }).catch(err=>{
        console.error(err);
      })

      axios.get(config.API_URL+'/gifts/flowers')
      .then(res=>{
        console.log(res.data);
        setFlowers(res.data);
        fetchImages(res.data, setImageDataList2);
      }).catch(err=>{
        console.error(err);
      })


  }, []);    
  return (
    <div className={styles.gifts}>
        <div className={styles.gifts_left}>
            <h2 className={styles.gifts_left_title}>Цветы</h2>
            <button onClick={showModal} className={styles.chats_list_button}>
                <img src={Add} alt="" />
            </button>
            {imageDataList2 && imageDataList2.map((imageData) => (
                <div key={imageData.url} className={styles.gifts_left_el}>
                  <div>
                    <h3 className={styles.gifts_right_el_title}>{imageData.name}</h3>
                    <div key={imageData.url+'d'}  className={styles.gifts_left_el_div}>
                      <img src={imageData.data} className={styles.gifts_left_el_div_image} alt={`Image from ${imageData.url}`} />
                    </div>
                    <h3 className={styles.gifts_left_el_title}>{imageData.amount+' '+imageData.currency}</h3>
                  </div>
                </div>
              ))}            

            <Modal  title={<span style={{ color: "#ffffff" }}>Создайте комнату</span>}
                    open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className='custom_modal'>
                <div className='div'>
                    <label for="fusk"><img src={Image} alt="" /></label>
                </div>
                <input id="fusk" type="file" style={{display: "none"}}></input>            
                <input placeholder='Введите название...' type="text" />
                <textarea placeholder='Введите описание...' name="" id="" cols="30" rows="10"></textarea>
            </Modal>

        </div>
        <div className={styles.gifts_right}>
            <h2 className={styles.gifts_right_title}>Подарки</h2>
            <button onClick={showModal} className={styles.chats_list_button}>
                <img src={Add} alt="" />
            </button>
              {imageDataList && imageDataList.map((imageData) => (
                <div key={imageData.url} className={styles.gifts_right_el}>
                  <div>
                    <h3 className={styles.gifts_right_el_title}>{imageData.name}</h3>
                    <div key={imageData.url+'d'}  className={styles.gifts_right_el_div}>
                      <img src={imageData.data} className={styles.gifts_right_el_div_image} alt={`Image from ${imageData.url}`} />
                    </div>
                    <h3 className={styles.gifts_right_el_title}>{imageData.amount+' '+imageData.currency}</h3>
                  </div>
                </div>
              ))}            
                <Modal  title={<span style={{ color: "#ffffff" }}>Создайте комнату</span>}
                    open={isModalOpen} onOk={handleOk} onCancel={handleCancel} className='custom_modal'>
                <div className='div'>
                    <label for="fusk"><img src={Image} alt="" /></label>
                </div>
                <input id="fusk" type="file" style={{display: "none"}}></input>            
                <input placeholder='Введите название...' type="text" />
                <textarea placeholder='Введите описание...' name="" id="" cols="30" rows="10"></textarea>
            </Modal>

        </div>
    </div>
  )
}

export default Gifts