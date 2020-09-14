import types from './types'
import { v4 as uuid } from 'uuid';
import app, { db } from '../../Auth/firebase';

export const getTasks = () => (dispatch) => {
  const user = app.auth().currentUser
  const tasks = []
  db.collection('tasks').where('userId', '==', user.uid)
  .get().then(data => {
    data.forEach(task => {
      const newTask = task.data()
      newTask.id = task.id
      tasks.push(newTask)
    })
  }).then(() => {
    dispatch({
      type: types.SET_TASKS,
      payload: tasks
    })
  }).catch(err => console.log(err))
}

export const addTask = (text) => dispatch => {
  const user = app.auth().currentUser
  const id = uuid()
  db.collection('tasks').doc(id).set({
    completed: false,
    text,
    userId: user.uid
  }).then(() => {
    dispatch({
      type: types.ADD_TASK,
      payload: {
        completed: false,
        text,
        id
      }
    })
  }).catch(err => console.log(err))
}

export const completeTask = (id) => dispatch => {
  db.collection('tasks').doc(id).update({completed: true}).then(() => {
    dispatch({
      type: types.COMPLETE_TASK,
      payload: {id}
    })
  }).catch(err => console.log(err))
}

export const uncompleteTask = (id) => dispatch => {
  db.collection('tasks').doc(id).update({completed: false}).then(() => {
    dispatch({
      type: types.UNCOMPLETE_TASK,
      payload: {id}
    })
  }).catch(err => console.log(err))
}

export const editTask = (id, text) => dispatch => {
  db.collection('tasks').doc(id).update({text}).then(() => {
    dispatch({
      type: types.EDIT_TASK,
      payload: {
        id, text
      }
    })
  }).catch(err => console.log(err))
}

export const removeTask = (id) => dispatch => {
  db.collection('tasks').doc(id).delete().then(() => {
    dispatch({
      type: types.REMOVE_TASK,
      payload: {id}
    })
  }).catch(err => console.log(err))
}