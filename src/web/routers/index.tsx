/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-07-01 09:14:34
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-26 20:21:33
 */

import Loading from '@components/Loading';

import { lazy, ReactNode, Suspense } from 'react';
import Home from '@layouts/layoutContent';
import NoMatch from '@components/common/noMatch';

import { RouteObject, redirect, Navigate } from 'react-router-dom';

const HooksTest = lazy(() => import('@pages/hooksTest/getStateTest'));

const MapCom = lazy(() => import('@pages/mapCom/index'));

const Routes: RouteObject[] = [];
const Layout = () => (
  <Suspense fallback={<Loading />}>
    <Home />
  </Suspense>
);

const lazyLayout = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const mainRoutes: any = [
  {
    path: '/',
    element: <Navigate to="/mapCom" />,
  },
  {
    path: '/mapCom',
    index: true,
    element: lazyLayout(<MapCom></MapCom>),
  },
];

Routes.push(...mainRoutes);
// Routes.push(mapComRoutes);
export default Routes;
