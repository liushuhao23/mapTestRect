/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-06-28 19:14:34
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-26 20:17:07
 */
import { memo } from 'react';
import { Outlet } from 'react-router-dom';
// import './index.css'
// import Workheader  from '../components/common/header'

const MainLayout = (): JSX.Element => {
  return (
    <section className='w-full h-full'>
      <Outlet></Outlet>
    </section>
  );
};
export default memo(MainLayout);
