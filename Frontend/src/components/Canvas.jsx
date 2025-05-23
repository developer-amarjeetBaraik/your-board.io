import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './Canvas.module.css'
import { sidebarSelectedBtnContext } from '../../store/CanvasSidebarStore';
import { drawCanvasContext } from '../../store/CanvasDrowStore';

const Canvas = () => {


  const { mainElements, setMainElements, selectedElements, setSelectedElements, bottomCanvasRef, middleCanvasRef, topCanvasRef, isTextEditing, canFireStoreItemFromSelectedElementsToMainElements, drawSelectionArea, drawSelectedElementIndicator, drawNewItem, addNewItemInArr, drawMainElementsArr, drawSelectedElementsArr, storeItemFromSelectedElementsToMainElements, initialDrawAllElements } = useContext(drawCanvasContext)

  const { sidebarSelectedBtn, changeSidebarSelectedBtn } = useContext(sidebarSelectedBtnContext)

  //code to manage canvas size
  useEffect(() => {
    const mianCanvas = document.getElementById('myMainCanvas')
    const middleCanvas = document.getElementById('middleCanvas')
    const topCanvas = document.getElementById('topCanvas')

    const resizeCanvas = () => {
      // for main canvas
      mianCanvas.width = document.documentElement.clientWidth;
      mianCanvas.height = document.documentElement.clientHeight;
      // for drawing canvas
      middleCanvas.width = document.documentElement.clientWidth;
      middleCanvas.height = document.documentElement.clientHeight;
      // for execution canvas
      topCanvas.width = document.documentElement.clientWidth;
      topCanvas.height = document.documentElement.clientHeight;
      // drawMainElementsArr()
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas);
  }, []);

  //code to add key down evnet listener on body to handle sidebar selected button on key down
  useEffect(() => {
    const body = document.body

    if (!isTextEditing) {
      const handleKeyDownOnBody = (event) => {
        if (['v', 'r', 'c', 'a', 'l', 'd', 't', '/'].includes(event.key) && sidebarSelectedBtn !== 'textBtn' && sidebarSelectedBtn !== 'textDraw') {
          switch (event.key) {
            case '/':
              changeSidebarSelectedBtn('insertBtn')
              break;
            case 'v':
              changeSidebarSelectedBtn('cursorBtn')
              break;
            case 'r':
              changeSidebarSelectedBtn('squareBtn')
              break;
            case 'c':
              changeSidebarSelectedBtn('circleBtn')
              break;
            case 'a':
              changeSidebarSelectedBtn('arrowBtn')
              break;
            case 'l':
              changeSidebarSelectedBtn('lineBtn')
              break;
            case 'd':
              changeSidebarSelectedBtn('drawBtn')
              break;
            case 't':
              changeSidebarSelectedBtn('textBtn')
              break;
          }
        }
      }

      body.addEventListener('keydown', handleKeyDownOnBody)

      return () => {
        body.removeEventListener('keydown', handleKeyDownOnBody)
      }
    }


  }, [sidebarSelectedBtn])


  // code to manage cursor icon on canvas
  useEffect(() => {
    const canvasDiv = document.getElementById('canvasHolderDiv')
    switch (sidebarSelectedBtn) {
      default:
        canvasDiv.style.cursor = 'var(--cursor-default-arrow-icon)'
        break;
      case "squareBtn":
      case "squareDraw":
        canvasDiv.style.cursor = 'var(--cursor-plus-icon)'
        break;
      case "circleBtn":
      case "circleDraw":
        canvasDiv.style.cursor = 'var(--cursor-plus-icon)'
        break;
      case "arrowBtn":
      case "arrowDraw":
        canvasDiv.style.cursor = 'var(--cursor-plus-icon)'
        break;
      case "lineBtn":
      case "lineDraw":
        canvasDiv.style.cursor = 'var(--cursor-plus-icon)'
        break;
      case "drawBtn":
      case "pencilDraw":
        canvasDiv.style.cursor = 'var(--cursor-draw-icon)'
        break;
      case "eraserSizeX":
        canvasDiv.style.cursor = 'var(--cursor-eraser-icon-size-X)'
        break;
      case "eraserSizeM":
        canvasDiv.style.cursor = 'var(--cursor-eraser-icon-size-M)'
        break;
      case "eraserSizeL":
        canvasDiv.style.cursor = 'var(--cursor-eraser-icon-size-L)'
        break;
      case "eraserSizeXL":
        canvasDiv.style.cursor = 'var(--cursor-eraser-icon-size-XL)'
        break;
      case "textBtn":
      case "textDraw":
        canvasDiv.style.cursor = 'var(--cursor-plus-icon)'
        break;
    }
  }, [sidebarSelectedBtn])


  //draw the selected element indicator with cursor
  useEffect(() => {
    const canvas = document.getElementById('topCanvas')
    const handleMouseOver = (event) => {
      drawSelectedElementIndicator(sidebarSelectedBtn, event.offsetX, event.offsetY)
    }
    if (sidebarSelectedBtn === 'squareBtn' || sidebarSelectedBtn === 'circleBtn') {
      canvas.addEventListener('mousemove', handleMouseOver)
    }
    return () => {
      canvas.removeEventListener('mousemove', handleMouseOver)
    }
  }, [sidebarSelectedBtn, selectedElements])

  // code to add item from selectedElement array to mainElements array
  useEffect(() => {
    const handleClick = (event) => {
      storeItemFromSelectedElementsToMainElements()
    }
    if (selectedElements.length > 0 && canFireStoreItemFromSelectedElementsToMainElements) {
      topCanvasRef.current.addEventListener('click', handleClick)
    }
    return () => {
      topCanvasRef.current.removeEventListener('click', handleClick)
    }
  }, [selectedElements, canFireStoreItemFromSelectedElementsToMainElements])

  //code to draw and add item on canvas

  //to provide the updated state to the functions
  const isDraggingRef = useRef(false)
  const [startX, setStartX] = useState(null)
  const [startY, setStartY] = useState(null)

  //to provide the element type 
  const [type, setType] = useState(null)

  //this is for pencil draw tool
  const [prevPencilX, setPrevPencilX] = useState()
  const [prevPencilY, setPrevPencilY] = useState()
  useEffect(() => {
    const canvas = topCanvasRef.current
    const ctx = canvas.getContext('2d')

    let selectedItem = sidebarSelectedBtn;

    let endX = null
    let endY = null

    //for text draw
    let screenX = null;
    let screenY = null;

    const handleMouseDownOnCanvas = (event) => {

      isDraggingRef.current = true;
      setStartX(event.offsetX);
      setStartY(event.offsetY);
      //for pencil tool
      setPrevPencilX(event.offsetX);
      setPrevPencilY(event.offsetY);
      //for text tool
      screenX = event.offsetX
      screenY = event.offsetY

      if (sidebarSelectedBtn === 'squareBtn' || sidebarSelectedBtn === 'squareDraw') {
        changeSidebarSelectedBtn('squareDraw')
        selectedItem = 'squareDraw'
        setType('rectangle')
      } else if (sidebarSelectedBtn === 'circleBtn' || sidebarSelectedBtn === 'circleDraw') {
        changeSidebarSelectedBtn('circleDraw')
        selectedItem = 'circleDraw'
        setType('circle')
      } else if (sidebarSelectedBtn === 'arrowBtn') {
        changeSidebarSelectedBtn('arrowDraw')
        selectedItem = 'arrowDraw'
        setType('arrow')
      } else if (sidebarSelectedBtn === 'lineBtn') {
        changeSidebarSelectedBtn('lineDraw')
        selectedItem = 'lineDraw'
        setType('line')
      } else if (sidebarSelectedBtn === 'drawBtn') {
        changeSidebarSelectedBtn('pencilDraw')
        selectedItem = 'pencilDraw'
        setType('pencil')
      } else if (sidebarSelectedBtn === 'textBtn') {
        selectedItem = 'textDraw'
        //for text tool only
        isDraggingRef.current = false;
        changeSidebarSelectedBtn('cursorBtn')
        setType('text')
        drawNewItem(selectedItem, startX, startY, endX, endY, prevPencilX, prevPencilY, screenX, screenY)
      }
    }
    const handleMouseDragOnCanvas = (event) => {
      endX = event.offsetX
      endY = event.offsetY
      if (isDraggingRef.current && sidebarSelectedBtn === 'cursorBtn') {
        //draw the selection area if the sidebar button is cursorBtn
        drawSelectionArea(startX, startY, event.offsetX, event.offsetY)
      } else if (isDraggingRef.current && selectedItem != 'textDraw') {
        drawNewItem(selectedItem, startX, startY, endX, endY, prevPencilX, prevPencilY)
        //for pencil tool
        setPrevPencilX(endX);
        setPrevPencilY(endY);
      }
    }
    const handleMouseUpOnCanvas = (event) => {
      isDraggingRef.current = false;
      setStartX(prev => null)
      setStartY(prev => null)
      const endX = event.offsetX;
      const endY = event.offsetY;
      if (sidebarSelectedBtn === 'cursorBtn') {
        ctx.clearRect(0, 0, topCanvasRef.current.width, topCanvasRef.current.height)
      }
      if (sidebarSelectedBtn !== 'cursorBtn' && type !== 'text') {
        addNewItemInArr({ selectedItem, type, startX, startY, endX, endY, prevPencilX, prevPencilY })
        changeSidebarSelectedBtn('cursorBtn')
      }
    }

    canvas.addEventListener('mousedown', handleMouseDownOnCanvas)
    canvas.addEventListener('mousemove', handleMouseDragOnCanvas)
    canvas.addEventListener('mouseup', handleMouseUpOnCanvas)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDownOnCanvas)
      canvas.removeEventListener('mousemove', handleMouseDragOnCanvas)
      canvas.removeEventListener('mouseup', handleMouseUpOnCanvas)
    }
  }, [sidebarSelectedBtn, startX, startY, prevPencilX, prevPencilY])

  //code the select the element on canvas
  useEffect(() => {
    const canvas = topCanvasRef.current;
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect();

    function isPointInPolygon(polygon, x, y) {
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x, yi = polygon[i].y;
        const xj = polygon[j].x, yj = polygon[j].y;

        const intersect = ((yi > y) !== (yj > y)) &&
          (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    }

    // check if any element clicked
    const handleCanvasClick = (event) => {
      // Mouse coordinates relative to canvas
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      if (selectedElements.length < 1 && sidebarSelectedBtn === 'cursorBtn') {

        const clickedElement = mainElements.find((el, index) => {
          switch (el.elementType) {
            case 'rectangle':
              return (
                mouseX >= el.x &&
                mouseX <= el.x + el.width &&
                mouseY >= el.y &&
                mouseY <= el.y + el.height
              );
            case 'text':
              const boundaryDiff = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--selected-item-boundry-difference'))
              let sX = el.screenX - boundaryDiff
              let sY = el.screenY - boundaryDiff * 2 - el.fontSize / 2
              console.log(el.text)
              ctx.font = `${el.fontSize}px ${el.fontStyle ? el.fontStyle : 'Arial'}`
              let width = ctx.measureText(el.text).width + boundaryDiff * 2
              let height = el.fontSize + boundaryDiff

              return (
                mouseX >= sX &&
                mouseX <= sX + width &&
                mouseY >= sY &&
                mouseY <= sY + height
              );

            case 'circle':
              const dx = mouseX - el.x;
              const dy = mouseY - el.y;
              return dx * dx + dy * dy <= el.radius * el.radius;

            case 'line':
            case 'arrow':
              return isPointInPolygon(el.polygon, mouseX, mouseY);

            default:
              return false;
          }
        });

        if (clickedElement) {
          console.log('Selected:', clickedElement);
          let newMainElements = mainElements.filter((item) => item !== clickedElement)
          setMainElements(newMainElements)
          setSelectedElements([clickedElement])
        }
      }

    };

    canvas.addEventListener('click', handleCanvasClick)

    return () => {
      canvas.removeEventListener('click', handleCanvasClick)
    }
  }, [mainElements, selectedElements, sidebarSelectedBtn])

  useEffect(() => {
    console.log('main elements')
    console.log(mainElements)
    console.log('selected elements')
    console.log(selectedElements)
  }, [selectedElements, mainElements])

  return (
    <div className={style.canvasHolderDiv} id='canvasHolderDiv'>
      <canvas ref={bottomCanvasRef} className={`${style.Canvas} ${style.mainCanvas}`} id={`myMainCanvas`} >
      </canvas>

      <canvas ref={middleCanvasRef} className={`${style.Canvas} ${style.supportingCanvas}`} id={`middleCanvas`}>
      </canvas>

      <canvas ref={topCanvasRef} className={`${style.Canvas} ${style.supportingCanvas}`} id={`topCanvas`}>
      </canvas>
    </div>
  )
}

export default Canvas