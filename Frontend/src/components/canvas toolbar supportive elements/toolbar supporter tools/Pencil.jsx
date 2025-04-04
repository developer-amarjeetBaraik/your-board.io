import React, { useContext, useEffect, useRef } from 'react'
import style from './Pencil.module.css'
import { sidebarSelectedBtnContext } from '../../../../store/CanvasSidebarStore'

const Pencil = ({ selectedElement, setSelectedElement }) => {

  const { changeSidebarSelectedBtn } = useContext(sidebarSelectedBtnContext)

  const pencilInput = useRef()

  const handleOnClick = () => {
    if (pencilInput.current.checked) {
      setSelectedElement('pencil')
      changeSidebarSelectedBtn('pencilDraw')
    } else {
      setSelectedElement('eraser')
    }
  }

  return (
    <div className={style.pencilDiv}>
      <input onClick={handleOnClick} ref={pencilInput} defaultChecked type="radio" name="pencil-eraser-btn" id="pencilBtn" />
      <label htmlFor="pencilBtn" className={style.pencilBtn}>
        <svg role="img" width="23" height="18" focusable="false" aria-hidden="true" viewBox="0 0 23 18" className=""><g clipPath="url(#clip0_371_37473)"><path d="M17.8857 2.06549C17.9914 1.95982 18.1627 1.95982 18.2684 2.06549L20.9345 4.73163C21.0402 4.8373 21.0402 5.00863 20.9345 5.1143L12.4042 13.6446C12.3599 13.6889 12.3017 13.7164 12.2393 13.7225L9.28338 14.0123C9.11365 14.029 8.97104 13.8863 8.98768 13.7166L9.27748 10.7607C9.28359 10.6983 9.31114 10.6401 9.35544 10.5958L17.8857 2.06549Z" fill="black" stroke="white" strokeWidth="1.97248"></path><path d="M18.9657 1.36812C18.4749 0.877294 17.6791 0.877295 17.1883 1.36812L8.65806 9.89838C8.45232 10.1041 8.32433 10.3749 8.29594 10.6645L8.00615 13.6204C7.92886 14.4087 8.59127 15.0711 9.37961 14.9939L12.3355 14.7041C12.6251 14.6757 12.8959 14.5477 13.1016 14.3419L21.6319 5.81167C22.1227 5.32085 22.1227 4.52507 21.6319 4.03425L18.9657 1.36812Z" fill="var(--grey-0)" stroke="white"></path><path d="M6.95 16.6C7.28137 16.3515 7.34853 15.8814 7.1 15.55C6.85147 15.2186 6.38137 15.1515 6.05 15.4L6.95 16.6ZM6.05 15.4C5.14902 16.0757 4.17496 16.4699 3.1084 16.5076C2.03949 16.5454 0.808211 16.2274 -0.608463 15.3603L-1.39154 16.6397C0.218131 17.6249 1.73686 18.057 3.16136 18.0067C4.58821 17.9563 5.85098 17.4243 6.95 16.6L6.05 15.4Z" fill="white"></path></g><defs><clipPath id="clip0_371_37473"><rect width="23" height="18" fill="white"></rect></clipPath></defs></svg>
      </label>
    </div>
  )
}

export default Pencil
