import './App.css';
import resizeIcon from './imgs/resize.png';
import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

const Resizable = styled.div`
  position: absolute;
  border: 3px solid rgba(128, 128, 128, 0.6);
  background: none;
  height: 400px;
  width: 46px;
  bottom: 0;
  left: 0;
`;

export default function Ruler({ count }) {
  const refRight = useRef(null);
  const resizingRef = useRef(null);
  const isMouseDownRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isShowReSize, setIsShowReSize] = useState(false);

  const [height, setHeight] = useState(400);

  const handleMouseMove = (event) => {
    if (isMouseDownRef.current && isShowReSize) {
      const resizeElm = resizingRef.current;

      if (isMouseDownRef.current && event.clientY < 500) {
        resizeElm.style.height = `${500 - event.clientY}px`;
      }
    }
  };

  const handleMouseUp = (event) => {
    if (isShowReSize && isMouseDownRef.current) {
      isMouseDownRef.current = false;
      setIsShowReSize(false);

      const height = 500 - event.clientY;

      setHeight(Number(height));
      const wrapperCurrent = wrapperRef.current;
      // wrapperCurrent.style.height = height;

      wrapperCurrent.style.height = height;
    }
  };

  const handleMouseDown = (event) => {
    isMouseDownRef.current = true;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const resizerRight = refRight.current;

  const handleClickWave = (event) => {
    setIsShowReSize((prev) => !prev);
  };

  useEffect(() => {
    resizerRight?.addEventListener('mousedown', handleMouseDown);

    return () => {
      resizerRight?.removeEventListener('mousedown', handleMouseDown);
    };
  }, [resizerRight, isShowReSize]);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsShowReSize(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='ruler' ref={wrapperRef} onClick={handleClickWave} style={{ height: height }}>
      <Resizable ref={resizingRef} style={{ display: isShowReSize ? 'flex' : 'none' }}>
        <div ref={refRight} style={{ backgroundImage: `url(${resizeIcon})` }} className='resize-component'></div>
      </Resizable>
    </div>
  );
}
