import React, { useContext, useEffect, useState } from 'react'
import style from './CanvasToolbar.module.css'
import styleFromWorkSpace from '../pages/Workspace.module.css'
import Color from './canvas toolbar supportive elements/Color'
import LineStyle from './canvas toolbar supportive elements/LineStyle'
import TextOrCodeBtn from './canvas toolbar supportive elements/TextOrCodeBtn'
import FontSize from './canvas toolbar supportive elements/FontSize'
import Typography from './canvas toolbar supportive elements/Typography'
import LineType from './canvas toolbar supportive elements/LineType'
import ArrowSide from './canvas toolbar supportive elements/ArrowSide'
import DashLine from './canvas toolbar supportive elements/DashLine'
import { sidebarSelectedBtnContext } from '../../store/CanvasSidebarStore'
import PencilAndEraser from './canvas toolbar supportive elements/PencilAndEraser'
import PencilPointerThickness from './canvas toolbar supportive elements/toolbar supporter tools/PencilPointerThickness'

const CanvasToolbar = () => {

  const { sidebarSelectedBtn } = useContext(sidebarSelectedBtnContext)


  return (
    <div id='toolBar' className={`${style.toolbarDiv} ${styleFromWorkSpace.workspaceSupportingElement}`}>
      <div className={style.toolbarButtonHolderDiv}>

        {/* for text block */}
        {
          (sidebarSelectedBtn === 'textBtn' || sidebarSelectedBtn === 'textDraw') ? <>
            <Color />
            <TextOrCodeBtn />
            <FontSize />
            <Typography />
          </> : null
        }

        {/* for shapes block */}
        {
          (sidebarSelectedBtn === 'shape' || sidebarSelectedBtn === 'squareBtn' || sidebarSelectedBtn === 'squareDraw' || sidebarSelectedBtn === 'circleBtn') || sidebarSelectedBtn === 'circleDraw' ? <>
            <Color />
            <LineStyle />
            <FontSize />
            <Typography />
          </> : null
        }

        {/* for arrow block */}
        {
          (sidebarSelectedBtn === 'arrowBtn' || sidebarSelectedBtn === 'arrowDraw') ? <>
            <Color />
            <LineType />
            <LineStyle />
            <ArrowSide />
            <DashLine />
          </> : null
        }

        {/* for line block */}
        {
          (sidebarSelectedBtn === 'lineBtn' || sidebarSelectedBtn === 'lineDraw') ? <>
            <Color />
            <LineType />
            <LineStyle />
            <DashLine />
          </> : null
        }

        {/* for drow block */}
        {
          (sidebarSelectedBtn === 'drawBtn') ? <>
            <Color />
            <PencilPointerThickness />
          </> : null
        }

        {/* for drow pancil block */}
        {
          (sidebarSelectedBtn === 'pencilDraw' || sidebarSelectedBtn === 'eraserDraw' || sidebarSelectedBtn === 'eraserSizeX' || sidebarSelectedBtn === 'eraserSizeM' || sidebarSelectedBtn === 'eraserSizeL' || sidebarSelectedBtn === 'eraserSizeXL') ? <>
            <PencilAndEraser /> {/* With color and pencil and eraser pointer thickness component also */}
          </> : null
        }

      </div>
    </div>
  )
}

export default CanvasToolbar
