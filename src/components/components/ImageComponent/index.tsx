import React from 'react';
import { ImageState } from '../../../store';
import Dragger from '../../Dragger';
import { Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import './index.css';

export interface ImageComponent {
  state: ImageState;
}

export default function ImageComponent({ state }: ImageComponent) {
  const { url: imageUrl } = state;

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Dragger state={state}>
      <Upload name='avatar' listType='picture-card' className='image-uploader' showUploadList={false} disabled>
        {imageUrl ? <img src={imageUrl} style={{ width: '100%', height: '100%' }} draggable='false' /> : uploadButton}
      </Upload>
    </Dragger>
  );
}
