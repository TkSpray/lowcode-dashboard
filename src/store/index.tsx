import React, { useContext, useReducer, useState } from 'react';

export enum ChartType {
  LineChart = 'LineChart',
  PieChart = 'PieChart',
  BarChart = 'BarChart',
  RadarChart = 'RadarChart',
  BarChartX = 'BarChartX',
  FunnelChart = 'FunnelChart',
  RingChart = 'RingChart',
  GaugeChart = 'GaugeChart',
  Text = 'Text',
  Image = 'Image',
}

export interface TextState {
  value: string;
}

export interface ImageState {
  id: string;
  url: string;
  width: number;
  height: number;
  x: number;
  y: number;
  type: ChartType;
}

export interface TextState {
  id: string;
  value: string;
  width: number;
  height: number;
  x: number;
  y: number;
  type: ChartType;
}

export interface ComponentState {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
  title: string;
  type: ChartType;
  xAxis?: string[];
  data?: number[];
}

export interface LineChartState extends ComponentState {
  xAxis: string[];
  data: number[];
}

export interface PieChartState extends ComponentState {
  xAxis: string[];
  data: number[];
}

export interface actionType {
  type: string;
  data: any;
}

export type AllComponentState = ComponentState | LineChartState | PieChartState | ImageState | TextState;
export interface globalContext {
  pageComponents: AllComponentState[];
  activeComponentId: string;
  setActiveComponentId: React.Dispatch<React.SetStateAction<string>>;
  setPageComponents: React.Dispatch<actionType>;
}

export const UserContext = React.createContext<globalContext>({
  pageComponents: [],
  activeComponentId: '0',
  setActiveComponentId: () => {},
  setPageComponents: () => {},
});

export function useGlobalContext() {
  return useContext(UserContext);
}

export const reducer = (state: AllComponentState[], action: actionType): AllComponentState[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.data];
    case 'DELETE':
      return state.filter((item) => item.id !== action.data);
    case 'EDIT':
      return state.reduce((prev: AllComponentState[], cur) => {
        if (cur.id !== action.data?.id) return [...prev, cur];
        return [...prev, action.data as AllComponentState];
      }, []);
    case 'NEW':
      return action.data;
    default:
      break;
  }
  return state;
};

export const StateProvider: React.FC = ({ children }) => {
  const [pageComponents, dispatch] = useReducer(reducer, []);

  const [activeComponentId, setActiveComponentId] = useState('0');

  return <UserContext.Provider value={{ pageComponents, activeComponentId, setActiveComponentId, setPageComponents: dispatch }}>{children}</UserContext.Provider>;
};

export default StateProvider;
