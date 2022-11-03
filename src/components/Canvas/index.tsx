import React from 'react';
import { ChartType, ComponentState, ImageState, LineChartState, PieChartState, TextState, useGlobalContext } from '../../store';
import { LineChart, PieChart } from '../components';
import BarChart from '../components/BarChart';
import BarChartX from '../components/BarChartX';
import FunnelChart from '../components/FunnelChart';
import GaugeChart from '../components/GaugeChart';
import ImageComponent from '../components/ImageComponent';
import RadarChart from '../components/RadarChart';
import RingChart from '../components/RingChart';
import TextComponent from '../components/Text';

import './index.css';

export default function Canvas() {
  const { activeComponentId, pageComponents, setActiveComponentId, setPageComponents } = useGlobalContext();
  return (
    <div className='canvas-wrapper'>
      <div
        className='canvas-container'
        onMouseDown={() => {
          setActiveComponentId('0');
        }}
        tabIndex={-1}
        onKeyUp={(e) => {
          if (e.key === 'Backspace') setPageComponents({ type: 'DELETE', data: activeComponentId });
        }}
      >
        {pageComponents.map((item) => {
          const ChartByType = {
            [ChartType.LineChart]: <LineChart state={item as LineChartState} key={item.id} />,
            [ChartType.PieChart]: <PieChart state={item as PieChartState} key={item.id} />,
            [ChartType.BarChart]: <BarChart state={item as ComponentState} key={item.id} />,
            [ChartType.RadarChart]: <RadarChart state={item as ComponentState} key={item.id} />,
            [ChartType.BarChartX]: <BarChartX state={item as ComponentState} key={item.id} />,
            [ChartType.FunnelChart]: <FunnelChart state={item as ComponentState} key={item.id} />,
            [ChartType.RingChart]: <RingChart state={item as ComponentState} key={item.id} />,
            [ChartType.GaugeChart]: <GaugeChart state={item as ComponentState} key={item.id} />,
            [ChartType.Image]: <ImageComponent state={item as ImageState} key={item.id} />,
            [ChartType.Text]: <TextComponent state={item as TextState} key={item.id} />,
          };
          return ChartByType[item.type];
        })}
      </div>
    </div>
  );
}
