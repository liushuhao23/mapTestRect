/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-06-08 13:50:56
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-28 17:40:07
 */
import { useState, FC, useRef } from 'react'
import TiandituMap, { TiandituRef } from './tianditu'
import { ProjectItem } from '@web/type/map';
import SearchCom from './searchCom';
import ControlsCom from './controls';



const MapCom: FC = () => {
  const [infoData, setInfoData] = useState<ProjectItem | Record<string, any>>({})
  const [proList, setProList] = useState<ProjectItem[]>([])
  const [gjson, setGjson] = useState<string>('')
  const tiandituCom = useRef<TiandituRef>(null)

  const renderingGjson = (gjson: any) => {
    setGjson(gjson)
  }

  const getProdInfo = (id: number, info: ProjectItem) => {
    setInfoData(info)
  }
 
  const getProList = (val: ProjectItem[]) => {
    setProList(val)
  }

  const resetFun = () => {
    tiandituCom.current!.reset();
  }
  return (
    <div className='h-full w-full'>
      <SearchCom getProdInfo={getProdInfo} getProList= {getProList} renderingGjson={renderingGjson} resetFun={resetFun}></SearchCom>
      <TiandituMap ref={tiandituCom}  info = {infoData as ProjectItem} gjson={gjson} proList={proList}></TiandituMap>
      <ControlsCom ></ControlsCom>
    </div>
  )
}
export default MapCom