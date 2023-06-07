/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-10-10 09:22:55
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-08 15:49:38
 */
import React, { useState, FC } from 'react'
import { Drawer } from 'antd';
import { Input } from 'antd';
import './index.less'
interface Props {
    desc: string
    open: boolean
    resVal: string
    onClose: (e: any) => void
}
const Index: FC<Props> = (props) => {
    const { onClose, open, desc, resVal } = props
    return (
      <div className="">
        <Drawer  title="测试方法" placement="bottom" onClose={ onClose } open={open}>
          <Input placeholder="请输入测试用例" />
        </Drawer>
      </div>

    )
}
export default Index