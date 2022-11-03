import React from 'react';
import ReactECharts from 'echarts-for-react';
import { PieChartState } from '../../../store';
import Dragger from '../../Dragger';

export interface PieChartComponent {
  state: PieChartState;
}

export default function PieChart({ state }: PieChartComponent) {
  const option = {
    title: {
      text: state.title,
      x: 'center',
      bottom: 'bottom',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: state.data.map((item, index) => ({ value: item, name: state.xAxis[index] })),
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <Dragger state={state}>
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </Dragger>
  );
}
