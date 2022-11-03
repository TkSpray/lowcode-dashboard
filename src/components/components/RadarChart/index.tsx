import React from 'react';
import ReactECharts from 'echarts-for-react';
import { ComponentState } from '../../../store';
import Dragger from '../../Dragger';

export interface RadarChartComponent {
  state: ComponentState;
}

export default function RadarChart({ state }: RadarChartComponent) {
  const options = {
    title: { text: state.title, left: 'center', bottom: 'bottom' },
    grid: { top: 8, right: 8, bottom: 48, left: 36 },
    radar: {
      indicator: state.xAxis?.map((item) => ({ name: item })),
    },
    series: [
      {
        data: [state.data],
        type: 'radar',
      },
    ],
  };

  return (
    <Dragger state={state}>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </Dragger>
  );
}
