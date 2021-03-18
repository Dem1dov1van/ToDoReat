import React from 'react'

import penIcon from '../../assettes/img/edit.svg'
import RemoveSvg from '../../assettes/img/remove.svg'

export default function Task({ id, text, list, completed, onEdit, onRemove, onComplete }) {
   const onChangeCheckbox = e => {
      onComplete( list.id, id, e.target.checked)
      let a = e.target
      !completed ? a.classList.add('line-through') : a.classList.remove('line-through')
      // if(!completed){
      //    a.classList.add('line-through')
      //    console.log(list)
      // }else{
      //    a.classList.remove('line-through')
      //    console.log(list)
      // }

   }

   return (
      <div key={id} className='tasks__item'>
         <div className='checkbox'>
               <input className='input' onChange={onChangeCheckbox} id={`task-${id}`} type="checkbox" checked={completed} />
               <label htmlFor={`task-${id}`}>
                  <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
               </label>
               <p className='item__text'>{ text }</p>
               {/* <input readOnly value={ text } className='item__text'/> */}
               <div className='item__edit' onClick={() => {onEdit(list.id, { id, text })}}>
                  <img 
                     src={penIcon} 
                     alt="Pen icon"
                  />
               </div>
               <div className='item__remove' onClick={() => {onRemove(list.id, id)}}>
                  <img 
                     src={RemoveSvg} 
                     alt="Cross icon"
                  />
               </div>
            </div>
      </div>
   )
}
