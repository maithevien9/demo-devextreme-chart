import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import resizeIcon from './imgs/resize.png';

const Resizable = styled.div`
  position: absolute;
  border: 3px solid rgba(128, 128, 128, 0.6);
  background: none;
  height: 200px;
  width: 46px;
  bottom: 0;
  left: 0;
`;

const ComponentA = () => {
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const refRight = useRef(null);
  const resizingRef = useRef(null);
  const isMouseDownRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isShowReSize, setIsShowReSize] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!isDragging || isShowReSize) return;
      const { clientY } = event;
      setPosition(300 - clientY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const [height, setHeight] = useState(200);

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

  const handleMouseDown2 = (event) => {
    isMouseDownRef.current = true;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const resizerRight = refRight.current;

  const handleClickWave = (event) => {
    !isDragging && setIsShowReSize((prev) => !prev);
  };

  useEffect(() => {
    resizerRight?.addEventListener('mousedown', handleMouseDown2);

    return () => {
      resizerRight?.removeEventListener('mousedown', handleMouseDown2);
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
    <div
      style={{
        position: 'relative',
        height: '400px',
        width: '40px',
        backgroundColor: '#f0f0f0',
      }}
    >
      <div
        ref={wrapperRef}
        style={{
          position: 'absolute',
          bottom: `${position}px`,
          left: 0,
          height: height ?? 100,
          width: '40px',
          backgroundColor: '#ccc',
          cursor: 'grab',
        }}
        onMouseDown={handleMouseDown}
        onClick={handleClickWave}
      >
        <Resizable ref={resizingRef} style={{ display: isShowReSize ? 'flex' : 'none' }}>
          <div ref={refRight} style={{ backgroundImage: `url(${resizeIcon})` }} className='resize-component'></div>
        </Resizable>
        {/* Content of component B goes here */}
      </div>
    </div>
  );
};

export default ComponentA;
