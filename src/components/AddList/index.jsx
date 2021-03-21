import React, { useState, useEffect } from 'react';
// import { useState } from 'react';
import List from '../List/index.jsx';
import Badge from '../Badge/index.jsx';
import closeSVG from '../../assettes/img/close.svg';
// import List from '../List/List.jsx';
import axios from 'axios'

import './AddList.scss'

const AddList = ({ colors, onAdd, listLocal, arr, items1 }) => {
   const [visiblePopup, setVisiblePopup] = useState(false);
   const [selectedColor, selectColor] = useState(3);
   const [isLoading, setIsLoading] = useState(false);
   const [inputValue, setInputValue] = useState('');

   useEffect(() => {
      if(Array.isArray(colors))
         selectColor(colors[0].id);
   }, [colors]);

   const onClose = () => {
      setVisiblePopup(false)
      selectColor(colors[0].id);
      setInputValue('')
   };

   const addList = () =>{
      var arr1 = JSON.parse(items1)
      if(!inputValue){
         alert('Мудила, название напиши')
         return;
      }else if(items1){
      // Для localStorage
      if(arr1.lists.length > 0){
         listLocal.push({
            "name": inputValue,
            "colorId": selectedColor,
            "id": arr1.lists[arr1.lists.length - 1].id + 1,
            "tasks": [],
            "color": {}
         })
      }else{
         listLocal.push({
         "name": inputValue,
         "colorId": selectedColor,
         "id": arr.lists[arr.lists.length - 1].id + 1.1,
         "tasks": [],
         "color": {}
      })
      }
      }else{
      listLocal.push({
         "name": inputValue,
         "colorId": selectedColor,
         "id": arr.lists.length + 1,
         "tasks": [],
         "color": {}
      })
      }
      let colorsLocal = arr.colors
      const color = colorsLocal.filter(c => c.id === selectedColor)[0].name;
      let hex = colorsLocal.map(item =>{
         if(item.id == listLocal[listLocal.length - 1].colorId){
            listLocal[listLocal.length - 1].color = {
               'name': color,
               'hex': item.hex
            }
         }
      })
      onAdd(arr.lists[arr.lists.length - 1]);
      onClose();

      // Для сервера
      // setIsLoading(true);
      // axios
      //    .post('http://localhost:3001/lists',{
      //    "name": inputValue,
      //    "colorId": selectedColor
      //    })
      //    .then(
      //       ({ data }) => {
      //          const color = colors.filter(c => c.id === selectedColor)[0].name;
      //          let hex = null
      //          const chooseHex = colors.map(item=>{
      //             // console.log(data);
      //             if(item.id === data.colorId){
      //                hex = item.hex
      //             }
      //             return item
      //          })
      //          const listObj = { ...data, color: { name: color, hex: hex }, tasks:[]};
      //          onAdd(listObj);
      //          onClose();
      //          // console.log(listObj)
      //    })
      //    .catch(() => {
      //       alert('Произошла ошибка при добавлении списка!')
      //    })
      //    .finally(() => {
      //       setIsLoading(false);
      //    });
      };
      
      
   return (
      <div className='todo__add-list add-list'>
         <List
            onClick ={() => setVisiblePopup(!visiblePopup)}
            items={[
               {
                  className: 'list__add-button',
                  icon: <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                     <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>,
                  name: 'Добавить список',
               }
            ]}
         />
         {visiblePopup && (
         <div className='add-list__popup popup'>
            <img 
               src={closeSVG} 
               alt='Close' 
               className='popup__close-btn'
               onClick={()=> onClose()}>
            </img>
            <input 
               value= {inputValue}
               onChange= {e => setInputValue(e.target.value)}
               type='text' 
               className='popup__input' 
               placeholder='Название списка'>
            </input>
            <div className='add-list__popup-colors'>
               {colors && colors.map(color =>(
               <Badge 
                  onClick={()=> selectColor(color.id)} 
                  key={color.id} 
                  color={color.name} 
                  className={selectedColor === color.id && 'active'} 
               />
               ))}
            </div>
            <button 
            onClick= {addList}
            className= 'popup__button button'>
            {isLoading ? 'Добавление...' : 'Добавить'}
         </button>
         </div>)}
      </div>
   );
};

export default AddList;