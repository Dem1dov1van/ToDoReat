import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import { Route, useHistory, useLocation } from 'react-router-dom';
import db from './assettes/db.json'
// import db1 from './assettes/db1.json'

import { List, Tasks, AddList } from './components'

// const altern = lol => {
//   lol.map(item => (
//     console.log(item)
//     console.log(item.id)
//     console.log(item.name)
//   ))
// }


function App() {


  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  let history = useHistory()
  let location = useLocation()
  var arr1 = 1

  //Для localStorage

  localStorage.clear()
  const items1 = localStorage.getItem('db1')
  localStorage.setItem('db',JSON.stringify(db))
  const items = localStorage.getItem('db')
  const arr = JSON.parse(items)

      // Для localStorage:
  
  const embed = (lists, tasks) => {
    // console.log(lists);
    // console.log(tasks);
    lists.map(item => {
      item.tasks = []
      tasks.map(task => {
        if(task.listId == item.id){
          item.tasks.push(task)
        }
        return tasks
      })
      return item
    })
  }
  
  const embedAll = (lists, colors) => {
    lists.map(item => {
      colors.map(color => {
        if(color.id == item.colorId){
          item.color = color
        }
        return color
      })
      return item
    })
  }

  embed(arr.lists, arr.tasks)
  embedAll(arr.lists, arr.colors)

  useEffect(() => {
    // Для сервера:
    // axios
    //   .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
    //   .then(({ data }) => {
    //     setLists(data);
    //     console.log(data);
    //   });
      
    // axios.get('http://localhost:3001/colors').then(({ data }) => {
    //   setColors(data);
    // })

    // Для localStorage:
    if(items1){
      var arr1 = JSON.parse(items1)
      embed(arr1.lists, arr1.tasks)
      embedAll(arr1.lists, arr1.colors)
      setLists(arr1.lists);
      setColors(arr.colors);
      return arr1
    }else{
        // Для сервера:
        setLists(arr.lists);
        setColors(arr.colors);
    }
    // setLists(arr.lists);
    // setColors(arr.colors);
  }, []);



  const onAddList = obj => {

    const newLists = [...lists, obj];
    let db1 = {'lists': newLists, 'tasks': arr.tasks, 'colors': arr.colors}
    localStorage.setItem('db1',JSON.stringify(db1))
    setLists(newLists);
  }

  const onAddTask = (listId, taskObj) => {
    if(items1){
      arr1 = JSON.parse(items1)
      const newList = arr1.lists.map(item => {
        if (item.id === listId) {
          console.log(item)
          console.log(taskObj)
          item.tasks = [...item.tasks, taskObj]
          console.log(item.tasks)
        }
        return item;
      });
      let db1 = {'lists': newList, 'tasks': arr.tasks, 'colors': arr.colors}
      localStorage.setItem('db1',JSON.stringify(db1))
      setLists(newList);
    }else{
      const newList = arr.lists.map(item => {
        if (item.id === listId) {
          item.tasks = [...item.tasks, taskObj]
        }
        return item;
      });
      // setLists(newList);
    }
  }

  const onEditListTitle = (id, title) => {
    const newLists = lists.map(item => {
      if (item.id === id) {
        item.name = title
      }
      return item;
    });
    setLists(newLists);
  }

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm('Вы дайствительно хотите удалить задачу?')) {
      const newLists = lists.map(item => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter(task => task.id !== taskId)
        }
        return item;
      });
      setLists(newLists);
      axios
        .delete('http://localhost:3001/tasks/' + taskId, {

        })
        .catch(() => {
          alert('Не удалось удалить задачу')
        });
    }
  }
  const onEditTask = (listId, taskObj) => {

    const newTaskText = window.prompt('Введите новый текст', taskObj.text)
    if (!newTaskText) {
      return;
    }
    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(item => {
          if (item.id === taskObj.id) {
            item.text = newTaskText
          }
          return item
        })
      }
      return list
    })
    setLists(newList)
    axios
      .patch('http://localhost:3001/tasks/' + taskObj.id, {
        text: newTaskText
      })
      .catch(() => {
        alert('Не удалось обновить текст задачи')
      });
  }
  const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(item => {
          if (item.id === taskId) {
            item.completed = completed
          }
          return item
        })
      }
      return list
    })
    setLists(newList)
    axios
      .patch('http://localhost:3001/tasks/' + taskId, {
        completed
      })
      .catch(() => {
        alert('Не удалось обновить задачу')
      });
  }

  useEffect(() => {
    const listId = location.pathname.split('/lists/')[1]
    if (lists) {
      const list = lists.find(list => list.id === Number(listId))
      setActiveItem(list)
    }
  }, [lists, location.pathname])

  return <div className='todo'>
    <div className='todo__sidebar'>
      <List
        items={[
          {
            active: history.location.pathname === '/',
            icon: (<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001V8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z" fill="black" />
            </svg>),
            name: 'Все задачи'
          }
        ]}
        onClickItem={() => {
          history.push(`/`)
        }}
      />
      {lists ? (
        
        <List
          items={lists}
          onRemove={id => {
            // Для localStorage
            if(items1){
              arr1 = JSON.parse(items1)
              const newLists = arr1.lists.filter(item => item.id !== id)
              let db1 = {'lists': newLists, 'tasks': arr.tasks, 'colors': arr.colors}
              localStorage.setItem('db1',JSON.stringify(db1))
              setLists(newLists);
            }else{
              const newLists = arr.lists.filter(item => item.id !== id)
              setLists(newLists)
            }
            //Для сервера
            // const newLists = lists.filter(item => item.id !== id);
            // setLists(newLists)
          }}
          onClickItem={list => {
            history.push(`/lists/${list.id}`)
          }}
          activeItem={activeItem}
          isRemovable
        />
      ) : (
          'Загрузка...'
        )}
      <AddList
      // Для localStorage
        arr = {arr}
        listLocal={arr.lists}
        // Для Сервера
        colors={colors}
        //
        onAdd={onAddList}
      />
    </div>
    <div className="todo__tasks">
      <Route exact path='/'>
        {lists &&
          lists.map(list => (
            <Tasks
              key={list.id}
              list={list}
              onEditTitle={onEditListTitle}
              onAddTask={onAddTask}
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
              onCompleteTask={onCompleteTask}
              withoutEmpty
            />
          ))
        }
      </Route>
      <Route path='/lists/:id'>
        {lists && activeItem && (
          <Tasks
            list={activeItem}
            onEditTitle={onEditListTitle}
            onAddTask={onAddTask}
            onRemoveTask={onRemoveTask}
            onEditTask={onEditTask}
            onCompleteTask={onCompleteTask}
          />
        )}
      </Route>
    </div>
  </div>;
}

export default App;
