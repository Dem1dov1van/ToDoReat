import React from 'react'
import axios from 'axios'

import './Tasks.scss'
import Task from './Task'
import AddTask from './AddTask'

import penIcon from '../../assettes/img/edit.svg'

export default function Tasks({ list, onRemoveTask, onEditTitle, onAddTask, onEditTask, withoutEmpty, onCompleteTask }) {


   const editTitle = () => {
      const newTitle = window.prompt('Введите название списка', list.name)
      if(newTitle){
         onEditTitle(list.id, newTitle);
         axios
            .patch('http://localhost:3001/lists/'+ list.id, {
               name : newTitle
         }).catch(() => {
            alert('Не удалось обновить название')
         });
      }
   }

   // console.log(list.tasks);
   
   return (
      <div className='todo__tasks tasks'>
         <h2 style={{color:list.color.hex}} className='tasks__title'>{list.name}
            <img onClick={() => editTitle(list)} src={penIcon} alt="Edit icon" />
         </h2>
         <div className='tasks__items'>
         {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2> }
         {list.tasks && list.tasks.map(task => 
            <Task 
               key={task.id} 
               onEdit = {onEditTask} 
               list={list} {...task} 
               onRemove={onRemoveTask} 
               onComplete={onCompleteTask}
            />
         )}
         </div>
        <AddTask key={list.id} list={list} onAddTask={onAddTask}/>
      </div>
   )
}
