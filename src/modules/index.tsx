import React, { useCallback, useEffect, useState } from 'react';
import { Card, Input, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, EyeOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import './index.css';
import { axiosInstance } from '../constants';
import { useGlobalContext } from '../store';

const { confirm } = Modal;

export default function Main() {
  const navigate = useNavigate();
  const [pages, setPages] = useState<any[]>([]);
  const { setPageComponents } = useGlobalContext();

  const createPage = useCallback(async () => {
    let pageTitle = '';
    confirm({
      title: '输入大屏页面标题',
      icon: <ExclamationCircleOutlined />,
      content: <Input placeholder='请输入标题' style={{ width: 200, marginTop: 10 }} onChange={(e) => (pageTitle = e.target.value)} />,
      okText: '确定',
      cancelText: '取消',
      async onOk() {
        const {
          data: { _id, title },
        } = await axiosInstance.post('/createPage', { title: pageTitle });
        setPageComponents({ type: 'NEW', data: [] });
        navigate(`/edit?id=${_id}&title=${title}`);
      },
    });
  }, []);

  const editPage = useCallback(async (id: string) => {
    const {
      data: { title, pageData },
    } = await axiosInstance.get('getPage', { params: { id } });
    setPageComponents({ type: 'NEW', data: pageData || [] });
    navigate(`/edit?id=${id}&title=${title}`);
  }, []);

  const getPages = useCallback(async () => {
    const {
      data: { pageList },
    } = await axiosInstance.get('/getAllPages');
    setPages(pageList);
  }, []);

  const showDeleteConfirm = (id: string) => {
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '是否删除该大屏页面',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      async onOk() {
        await axiosInstance.post('/deletePage', { id });
        await getPages();
      },
    });
  };

  useEffect(() => {
    getPages();
  }, []);

  return (
    <div className='main'>
      <header className='main-header'>
        <img src={require('../assets/img/bg1.jpg')} alt='' className='main-bg' width='100%' height='200px' />
        <div className='main-title'>
          可视化数据大屏
          <br />
          <span>Dashboard</span>
        </div>
      </header>
      <section className='main-container'>
        <Card className='main-card' hoverable onClick={createPage}>
          <p>+ 新建</p>
        </Card>
        {pages.map((item) => (
          <Card
            style={{ width: 240, height: 239, marginRight: 50 }}
            cover={<img alt='example' height='120px' src={item.img} />}
            actions={[
              <EyeOutlined
                key='eyes'
                onClick={() => {
                  const img = new Image();
                  img.src = item.img;
                  const newWindow = window.open('', '_blank')!;
                  newWindow.document.write(img.outerHTML);
                  newWindow.document.title = '预览图';
                  newWindow.document.close();
                }}
              />,
              <EditOutlined key='edit' onClick={() => editPage(item._id)} />,
              <DeleteOutlined key='delete' onClick={() => showDeleteConfirm(item._id)} />,
            ]}
            key={item._id}
          >
            {item.title}
          </Card>
        ))}
      </section>
    </div>
  );
}
