import app, { db } from '../../Auth/firebase';
import types from './types'
import { v4 as uuid } from 'uuid';

const getRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
}

export const setProjects = () => dispatch => {
  const user = app.auth().currentUser
  const projects = []
  db.collection('projects').where('userId', '==', user.uid)
   .get().then(data => {
      data.forEach(project => {
         projects.push(project.data())
      })
   }).then(() => {
      dispatch({
         type: types.SET_PROJECTS,
         payload: projects
      })
   }).catch(err => console.log(err))
}

export const addProject = (title) => dispatch => {
   const user = app.auth().currentUser
  const id = uuid()
  db.collection('projects').add({
    projectId: id,
    title,
    userId: user.uid,
    color: getRandomColor(),
    createdAt: new Date()
  }).then((docRef) => {
     db.collection('projects').doc(docRef.id)
      .get().then(doc => {
          dispatch({
            type: types.ADD_PROJECT,
            payload: doc.data()
          })
      })
  }).catch(err => console.log(err))
}

export const openProject = (id) => dispatch => {
   dispatch({
      type: types.OPEN_PROJECT,
      payload: {id}
   })
}

export const closeProject = () => dispatch => {
   dispatch({
      type: types.CLOSE_PROJECT
   })
}