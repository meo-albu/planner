import app, { db } from '../../Auth/firebase';
import firebase from "firebase/app"
import "firebase/firestore"
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
  db.collection('projects').doc(id)
  .set({
    projectId: id,
    title,
    userId: user.uid,
    color: getRandomColor(),
    createdAt: new Date(),
    stages: []
  }).then(() => {
     db.collection('projects').doc(id)
      .get().then(doc => {
          dispatch({
            type: types.ADD_PROJECT,
            payload: doc.data()
          })
      })
  }).catch(err => console.log(err))
}

export const addStage = (id, title, position) => dispatch => {
   const stageId = uuid()
   const stage = {title, position, cards: [], stageId}
   db.collection('projects').doc(id)
   .update({
      stages: firebase.firestore.FieldValue.arrayUnion(stage) 
   }).then(() => {
      dispatch({
         type: types.ADD_STAGE,
         payload: {
            id, 
            stage: {title, position, cards: [], stageId}
         }
      })
   }).catch(err => console.log(err))
}

export const addCard = (projectId, stageId, title, description, position) => dispatch => {
   const cardId = uuid()
   const card = {title, description, position, cardId}
   let openedProject = JSON.parse(localStorage.getItem('project'))

   openedProject = {
      ...openedProject, 
      stages: openedProject.stages.map(stage => stage.stageId === stageId ? {...stage, cards: [...stage.cards, card]} : stage)
   }

   db.collection('projects').doc(projectId)
   .update({
      stages: openedProject.stages 
   }).then(() => {
      dispatch({
         type: types.ADD_CARD,
         payload: {
            projectId,
            stageId,
            card
         }
      })
   }).catch(err => console.log(err))
}

export const editProject = (id, title) => dispatch => {
  db.collection('projects').doc(id)
  .update({
    title,
  }).then(() => {
      dispatch({
      type: types.EDIT_PROJECT,
      payload: {id,title}
      })
  }).catch(err => console.log(err))
}

export const removeProject = (id) => dispatch => {
   db.collection('projects').doc(id).delete().then(() => {
      dispatch({
         type: types.REMOVE_PROJECT,
         payload: {id}
      })
      dispatch(closeProject())
   })
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