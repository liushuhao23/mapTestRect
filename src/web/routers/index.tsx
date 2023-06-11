/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-07-01 09:14:34
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-11 21:10:05
 */

import Loading from '@components/Loading';

import { lazy, ReactNode, Suspense } from 'react';
import Home from '@layouts/layoutContent'
import NoMatch from '@components/common/noMatch'

import { RouteObject } from 'react-router-dom';



const HooksTest = lazy(() => import('@pages/hooksTest/getStateTest'))

const MapCom = lazy(() => import('@pages/mapCom/index'))


const Routes: RouteObject[] = [];
const Layout = () => (
  <Suspense fallback={<Loading />}>
     <Home />
  </Suspense>
);

const lazyLayout = (children: ReactNode): ReactNode => {
  return <Suspense  fallback={<Loading />}>
    {children}
  </Suspense> 
}

const mainRoutes: any = {
  path: '/',
  element: <Layout />,
  children: [
    { index: true, element: <Layout /> },
    { path: '*', element: <NoMatch /> },
    { path: 'hooksTest', element: lazyLayout(<HooksTest></HooksTest>)},
    { path: 'mapCom', element: lazyLayout(<MapCom></MapCom>)},
  ],
};


Routes.push(mainRoutes);
export default Routes;
