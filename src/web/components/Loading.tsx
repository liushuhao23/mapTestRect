/*
 * @Description: loading
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-06-28 19:14:18
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-30 16:52:58
 */
import { Spin } from 'antd';
import { FC } from 'react';

const Loading: FC = () => (
      <Spin tip="加载中, 请稍后" size="large" className='w-full h-full flex flex-col justify-center items-center'></Spin>
);
export default Loading;
