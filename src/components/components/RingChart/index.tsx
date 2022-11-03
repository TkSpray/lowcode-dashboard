import React from 'react';
import ReactECharts from 'echarts-for-react';
import { ComponentState } from '../../../store';
import Dragger from '../../Dragger';

export interface RingChartComponent {
  state: ComponentState;
}

export default function RingChart({ state }: RingChartComponent) {
  const option = {
    title: {
      text: state.title,
      x: 'center',
      bottom: 'bottom',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        type: 'pie',
        radius: ['60%', '70%'],
        label: {
          show: false,
          position: 'center',
        },
        data: state.data?.map((item, index) => ({ value: item, name: state.xAxis?.[index] })),
      },
    ],
  };

  return (
    <Dragger state={state}>
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </Dragger>
  );
}
