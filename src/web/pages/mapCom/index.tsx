/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-06-08 13:50:56
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-30 17:15:03
 */
import { useState, FC, useRef } from 'react';
import TiandituMap, { TiandituRef } from './tianditu';
import { ProjectItem } from '@web/type/map';
import SearchCom from './searchCom';
import ControlsCom from './controls';
const legendList = [
  {
    name: '设计类',
    color: 'rgb(0, 190, 113)'
  },
  {
    name: 'epc类',
    color: 'rgb(41, 159, 255)'
  },
  {
    name: '其他类',
    color: 'rgb(111, 76, 255)'
  }
]
const MapCom: FC = () => {
  const [infoData, setInfoData] = useState<ProjectItem | Record<string, any>>({});
  const [proList, setProList] = useState<ProjectItem[]>([]);
  const [gjson, setGjson] = useState<string>('');
  const tiandituCom = useRef<TiandituRef>(null);

  const renderingGjson = (gjson: any) => {
    setGjson(gjson);
  };

  const getProdInfo = (id: number, info: ProjectItem) => {
    setInfoData(info);
  };

  const getProList = (val: ProjectItem[]) => {
    setProList(val);
  };

  const resetFun = () => {
    tiandituCom.current!.reset();
  };

  const initZoomFun = () => {
    tiandituCom.current!.initZoom();
  };

  const zoomInFun = () => {
    tiandituCom.current!.zoomIn();
  };

  const zoomOutFun = () => {
    tiandituCom.current!.zoomOut();
  };

  const clearLayerFun = () => {
    tiandituCom.current!.clearLayer();
  };

  /**
   * @description: 设置天地图底图
   * @return {*}
   * @author: liushuhao
   */
  const setUnderlayType = (val: string) => {
    tiandituCom.current!.setUnderlayType(val);
  };
  return (
    <div className="h-full w-full">
      <SearchCom
        getProdInfo={getProdInfo}
        getProList={getProList}
        renderingGjson={renderingGjson}
        resetFun={resetFun}
      ></SearchCom>
      <TiandituMap
        ref={tiandituCom}
        info={infoData as ProjectItem}
        gjson={gjson}
        proList={proList}
      ></TiandituMap>
      <ControlsCom
        clearLayerFun={clearLayerFun}
        initZoomFun={initZoomFun}
        zoomInFun={zoomInFun}
        zoomOutFun={zoomOutFun}
        setUnderlayType={setUnderlayType}
      ></ControlsCom>
      <div className="fixed left-[10px] bottom-[10px] w-[100px] h-[128px] bg-[rgba(255,255,255)] z-[999] py-[10px] px-[20px]">
        <ul>
          {
            legendList.map((item) => 
            <li key={item.name} className="text-[rgba(71,81,106)] text-[14px] h-[35px] flex items-center">
              <span style={ {backgroundColor: item.color }} className="w-[8px] h-[8px] rounded-[50%] block mr-[8px]"></span>
              <span>{ item.name }</span>
            </li>
            )
          }

        </ul>
      </div>
    </div>
  );
};
MapCom.whyDidYouRender = true;
export default MapCom;
