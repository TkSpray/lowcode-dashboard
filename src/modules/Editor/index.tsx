import React, { useState } from 'react';
import { Button, Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import TopBar from '../../components/TopBar';
import Menu from '../../components/Menu';
import Screen from '../../components/Screen';
import ConfigBar from '../../components/ConfigBar';

import './index.css';

const { Header, Sider, Content } = Layout;

export default function Editor() {
  const [collapsed, setCollapsed] = useState(true);

  const onCollapsed = () => {
    setCollapsed(!collapsed);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 180);
  };

  return (
    <div className='editor'>
      <Header>
        <TopBar />
      </Header>
      <Layout className='content-wrapper'>
        <Sider collapsed={collapsed} className='content-sider'>
          <div className='collapsed-btn'>
            <Button type='primary' onClick={onCollapsed} style={{ marginBottom: 16 }}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
            </Button>
          </div>
          <Menu />
        </Sider>
        <Content className='main-content'>
          <Screen />
        </Content>
        <ConfigBar />
      </Layout>
    </div>
  );
}
