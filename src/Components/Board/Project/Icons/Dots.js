import { useSelector } from 'react-redux'
import styled from 'styled-components'

const DotsIcon = ({onClick}) => {
  const {secondary, primary} = useSelector(state => state.themeReducer.theme)
  const {darkTheme} = useSelector(state => state.themeReducer)
  return (
    <Container onClick={onClick} width="15" height="10" viewBox="0 0 34.875 10.125">
      <path data-name="Icon awesome-ellipsis-h" d="M23.063,18A5.063,5.063,0,1,1,18,12.938,5.059,5.059,0,0,1,23.063,18Zm7.313-5.062A5.063,5.063,0,1,0,35.438,18,5.059,5.059,0,0,0,30.375,12.938Zm-24.75,0A5.063,5.063,0,1,0,10.688,18,5.059,5.059,0,0,0,5.625,12.938Z" transform="translate(-0.563 -12.938)" fill={darkTheme ? secondary : primary}/>
    </Container>
  )
}

export default DotsIcon

const Container = styled.svg`
  cursor: pointer;
` 