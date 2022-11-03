import React from 'react';
import ReactECharts from 'echarts-for-react';
import { ComponentState } from '../../../store';
import Dragger from '../../Dragger';

export interface GaugeChartComponent {
  state: ComponentState;
}

export default function GaugeChart({ state }: GaugeChartComponent) {
  const options = {
    title: { text: state.title, left: 'center', bottom: 'bottom' },
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}',
    },
    series: [
      {
        type: 'gauge',
        title: {
          show: false,
        },
        detail: {
          show: false,
        },
        data: state.data?.map((item, index) => ({
          value: item,
          name: state.xAxis?.[index],
        })),
      },
    ],
  };

  return (
    <Dragger state={state}>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </Dragger>
  );
}
