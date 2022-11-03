import React from 'react';
import { TextState } from '../../../store';
import Dragger from '../../Dragger';
import { Typography } from 'antd';

import './index.css';

export interface TextComponent {
  state: TextState;
}

const { Text } = Typography;

export default function TextComponent({ state }: TextComponent) {
  const { value } = state;
  console.log(value, ';value');
  return (
    <Dragger state={state}>
      <Text strong>{value}</Text>
    </Dragger>
  );
}
