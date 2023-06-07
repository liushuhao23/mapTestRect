/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-06-28 23:23:42
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-12-02 23:07:56
 */
import { useRoutes } from 'react-router-dom';
import routes from '../routers';
import LayoutHeader from '@components/common/header';
import LayoutSiderMenu from '@components/common/siderMenu';
import { Layout } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Content, Header } from 'antd/lib/layout/layout';
import { BreadListType } from '@web/type/content/content';
import Queue from '@web/queue';

const list = require('@components/article/index').default;

const LayoutsMain = (): JSX.Element => {
  const routing = useRoutes(routes);
  const [collapsed, setCollapsed] = useState(false);


  const getBreadListLocalStorage = (): BreadListType[] => {
    const breadList = JSON.parse(localStorage.getItem('BreadList')!);
    return breadList;
  };
  const checkedBreadList = (val: string, list: BreadListType[]) => {
    return list.some(x => x.path.split('/')[1] === val);
  };
  const [BreadList, setBreadList] = useState<BreadListType[]>(
    getBreadListLocalStorage() || [
      {
        name: '首页',
        path: '/',
        isChecked: true,
        parent: '',
      },
    ]
  );
  const [breadCrumbList, setBreadCrumbList] = useState<BreadListType[]>([
    {
      name: '首页',
      path: '/',
      parent: '',
    },
  ]);

  const setCollapsedFun = useCallback((value: boolean) => {
    setCollapsed(value);
  }, []);

  const closeTab = useCallback((val: any) => {
    const res = BreadList.filter((item) => item.path !== val.path)
    setBreadList(res)
  }, [BreadList])

  const seleteMenu = useCallback((val: any) => {
    setBreadCrumbList((oldVal: BreadListType[]): BreadListType[] => {
      const target =  list[val.key]
      return [
        {
          name: '首页',
          path: '/',
          isChecked: false,
          parent: '',
        },
        target,
      ];
    });
    setBreadList((oldVal: BreadListType[]): BreadListType[] => {
      const target =  list[val.key]
      target.isChecked = true
      oldVal.forEach(((item) => {
        if (val.key !== item.path.split('/')[1]) {
          item.isChecked = false
        } else {
          item.isChecked = true
        }
      }))
      if (checkedBreadList(val.key, oldVal)) {
        return [...oldVal];
      } else {
        return [...oldVal, target];
      }
    });
  }, [BreadList, breadCrumbList]);

  return (
    <div className="w-full h-full">
      <Layout style={{ display: 'flex', flexDirection: 'row' }}>
        <Sider trigger={null} collapsible collapsed={collapsed} className="h-full overflow-y-auto">
          <LayoutSiderMenu seleteMenuFun={seleteMenu}></LayoutSiderMenu>
        </Sider>
        <Layout className="site-layout">
          <div className="site-layout-background" style={{ padding: 0 }}>
            <LayoutHeader
              breadCrumbList={breadCrumbList}
              breadList={BreadList}
              collapsed={collapsed}
              setCollapsedFun={setCollapsedFun}
              closeTab={closeTab}
            ></LayoutHeader>
          </div>
          <Content
            className="site-layout-background"
            id= 'mainContent'
            style={{
              margin: '0px 10px 16px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {routing}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default LayoutsMain;
