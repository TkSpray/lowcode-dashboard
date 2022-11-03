import React from 'react';
import { Form, Input, Button, InputNumber, Upload, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

import './index.css';
import { ChartType, TextState, useGlobalContext } from '../../store';
import { getBase64 } from '../../utils';

const { TextArea } = Input;

export default function ConfigBar() {
  const { activeComponentId, pageComponents, setPageComponents } = useGlobalContext();
  const [form] = Form.useForm();

  const initData = {
    id: '0',
    title: '',
    type: '',
  };

  const currentComponentState = pageComponents.find((item) => item.id === activeComponentId) || initData;

  const isChart = !['', ChartType.Image, ChartType.Text].includes(currentComponentState.type);

  form.setFieldsValue(currentComponentState);

  const updateComponentState = () => {
    setPageComponents({
      type: 'EDIT',
      data: {
        ...currentComponentState,
        ...form.getFieldsValue(),
      },
    });
  };

  const handleChange = async (info: any) => {
    setPageComponents({
      type: 'EDIT',
      data: {
        ...currentComponentState,
        url: await getBase64(info.file.originFileObj),
      },
    });
  };

  function beforeUpload(file: { type: string; size: number }) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 文件');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小超过2MB');
    }
    return isJpgOrPng && isLt2M;
  }

  return (
    <div className='config-sider'>
      <Form name='dynamic_form_item' layout='vertical' form={form} onValuesChange={updateComponentState}>
        {currentComponentState.type && (
          <>
            {isChart && (
              <Form.Item label='标题' name='title'>
                <Input placeholder='请输入数据' style={{ width: 200, marginRight: 10 }} />
              </Form.Item>
            )}
            <Form.Item label='位置'>
              <Form.Item noStyle name='x'>
                <InputNumber addonBefore='x' style={{ width: 105, marginRight: 10, marginBottom: 10 }} />
              </Form.Item>
              <Form.Item noStyle name='y'>
                <InputNumber addonBefore='y' style={{ width: 105, marginRight: 10, marginBottom: 10 }} />
              </Form.Item>
              <Form.Item noStyle name='width'>
                <InputNumber addonBefore='w' style={{ width: 105, marginRight: 10, marginBottom: 10 }} />
              </Form.Item>
              <Form.Item noStyle name='height'>
                <InputNumber addonBefore='h' style={{ width: 105, marginRight: 10, marginBottom: 10 }} />
              </Form.Item>
            </Form.Item>
          </>
        )}
        {isChart && (
          <>
            <Form.List name='data'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item label={index === 0 ? '数据' : ''} required={false} key={field.key}>
                      <Form.Item {...field} noStyle>
                        <Input placeholder='请输入数据' style={{ width: 200, marginRight: 10 }} />
                      </Form.Item>
                      {fields.length > 1 ? <MinusCircleOutlined className='dynamic-delete-button' onClick={() => remove(field.name)} /> : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button type='dashed' onClick={() => add()} icon={<PlusOutlined />}>
                      添加
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.List name='xAxis'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item label={index === 0 ? '横坐标' : ''} required={false} key={field.key}>
                      <Form.Item {...field} noStyle>
                        <Input placeholder='请输入横坐标' style={{ width: 200, marginRight: 10 }} />
                      </Form.Item>
                      {fields.length > 1 ? <MinusCircleOutlined className='dynamic-delete-button' onClick={() => remove(field.name)} /> : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button type='dashed' onClick={() => add()} icon={<PlusOutlined />}>
                      添加
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </>
        )}
        {currentComponentState.type === ChartType.Image && (
          <Upload onChange={handleChange} showUploadList={false} beforeUpload={beforeUpload}>
            <Button icon={<UploadOutlined />} style={{ marginBottom: 20 }}>
              上传图片
            </Button>
          </Upload>
        )}
        {currentComponentState.type === ChartType.Text && (
          <TextArea
            rows={4}
            style={{ marginBottom: 20 }}
            value={(currentComponentState as TextState).value || ''}
            onChange={(e) =>
              setPageComponents({
                type: 'EDIT',
                data: {
                  ...currentComponentState,
                  value: e.target.value || '',
                },
              })
            }
          />
        )}
        {currentComponentState.type && (
          <Button danger type='dashed' onClick={() => setPageComponents({ type: 'DELETE', data: activeComponentId })} icon={<PlusOutlined />} style={{ display: 'block' }}>
            删除
          </Button>
        )}
      </Form>
    </div>
  );
}
