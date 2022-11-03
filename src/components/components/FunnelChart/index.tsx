import React from 'react';
import ReactECharts from 'echarts-for-react';
import { ComponentState } from '../../../store';
import Dragger from '../../Dragger';

export interface FunnelChartXComponent {
  state: ComponentState;
}

export default function FunnelChart({ state }: FunnelChartXComponent) {
  const options = {
    title: { text: state.title, left: 'center', bottom: 'bottom' },
    grid: { top: 8, right: 8, bottom: 48, left: 16 },
    legend: {
      data: state?.xAxis,
    },
    series: [
      {
        type: 'funnel',
        gap: 2,
        label: {
          show: true,
          position: 'inside',
        },
        emphasis: {
          label: {
            fontSize: 20,
          },
        },
        data: state.data?.map((item, index) => ({ value: item, name: state.xAxis?.[index] || '' })),
      },
    ],
    tooltip: {
      trigger: 'item',
    },
  };

  return (
    <Dragger state={state}>
      <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />
    </Dragger>
  );
}
