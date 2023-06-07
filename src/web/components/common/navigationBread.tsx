/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-09-28 23:05:36
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-28 22:11:02
 */
import React, { useState, FC, useEffect, memo } from 'react';
import { Button, Space } from 'antd';
import { CloseOutlined, DownloadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
interface Props {
  breadList: {
    name: string;
    path: string;
    parent: string;
    isChecked?: boolean;
  }[];
  closeTabFun: (val: any) => void;
}

const NavigationBread: FC<Props> = (props: Props) => {
  const { breadList, closeTabFun } = props;
  const closeTab = (event: React.MouseEvent, item: any) => {
    event.stopPropagation();
    closeTabFun(item);
  };
  return (
    <>
      {breadList.map(items => {
        if (items.path === '/' || items.isChecked)
          return (
            <Button
              className="mr-2 mb-2"
              key={items.path}
              type="primary"
              size="small"
            >
              <Link to={{ pathname: items.path === '/' ? '/': 'blogItem' }} state={{ item: items.path.split('/')[1] }}>
                {items.name}
              </Link>
            </Button>
          );
        return (
          <Button
            className="mr-2 mb-2"
            key={items.path}
            type="primary"
            size="small"
          >
            <Link
              className="text-white hover:text-white"
              to={{ pathname: 'blogItem' }}
              state={{ item: items.path.split('/')[1] }}
            >
              {items.name}
            </Link>
            <CloseOutlined onClick={(event: React.MouseEvent) => closeTab(event, items)} />
          </Button>
        );
      })}
    </>
  );
};
export default React.memo(NavigationBread);
