/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-09-30 16:16:01
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-28 22:07:29
 */
import React, { useState, FC, useMemo, useEffect, useCallback, memo } from 'react';

import { MenuItemStatic } from '@web/type/menu';
import { Menu } from 'antd';
import { BreadListType } from '@web/type/content/content';
import type { MenuProps } from 'antd';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import SubMenu from 'antd/lib/menu/SubMenu';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
// import { Props } from '@web/type/codemirror';
const list = require('@web/menu/index');
let menuData: MenuProps['items'] = [];
interface Props {
  seleteMenuFun: (val: any) => void
}

const menuList = JSON.parse(JSON.stringify(list))

tree(menuList)


function tree(data: MenuItemStatic[]) {
  return data.map(item => {
    item.key = item.value
    if (item.children === undefined) {
      item.label = (
        <Link style={{ color: '#ffffff' }} to={{ pathname: 'blogItem' }} state={{ item: item.value }}>
          {item.name}
        </Link>
      )
      // return (
      //   <Menu.Item key={item.value}>
      //     <Link to={{ pathname: 'blogItem' }} state={{ item: item.value }}>
      //       {item.name}
      //     </Link>
      //   </Menu.Item>
      // );
    } else {
      item.label = item.name
      tree(item.children)
      // return (
      //   <Menu.SubMenu key={item.value} icon={<SettingOutlined />} title={item.name}>
      //     {}
      //   </Menu.SubMenu>
      // );
    }
  });
}


const SiderMenu: FC<Props> = (props) => {
  const { seleteMenuFun } = props
  const [initKey, setKey] = useState<string[]>(['']);

  const onclick = useCallback((item: any) => {
    seleteMenuFun(item)
    setKey(item.key);
  }, []);

  return (
    <>
      <div className="h-screen">
        <Menu
          mode="inline"
          defaultSelectedKeys={initKey}
          selectedKeys={initKey}
          defaultOpenKeys={[]}
          style={{ height: '100%', borderRight: 0 }}
          onSelect={item => onclick(item)}
          items={menuList}
        >
          {/* {menuDom} */}
        </Menu>
      </div>
    </>
  );
};
export default memo(SiderMenu);
