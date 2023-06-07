/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-07-05 14:48:28
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-24 22:32:20
 */
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import {  Layout } from 'antd';
import { BreadListType } from '@web/type/content/content';
import NavigationBread from '@components/common/navigationBread';
import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

// import { breadcrumbMachine, breadCrumInstance } from '@web/xstate/breadcrumb';
// import { interpret } from 'xstate';
import BreadcrumbCom from './breadcrumb';

interface Props {
  collapsed: boolean;
  breadList: BreadListType[]
  breadCrumbList: BreadListType[]
  closeTab: (val: any) => void
  setCollapsedFun: (value: boolean) => void
}


const WorkContent: FC<Props> = (props): JSX.Element => {
  const { setCollapsedFun, closeTab, collapsed, breadList, breadCrumbList } = props;

  useEffect((): void => {
    localStorage.setItem('BreadList', JSON.stringify(breadList));
  }, [breadList]);


  return (
    <Layout>
      <Layout>
        <Layout className="min-h-full overflow-auto bg-white p-3 pl-0 rounded-md ml-3">
          <div className="shadow-lg mb-3 p-2 bg-white">
            <div className='flex mb-3'>
              <span className='mr-2'>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: () => setCollapsedFun(!collapsed),
                })}
              </span>
              <BreadcrumbCom breadList={breadCrumbList}></BreadcrumbCom>
            </div>
            <NavigationBread breadList={breadList} closeTabFun={closeTab}></NavigationBread>
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default memo(WorkContent);
