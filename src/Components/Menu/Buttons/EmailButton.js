import React from 'react'
import { useSelector } from 'react-redux'

export const EmailButton = (props) => {
  const {primary} = useSelector(state => state.themeReducer.theme)
  return (
    <svg width="15" height="14.204" viewBox="0 0 21.042 14.204">
      <path id="email" d="M.072,17.014V5.326q0-.02.061-.386l6.879,5.884L.153,17.419a1.72,1.72,0,0,1-.081-.406ZM.985,4.129a.874.874,0,0,1,.345-.061H19.856a1.149,1.149,0,0,1,.365.061l-6.9,5.9-.913.73L10.6,12.245,8.8,10.764l-.913-.73Zm.02,14.082,6.919-6.635L10.6,13.747l2.678-2.171L20.2,18.211a.974.974,0,0,1-.345.061H1.33a.919.919,0,0,1-.325-.061Zm13.189-7.386,6.858-5.884a1.211,1.211,0,0,1,.061.386V17.014a1.555,1.555,0,0,1-.061.406Z" transform="translate(-0.072 -4.068)" fill={primary}/>
    </svg>
  )
}