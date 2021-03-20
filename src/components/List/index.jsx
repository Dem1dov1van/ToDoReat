import React from 'react';
import axios from 'axios'

import classNames from 'classnames';
import Badge from '../Badge/index.jsx'
import removeSvg from '../../assettes/img/remove.svg'

// import listSvg from '../assettes/img/list.svg';
import './List.scss'

const List = ({ items, onClick, isRemovable, onRemove, onClickItem, activeItem }) => {

   const removeList = (item) => {
      if (window.confirm('Внатуре? Удаляешь? Не ожидал от тебя такого...')) {
         // Для сервера
         // axios
         //    .delete('http://localhost:3001/lists/' + item.id)
         //    .then(() => {
         //       onRemove(item.id)
         //    });
         // Для localStorage
         onRemove(item.id)
      }
   }
   return (
      <ul onClick={onClick} className='todo__list list'>
         {/* {console.log(items)} */}
         {items.map((item, index) => (
            <li
               key={index}
               onClick={onClickItem ? () => onClickItem(item) : null}
               className={classNames(item.className, { active: 
                  item.active ? item.active : 
                  activeItem && activeItem.id === item.id })}
            >
               {/* {console.log(item)} */}
               <i>
                  {item.icon ? (
                     item.icon
                  ) : (
                        <Badge color={item.color.name} />
                        
                     )}
               </i>
               <span>
                  {item.name}
               </span>
               {isRemovable &&
                  <img
                     onClick={() => removeList(item)}
                     src={removeSvg}
                     className='list__remove-icon'
                     alt="Remove icon" />}
            </li>
         ))}
      </ul>
   );
};

export default List;