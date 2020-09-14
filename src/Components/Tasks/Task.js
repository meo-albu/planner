import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import CheckTask from './Icons/CheckTask'
import DeleteIcon from './Icons/DeleteIcon'
import EditIcon from './Icons/EditIcon'
import {completeTask, editTask, removeTask, uncompleteTask} from '../../Store/actions/taskActions'
import CloseEditIcon from './Icons/CloseEditIcon'
import ConfirmEditIcon from './Icons/ConfirmEditIcon'
import {motion} from 'framer-motion'

const Task = (props) => {
  const {darkTheme} = useSelector(state => state.themeReducer)
  const dispatch = useDispatch()
  const task = useRef()
  const [taskEdited, setTaskEdited] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    setText(props.text)
  }, [props.text])

  const moveTaskToCompleted = () => {
    if(props.completed) {
      setTimeout(() => {
        dispatch(uncompleteTask(props.id))
      }, 300)
    } else {
      setTimeout(() => {
        task.current.style.animation = 'moveToCompleted 1s forwards'
      }, 500)
  
      setTimeout(() => {
        dispatch(completeTask(props.id))
      }, 1000)
    }
  }

  const deleteATask = () => {
    setTimeout(() => {
      task.current.style.animation = 'deleteTask 0.6s forwards'
    }, 100)

    setTimeout(() => {
      dispatch(removeTask(props.id))
    }, 800)
  }

  const editATask = (e) => {
    e.preventDefault()
    const [editedTask] = e.target.elements
    if(editedTask.value === '') return
    dispatch(editTask(props.id, editedTask.value))
    setTaskEdited(false)
  }
  
  return (
    <Container darkTheme={darkTheme} ref={task} layout>
      <div onClick={moveTaskToCompleted}>
        <CheckTask completed={props.completed} />
      </div>
      {
        taskEdited ?
          <form onSubmit={editATask}>
            <input type="text" name="editedTask" value={text} onChange={e => setText(e.target.value)} />
            <button>
              <ConfirmEditIcon />
            </button>
          </form>
        : props.text
      }
      <div style={{marginLeft: 'auto'}}>
        {props.completed ? 
          <div onClick={deleteATask}>
            <DeleteIcon />
          </div>
        : <div onClick={() => setTaskEdited(!taskEdited)}>
          {taskEdited ? <CloseEditIcon /> : <EditIcon />}
        </div> }
      </div>
    </Container>
  )
}

export default Task

const Container = styled(motion.div)`
  padding: 10px;
  background: ${({darkTheme}) => darkTheme ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.05)'};
  transition: box-shadow 0.1s;
  margin-bottom: 15px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  font-size: 14px;

  @keyframes moveToCompleted {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(60vh);
      opacity: 0.3;
    }
  }

  @keyframes deleteTask {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(-100%);
      opacity: 0;
    }
  }

  > div:first-of-type {
    margin-right: 10px;
    cursor: pointer;
    align-items: center;
    display: flex;

    svg {
      min-width: 20px;
    }
  }

  :hover {
    box-shadow: 1px 1px 7px rgba(0, 0, 0, 0.1);
  }

  form {
    display: flex;
    align-items: center;
    width: 100%;
    margin-right: 10px;

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
`