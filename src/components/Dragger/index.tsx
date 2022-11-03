import React from 'react';
import { Rnd } from 'react-rnd';
import { AllComponentState, useGlobalContext } from '../../store';

export interface DraggerProps {
  children: React.ReactNode;
  state: AllComponentState;
}

export default function Dragger(props: DraggerProps) {
  const { state, children } = props;
  const { activeComponentId, setActiveComponentId, setPageComponents } = useGlobalContext();

  return (
    <Rnd
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      className={activeComponentId === state.id ? 'component-active' : ''}
      size={{ height: state.height, width: state.width }}
      position={{ x: state.x, y: state.y }}
      bounds='parent'
      onResizeStart={(e) => {
        e.stopPropagation();
        setActiveComponentId(state.id);
      }}
      onResizeStop={(e, a, b, c, d) => {
        setPageComponents({
          type: 'EDIT',
          data: {
            ...state,
            height: state.height + c.height,
            width: state.width + c.width,
            x: d.x,
            y: d.y,
          },
        });
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        setActiveComponentId(state.id);
      }}
      onDragStop={(e, data) => {
        setPageComponents({
          type: 'EDIT',
          data: {
            ...state,
            x: data.x,
            y: data.y,
          },
        });
      }}
    >
      {children}
    </Rnd>
  );
}
