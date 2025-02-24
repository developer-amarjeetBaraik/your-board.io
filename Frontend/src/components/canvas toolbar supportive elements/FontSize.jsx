import React, { useState } from 'react'
import style from './FontSize.module.css'

const FontSize = () => {
    // code to see if the fontSize tab is active of not
    const [isTabActive, setIsTabActive] = useState(false)
    
    //code to see the which font size is selected
    const [fontSize, setFontSize] = useState('Small')
    
    const handleActiveTab = (e) =>{
        setIsTabActive(!isTabActive)
    }
    return (
        <div onClick={() => handleActiveTab()} className={style.fontSizeDiv}>
            <div className={`${style.FontSizeIconDiv} ${isTabActive ? style.active : null}`}>
                <button>
                    {fontSize}
                </button>
                <svg width="5" height="5" viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg" className="PropertyBarDropdown_caret__5FfmK"><path d="M.206 1.117l1.805 1.692c.272.255.71.255.983 0l1.804-1.692C5.23.705 4.924 0 4.303 0H.701C.074 0-.233.705.206 1.117z" fill="white"></path></svg>
            </div>

            {/* conditional rendering applyed */}
            {
                isTabActive ?
                    <div className={style.FontSizeOptionDiv}>
                        {/* <div className={`${style.optionSection} ${style.firstSection}`}>
                        <div className={`${style.fontSizeRange} `}>
                            <button>-</button>
                            <p>{`${10}px`}</p>
                            <button>+</button>
                        </div>
                    </div> */}
                        <div onClick={() => setIsTabActive(!isTabActive)} className={`${style.fontSizeOption} ${style.optionSection} ${style.secondSection}`}>
                            <button className={`sizeBtn ${fontSize === "Small" ? style.activeSize : null}`}>Small</button>
                            <button className={`sizeBtn ${fontSize === "Medium" ? style.activeSize : null}`}>Medium</button>
                            <button className={`sizeBtn ${fontSize === "Large" ? style.activeSize : null}`}>Large</button>
                            <button className={`sizeBtn ${fontSize === "X-Large" ? style.activeSize : null}`}>X-Large</button>
                        </div>
                    </div>
                    : null
            }


        </div>
    )
}

export default FontSize
