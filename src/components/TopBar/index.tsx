import React, { useCallback } from 'react';
import html2canvas from 'html2canvas';
import { Button, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';

import './index.css';
import { axiosInstance } from '../../constants';
import { useGlobalContext } from '../../store';

export default function TopBar() {
  const [searchParams] = useSearchParams();
  const { pageComponents } = useGlobalContext();
  const navigate = useNavigate();

  const generateScreenShot = useCallback(() => {
    html2canvas(document.querySelector('.canvas-container')!).then(function (canvas) {
      const oImg = canvas.toDataURL('image/png'); // 导出图片
      const oA = document.createElement('a');
      oA.download = '截图'; // 设置下载的文件名，默认是'下载'
      oA.href = oImg;
      document.body.appendChild(oA);
      oA.click();
      oA.remove(); // 下载之后把创建的元素删除
    });
  }, []);

  const savePage = async () => {
    html2canvas(document.querySelector('.canvas-container')!).then(async function (canvas) {
      const oImg = canvas.toDataURL('image/png'); // 导出图片
      await axiosInstance.post('/updatePage', { id: searchParams.get('id'), pageData: pageComponents, img: oImg });
      message.success('保存成功');
      navigate('/');
    });
  };
  return (
    <div className='topbar-header'>
      <div className='topbar-title'>{searchParams.get('title')}</div>
      <Button onClick={generateScreenShot}>截图</Button>
      <Button style={{ marginLeft: 12, marginRight: -30 }} onClick={savePage}>
        保存
      </Button>
    </div>
  );
}
