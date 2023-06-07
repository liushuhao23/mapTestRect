/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-07-01 09:14:34
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-12-04 22:49:02
 */

import Loading from '@components/Loading';
import MainLayout from '@layouts/layoutContent';
import appInfo from '../../../config/appDataInfo';

import { lazy, ReactNode, Suspense } from 'react';
// const Home = lazy(() => import('@layouts/MainLayout'));
import Home from '@layouts/layoutContent'
import Test1 from '@pages/test'
import HomePage from '@pages/HomePage/index'



import RenderSonApp from '@pages/renderSonApp';
import NoMatch from '@components/common/noMatch'

import { RouteObject } from 'react-router-dom';

import childrenRouters from './children/index'

const Courses = lazy(() => import('@pages/Courses'));
const Vue3 = lazy(() => import('@pages/vue3'));
const LobgItem = lazy(() => import('@pages/blog/index'))

const HooksTest = lazy(() => import('@pages/hooksTest/getStateTest'))

const AsyncComponents = lazy(() => import('@pages/asyncComponents/index'))




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
    { index: true, element: <HomePage /> },
    { path: '*', element: <NoMatch /> },
    { path: 'test', element: <Test1 /> },
    { path: 'blogItem', element: lazyLayout(<LobgItem></LobgItem>)},
    { path: 'hooksTest', element: lazyLayout(<HooksTest></HooksTest>)},
    { path: 'asyncComponents', element: lazyLayout(<AsyncComponents></AsyncComponents>)},
  ],
};


Routes.push(mainRoutes);
export default Routes;
