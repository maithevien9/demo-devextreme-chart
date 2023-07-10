import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import resizeIcon from './imgs/resize.png';

const ComponentA = ({ start, end, setStart, setEnd, setPosition, position }) => {
  const isMouseDownTopRef = useRef(null);
  const isMouseDownBottomRef = useRef(null);
  const isMouseDownRef = useRef(null);

  const topResizeRef = useRef(null);
  const movingRef = useRef(null);

  const bottomResizeRef = useRef(null);
  const [moving, setMoving] = useState(false);
  const [mouseMoveTop, setMouseMoveTop] = useState(false);
  const [mouseMoveBottom, setMouseMoveBottom] = useState(false);

  const handleMouseUpTop = (event) => {
    isMouseDownTopRef.current = false;
  };

  const handleMouseUpBottom = (event) => {
    isMouseDownBottomRef.current = false;
  };

  const topResize = topResizeRef.current;
  const bottomResize = bottomResizeRef.current;
  const movingContainer = movingRef.current;

  const handleMouseMoveTop = (event) => {
    if (isMouseDownTopRef.current) {
      const Y = event.clientY - 150;
      const percent = Y / 4;
      if (percent > 0 && percent < 100 && start < end) {
        setPosition(Y);
        setStart(Y / 4);
      }
    }
  };

  const handleMouseDownTop = (event) => {
    isMouseDownTopRef.current = true;

    document.addEventListener('mousemove', handleMouseMoveTop);
    document.addEventListener('mouseup', handleMouseUpTop);
  };

  useEffect(() => {
    topResize?.addEventListener('mousedown', handleMouseDownTop);

    return () => {
      topResize?.removeEventListener('mousedown', handleMouseDownTop);
    };
  }, [topResize, mouseMoveTop]);

  const handleMouseMoveBottom = (event) => {
    if (isMouseDownBottomRef.current && mouseMoveBottom) {
      const Y = event.clientY - 150;
      const percent = Y / 4;

      if (percent > 0 && percent < 100 && percent > start) {
        setEnd(Y / 4);
      }
    }
  };

  const handleMouseDownBottom = (event) => {
    isMouseDownBottomRef.current = true;

    document.addEventListener('mousemove', handleMouseMoveBottom);
    document.addEventListener('mouseup', handleMouseUpBottom);
  };

  useEffect(() => {
    bottomResize?.addEventListener('mousedown', handleMouseDownBottom);

    return () => {
      bottomResize?.removeEventListener('mousedown', handleMouseDownBottom);
    };
  }, [bottomResize, mouseMoveBottom]);

  const handleMouseMove = (event) => {
    if (isMouseDownRef.current) {
      const Y = event.clientY - 150;
      const percent = Y / 4;

      if (percent > 0 && percent < 100 && percent + end - start < 100) {
        console.log(isMouseDownRef.current);
        setPosition(Y);
      }
    }
  };

  const handleMouseUp = (event) => {
    isMouseDownRef.current = false;
  };

  const handleMouseDown = (event) => {
    isMouseDownRef.current = true;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    movingContainer?.addEventListener('mousedown', handleMouseDown);

    return () => {
      movingContainer?.removeEventListener('mousedown', handleMouseDown);
    };
  }, [movingContainer, moving]);

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
        style={{
          height: `${end - start}%`,
          width: '40px',
          backgroundColor: '#b1b1b4',
          position: 'relative',
          zIndex: 100,
          top: position,
          left: 0,
        }}
      >
        <div
          ref={topResizeRef}
          style={{ width: '100%', height: 10, cursor: 'ns-resize' }}
          onMouseEnter={() => setMouseMoveTop(true)}
          onMouseLeave={() => mouseMoveTop && setMouseMoveTop(false)}
        />
        <div
          ref={movingRef}
          style={{
            height: 'calc(100% - 20px)',
            width: '40px',
            backgroundColor: '#b1b1b4',
            cursor: 'pointer',
          }}
          onMouseEnter={() => setMoving(true)}
          onMouseLeave={() => moving && setMoving(false)}
        />
        <div
          ref={bottomResizeRef}
          style={{ width: '100%', height: 10, cursor: 'ns-resize' }}
          onMouseEnter={() => setMouseMoveBottom(true)}
          onMouseLeave={() => mouseMoveBottom && setMouseMoveBottom(false)}
        />
      </div>
    </div>
  );
};

export default ComponentA;
