/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-06-28 17:39:35
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-28 17:58:51
 */
import React, { useState, FC } from 'react'
const ControlsCom: FC = () => {
    return (
      <div className='fixed right-[10px] bottom-[10px] z-[999] '>

      <div className="toolsOne">
        <ul>
          <li className="toolsOnItem" onClick={() => {}}>
            <img className="icon" src="@/assets/image/dingwei.png" alt="" />
          </li>
          <li className="toolsOnItem" onClick={() => {}}>
            <img className="icon" src="@/assets/image/jiahao.png" alt="" />
          </li>
          <li className="toolsOnItem" onClick={() => {}}>
            <img className="icon" src="@/assets/image/jianhao.png" alt="" />
          </li>
        </ul>
      </div>
      <div className="item" onClick={() => {}}>
        <img className="icon" src="@/assets/image/qingchu.png" alt="" />
      </div>
      <div className="item">
        <img className="icon" src="@/assets/image/ditu.png" onClick={() => {}} alt="" />
        <div className="underlay">
        </div>
      </div>
      </div>
    )
}
export default ControlsCom