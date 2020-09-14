import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import AddIcon from './Icons/AddIcon'
import AddNewTaskIcon from './Icons/AddNewTaskIcon'
import NoTasks from './NoTasks'
import Task from './Task'
import { addTask } from '../../Store/actions/taskActions'

const Tasks = () => {
  const tasks = useSelector(state => state.taskReducer.tasks)
  const {secondary, primary} = useSelector(state => state.themeReducer.theme)
  const {darkTheme} = useSelector(state => state.themeReducer)
  const [expanded, setExpanded] = useState(false)
  const [newTaskText, setNewTaskText] = useState('')
  const [newTaskEdited, setNewTaskEdited] = useState(false)
  const dispatch = useDispatch()

  const addNewTask = e => {
    e.preventDefault()
    const [newTask] = e.target.elements
    if(newTask.value === '') return
    dispatch(addTask(newTask.value))
    setNewTaskEdited(false)
    setNewTaskText('')
  }

  return (
    <Container>
      <h3>Tasks</h3>

      <AddTask newTaskEdited={newTaskEdited} darkTheme={darkTheme} >
        <div onClick={() => setNewTaskEdited(!newTaskEdited)}>
          <AddIcon />
        </div>
        {newTaskEdited ? 
          <form onSubmit={addNewTask}>
            <input type="text" name="newTask" value={newTaskText} onChange={e => setNewTaskText(e.target.value)} placeholder='add task' />
            <button>
              <AddNewTaskIcon />
            </button>
          </form>
          : <div onClick={() => setNewTaskEdited(true)} >Add Task</div>}
      </AddTask>

      <Uncompleted>
          {tasks.filter(task => !task.completed).length === 0 && <NoTasks />}
          {tasks.filter(task => !task.completed).map(task => <Task key={task.id} id={task.id} text={task.text} completed={task.completed} /> )}
      </Uncompleted>

      <Completed expanded={expanded}>
        <h4 onClick={() => setExpanded(!expanded)} >Completed Tasks 
          {expanded ?
            <svg width='15' viewBox="0 0 448 512"><path fill={darkTheme ? secondary : primary} d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg>
          : <svg width='15' viewBox="0 0 448 512"><path fill={darkTheme ? secondary : primary} d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path></svg>
          }
        </h4>
        <div>
          {tasks.filter(task => task.completed).map(task => <Task key={task.id} id={task.id} text={task.text} completed={task.completed} /> )}
        </div>
      </Completed>

    </Container>
  )
}

export default Tasks

const Container = styled.div`
  height: 100%;
  font-size: 14px;
  display: flex;
  flex-direction: column;

  h4 {
    margin-bottom: 20px;
    text-transform: uppercase;
    font-size: 13px;
    opacity: 0.7;
    padding: 10px 10px 10px 2px;
    border-bottom: 1px solid ${({theme}) => theme.secondary};
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  h3 {
    margin-bottom: 10px;
    text-transform: uppercase;
    font-size: 13px;
    opacity: 0.7;
    padding: 5px 0 10px;
    border-bottom: 1px solid ${({theme}) => theme.secondary}
  }
`

const Uncompleted = styled.div`
  height: 100%;
  overflow-y: scroll;

  &:hover {
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)' };
    }
  }

  &::-webkit-scrollbar {
      width: 5px;
  }

  &::-webkit-scrollbar-thumb {
      transition: 0.5s;
      border-radius: 5px;
      background: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' };
  }
`

const Completed = styled.div`
  max-height: 40%;
  /* min-height: 10%; */
  height: ${({expanded}) => expanded ? '40%' : '55px'};
  transition: height 0.2s;
  margin-top: auto;
  overflow: hidden;

  @media only screen and (max-width: 700px) {
    max-height: 60%;
    height: ${({expanded}) => expanded ? '60%' : '55px'};
  }

  >div {
    height: calc(100% - 55px);
    overflow-y: scroll;
    transition: transform 0.3s;
    transform-origin: bottom;
    transform: ${({expanded}) => expanded ? 'scaleY(1)' : 'scaleY(0)'};

    &:hover {
      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)' };
      }
    }

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        transition: 0.5s;
        border-radius: 5px;
        background: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' };
    }
  }

`

const AddTask = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  cursor: pointer;
  
  >div {
    transition: transform 0.3s;
    transform-origin: center;
    transform: ${({newTaskEdited}) => newTaskEdited ? 'rotate(45deg) translateY(5px)' : 'rotate(0)'};
  }

  form {
    display: flex;
    align-items: center;
    width: 100%;

    button {
      background: none;
      border: 0;
      cursor: pointer;
    }

    input {
      padding: 0 5px 5px;
      color: ${({theme}) => theme.color};
      border: 0;
      background: transparent;
      margin-right: 10px;
      border-bottom: 1px solid ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' };
      width: 100%;
  
      :focus {
        border-bottom: 1px solid ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)' };
      }
    }
  }

  svg {
    margin-right: 10px;
  }
`

