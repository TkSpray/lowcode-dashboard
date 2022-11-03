import React, { useEffect, useRef } from 'react';
import Ruler from '@scena/react-ruler';

import './index.css';

export default function Screen() {
  const rulerRef1 = useRef<any>(null);
  const rulerRef2 = useRef<any>(null);

  useEffect(() => {
    const resize = () => {
      rulerRef1.current?.resize();
      rulerRef2.current?.resize();
    };

    setTimeout(() => {
      resize();
    }, 0);
    window.addEventListener('resize', () => {
      resize();
    });
  }, []);

  return (
    <>
      <div className='rule ruler-box'></div>
      <div className='ruler ruler-horizontal'>
        <Ruler type='horizontal' ref={rulerRef1}></Ruler>
      </div>
      <div className='ruler ruler-vertical'>
        <Ruler type='vertical' ref={rulerRef2}></Ruler>
      </div>
    </>
  );
}
