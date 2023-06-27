/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-06-08 13:50:56
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-27 17:52:58
 */
import React, { useState, FC, useEffect } from 'react'
import TiandituMap from './tianditu'

import { ProjectItem } from '@web/type/map';
import { Popover } from 'antd';
import SearchCom from './searchCom';



const MapCom: FC = () => {
  const [infoData, setInfoData] = useState<ProjectItem | Record<string, any>>({})
  const [proList, setProList] = useState<ProjectItem[]>([])
  const [gjson, setGjson] = useState<string>('')

  const renderingGjson = (gjson: string) => {
    setGjson(gjson)
  }

  const getProdInfo = (id: number, info: ProjectItem) => {
    setInfoData(info)
  }
 
  const getProList = (val: ProjectItem[]) => {
    setProList(val)
  }
  return (
    <div className='h-full w-full'>
      <SearchCom getProdInfo={getProdInfo} getProList= {getProList} renderingGjson={renderingGjson}></SearchCom>
      <TiandituMap info = {infoData as ProjectItem} gjson={gjson} proList={proList}></TiandituMap>
    </div>
  )
}
export default MapCom