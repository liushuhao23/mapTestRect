/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-09-30 16:38:58
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-12-03 16:17:42
 */
import { BreadListType } from '@web/type/content/content';
import { Breadcrumb } from 'antd';
import React, { useState, FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Typography } from 'antd';

interface Props {
  breadList: BreadListType[];
}
const BreadcrumbCom: FC<Props> = props => {
  const { breadList } = props;
  const items: MenuProps['items'] = [
    {
      key: 'update',
      label: '编辑个人资料',
    },
    {
      key: 'singout',
      label: '退出',
    }
  ];

  return (
    <>
      <div className="flex items-center w-full">
        <Breadcrumb className="mb-2">
          {breadList.map((item: BreadListType) => {
            if (item.name === '首页')
              return (
                <Breadcrumb.Item key={item.path}>
                  <Link to="/">{item.name}</Link>
                </Breadcrumb.Item>
              );
            return (
              <Breadcrumb.Item key={item.path}>
                <span>{item.name}</span>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    </>
  );
};
export default BreadcrumbCom;
