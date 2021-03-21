import React, { useState } from 'react'
import axios from 'axios'

import AddSvg from '../../assettes/img/add.svg'

export default function AddTask({ list, onAddTask, arr, items1 }) {

   const [addFormVisible, setAddFormVisible] = useState(false)
   const [inputValue, setInputValue] = useState('')
   const [isLoading, setIsLoading] = useState(false);


   const onToggleButton = () => {
      setAddFormVisible(!addFormVisible)
      setInputValue('')
   }

   function getRandom(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }

   const addTask = () => {
      if (!inputValue) {
         alert('Введите название задачи')
      } else {
         const taskObj = {
            'id': getRandom(100),
            "listId": list.id,
            "text": inputValue,
            completed: false,
         }
         // console.log(taskObj.id);
         // Для localStorage
         onAddTask(list.id, taskObj)
         setAddFormVisible(!addFormVisible)
         setInputValue('')
         // Для сервера
         // setIsLoading(true)
         // axios
         //    .post('http://localhost:3001/tasks', taskObj).then(({ data }) => {
         //       onAddTask(list.id, data)
         //       setAddFormVisible(!addFormVisible)
         //       setInputValue('')
         //    }).catch(() => {
         //       alert('Произошла ошибка при добавлении задачи!')
         //    }).finally(() => {
         //       setIsLoading(false)
         //    });
      }
   }


   return (
      <div className='tasks__add add'>
         { !addFormVisible ?
            (<div onClick={onToggleButton} className='add__new'>
               <img src={AddSvg} alt="Add icon" />
               {}
               <p>Добавить</p>
            </div>
            ) : (
               <div className='add__form'>
                  <input
                     value={inputValue}
                     onChange={e => setInputValue(e.target.value)}
                     type='text'
                     className='popup__input'
                     placeholder='Текст задачи'>
                  </input>
                  <button disabled={isLoading} onClick={addTask} className='button'>
                     {isLoading ? (<p>Добавление...</p>) : (<p>Добавить задачу</p>)}
                  </button>
                  <button onClick={onToggleButton} className='button-grey'>Отмена</button>
               </div>)}
      </div>
   )
}
