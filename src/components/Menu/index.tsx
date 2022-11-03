import React from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, PieChartOutlined } from '@ant-design/icons';
import { ChartType, useGlobalContext } from '../../store';
import { generateId } from '../../utils';

const { SubMenu } = Menu;

export default function SiderBar() {
  const { setPageComponents } = useGlobalContext();
  return (
    <Menu>
      <SubMenu key='sub1' icon={<PieChartOutlined />} title='图表'>
        <Menu.Item
          key='1'
          onClick={() => {
            setPageComponents({
              type: 'ADD',
              data: {
                id: generateId(),
                x: 0,
                y: 0,
                width: 400,
                height: 240,
                title: '折线图',
                xAxis: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: ChartType.LineChart,
              },
            });
          }}
        >
          折线图
        </Menu.Item>
        <Menu.Item
          key='2'
          onClick={() => {
            setPageComponents({
              type: 'ADD',
              data: {
                id: generateId(),
                x: 0,
                y: 0,
                width: 400,
                height: 240,
                title: '柱状图',
                xAxis: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
                data: [120, 200, 150, 80, 70, 110, 130],
                type: ChartType.BarChart,
              },
            });
          }}
        >
          柱状图
        </Menu.Item>

        <Menu.Item
          key='3'
          onClick={() => {
            setPageComponents({
              type: 'ADD',
              data: {
                id: generateId(),
                x: 0,
                y: 0,
                width: 400,
                height: 240,
                title: '雷达图',
                xAxis: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
                data: [335, 310, 235, 135, 1548],
                type: ChartType.RadarChart,
              },
            });
          }}
        >
          雷达图
        </Menu.Item>
        <Menu.Item
          key='4'
          onClick={() => {
            setPageComponents({
              type: 'ADD',
              data: {
                id: generateId(),
                x: 0,
                y: 0,
                width: 400,
                height: 240,
                title: '饼图',
                xAxis: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
                data: [335, 310, 235, 135, 1548],
                type: ChartType.PieChart,
              },
            });
          }}
        >
          饼图
        </Menu.Item>
        <Menu.Item
          key='5'
          onClick={() => {
            setPageComponents({
              type: 'ADD',
              data: {
                id: generateId(),
                x: 0,
                y: 0,
                width: 400,
                height: 240,
                title: '条形图',
                xAxis: ['美国', '印度', '中国', '世界'],
                data: [239, 103, 1344, 6230],
                type: ChartType.BarChartX,
              },
            });
          }}
        >
          条形图
        </Menu.Item>
        <Menu.Item
          key='6'
          onClick={() => {
            setPageComponents({
              type: 'ADD',
              data: {
                id: generateId(),
                x: 0,
                y: 0,
                width: 400,
                height: 240,
                title: '漏斗图',
                xAxis: ['浏览', '订单', '点击', '展示'],
                data: [60, 20, 40, 80],
                type: ChartType.FunnelChart,
              },
            });
          }}
        >
          漏斗图
        </Menu.Item>
        <Menu.Item
          key='7'
          onClick={() => {
            setPageComponents({
              type: 'ADD',
              data: {
                id: generateId(),
                x: 0,
                y: 0,
                width: 400,
                height: 240,
                title: '环形图',
                xAxis: ['搜索引擎', '方向', '邮箱', '视频广告'],
                data: [1035, 710, 535, 435],
                type: ChartType.RingChart,
              },
            });
          }}
        >
          环形图
        </Menu.Item>
        <Menu.Item
          key='8'
          onClick={() => {
            setPageComponents({
              type: 'ADD',
              data: {
                id: generateId(),
                x: 0,
                y: 0,
                width: 240,
                height: 240,
                title: '仪表盘',
                xAxis: ['较差', '普通', '良好'],
                data: [20, 40, 60],
                type: ChartType.GaugeChart,
              },
            });
          }}
        >
          仪表盘
        </Menu.Item>
      </SubMenu>
      <SubMenu key='sub2' icon={<AppstoreOutlined />} title='常用'>
        <Menu.Item
          key='2-1'
          onClick={() => {
            setPageComponents({
              type: 'ADD',
              data: {
                id: generateId(),
                x: 0,
                y: 0,
                width: 140,
                height: 40,
                value: '文字',
                type: ChartType.Text,
              },
            });
          }}
        >
          文字
        </Menu.Item>
        <Menu.Item
          key='2-2'
          onClick={() => {
            setPageComponents({
              type: 'ADD',
              data: {
                id: generateId(),
                x: 0,
                y: 0,
                width: 400,
                height: 240,
                type: ChartType.Image,
              },
            });
          }}
        >
          图片
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}
