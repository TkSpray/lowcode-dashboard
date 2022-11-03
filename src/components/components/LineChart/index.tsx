import React from 'react';
import ReactECharts from 'echarts-for-react';
import { LineChartState } from '../../../store';
import Dragger from '../../Dragger';

export interface LineChartComponent {
  state: LineChartState;
}

export default function LineChart({ state }: LineChartComponent) {
  const options = {
    title: { text: state.title, left: 'center', bottom: 'bottom' },
    grid: { top: 8, right: 8, bottom: 48, left: 36 },
    xAxis: {
      type: 'category',
      data: state?.xAxis,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: state.data,
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  return (
    <Dragger state={state}>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </Dragger>
  );
}
