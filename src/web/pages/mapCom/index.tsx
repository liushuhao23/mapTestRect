/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-06-08 13:50:56
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-12 17:13:18
 */
import React, { useState, FC } from 'react'
import TiandituMap from './tianditu'

const MapCom: FC = () => {
    return (
      <div className='h-full w-full'>
        <TiandituMap></TiandituMap>
      </div>
    )
}
export default MapCom