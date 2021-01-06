import types from './types'

const validateCoordinates = (coordinates) => {
   const {pageX, pageY} = coordinates

   let X = pageX
   let Y = pageY

   if(window.outerWidth - pageX < 100) {
      X = pageX - (window.outerWidth - pageX)
   }

   if(window.outerHeight - pageY < 250) {
      X = pageY - 250
   }

   return {
      pageX: X,
      pageY: Y + 15
   }
}

export const openSmallMenu = (coordinates) => {
  return {
    type: types.OPEN_SMALLMENU,
    payload: validateCoordinates(coordinates)
  }
}

export const closeSmallMenu = () => {
  return {
    type: types.CLOSE_SMALLMENU
  }
}