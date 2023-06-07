/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-06-28 23:23:42
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-10-07 22:26:59
 */
import { useRoutes } from 'react-router-dom';
import routes from '../routers';
import './App.css';
import LayoutHeader from '@components/common/header';
import LayoutSiderMenu from '@components/common/siderMenu'
import { Layout } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { useCallback, useState } from 'react';
import { Content, Header } from 'antd/lib/layout/layout';
import LayoutMain from '@layouts/layoutsMain'


const App = (): JSX.Element => {
  return (
    <LayoutMain></LayoutMain>
  )
};
export default App;

