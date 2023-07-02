/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-06-11 20:36:04
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-07-02 14:58:20
 */
import React, { useState, FC, useEffect, useRef, useImperativeHandle, forwardRef, memo } from 'react';
import 'ol/ol.css';
import './tianditu.less';
import { Map, Overlay, View } from 'ol';
import { Icon, Style, Text } from 'ol/style.js';
import { Feature } from 'ol';
import { Point, MultiPolygon, Polygon, MultiPoint, Geometry } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import * as turf from '@turf/turf';
import XYZ from 'ol/source/XYZ';

import TileLayer from 'ol/layer/Tile.js';
import { fromLonLat, transformExtent } from 'ol/proj';
import { ProjectItem } from '@web/type/map';
import { Button, message, Tooltip } from 'antd';
import { Fill, Stroke } from 'ol/style';
import { CloseOutlined } from '@ant-design/icons';
import { createTer_w, createImg_w, createCva_w, createVec_w } from './map';
import useStore  from '@web/store/index'
import create from 'zustand'
import { UtilsTools } from '@assets/utils/utilsTools';
import useGetState from '@hooks/useGetState';
import { DivisionApi } from '@web/api/map';
import { WorkspaceApi } from '@web/api/workspace/pro';
interface Props {
  info: ProjectItem;
  proList: ProjectItem[];
  gjson: string;
  closeOverlay?: () => void;
  globalStore?: any
  userInfo?: any
}

export interface TiandituRef {
  reset: () => void;
  setUnderlayType: (val: string) => void;
  initZoom: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  clearLayer: () => void;
}
const urlObj: Record<string, any> = {
  设计类: require('@assets/image/designIocn.png'),
  设计类选中: require('@assets/image/designIocnChecked.png'),

  EPC: require('@assets/image/epcIcon.png'),
  EPC选中: require('@assets/image/epcIconChecked.png'),
  其他: require('@assets/image/otherIcon.png'),
  其他选中: require('@assets/image/otherIconChecked.png'),
};

const isBx= UtilsTools.isBx()

const TiandituMap = forwardRef<TiandituRef, Props>((props, ref) => {
  const store = create(useStore)
  const globalStore = store((state: any) => state.globalStore)
  const userInfo = store((state: any) => state.userInfo)

  const { proList, gjson } = props;
  const [proInfo, setProInfo] = useGetState<ProjectItem | Record<string, any>>({});
  let centerPos = fromLonLat([108.95, 34.27]);
  const mapCurrent = useRef(null);
  const popupCurrent = useRef(null);
  let mapCurrents = useRef<any>(null);
  const flagToop = useRef<boolean>(false);
  const overlay = useRef<any>(null);
  const featureObject = useRef<any>({});
  const [flag, setFlag] = useState(false);
  const cityRoundLayer = useRef<any>(null);
  const layerList = useRef<any[]>([]);
  let tileLayer = useRef<TileLayer<XYZ>>();
  let tileLayerMark = useRef<TileLayer<XYZ>>(); 
  let checkedLayer = useRef<Feature<Geometry>>();
  /**
   * @description: 渲染项目位置
   * @param {ProjectItem} info
   * @return {*}
   * @author: liushuhao
   */
  const proPositioning = (info: ProjectItem ) => {
    if (Object.keys(info).length) {
      const featureCurrent = featureObject.current[info.id];
      setProInfo(info);
      createOverlay(featureCurrent);
    }
  };

  /**
   * @description: 渲染图标
   * @param {ProjectItem} arr
   * @return {*}
   * @author: liushuhao
   */
  const setIcon = (arr: ProjectItem[]) => {
    featureObject.current = {};
    if (layerList.current.length) {
      layerList.current.forEach(layer => {
        mapCurrents.current.removeLayer(layer);
      });
      layerList.current = [];
    }
    if (arr.length) {
      arr.forEach(item => {
        const style = new Style({
          image: new Icon({
            width: 37,
            height: 34,
            src: item.projApprovalType
              ? urlObj[item.projApprovalType]
              : require('../../assets/image/designIocn.png'),
          }),
        });
        const textStyle = new Style({
          text: new Text({
            text: item.projName!?.length > 6 ? `${item.projName!.slice(0, 6)}...` : item.projName,
            offsetY: 30,
            backgroundStroke: new Stroke({
              color: '#ffffff',
            }),
            backgroundFill: new Fill({
              color: '#ffffff',
            }),
            fill: new Fill({
              color: '#333333',
            }),
            font: '12px sans-serif',
            padding: [1, 4, 1, 4],
          }),
        });
        const feature = new Feature({
          geometry: new Point(fromLonLat([Number(item.longitude), Number(item.latitude)])),
        });
        const featureText = new Feature({
          geometry: new Point(fromLonLat([Number(item.longitude), Number(item.latitude)])),
        });
        feature.setProperties({
          id: item.id,
          name: item.projName,
          type: 'feature',
          item: item,
        });
        featureObject.current[item.id] = feature;
        feature.setStyle(style);
        featureText.setStyle(textStyle);
        const _marker = new VectorLayer({
          source: new VectorSource({
            features: [feature],
          }),
          zIndex: 99,
        });
        const _markerText = new VectorLayer({
          source: new VectorSource({
            features: [featureText],
          }),
          zIndex: 99,
        });
        mapCurrents.current.addLayer(_markerText);
        mapCurrents.current.addLayer(_marker);
        layerList.current.push(_marker, _markerText);
      });
    }
  };

  /**
   * @description: 初始化地图
   * @return {*}
   * @author: liushuhao
   */
  const initMap = () => {
    mapCurrents.current = new Map({
      view: new View({
        center: centerPos, //地图中心位置
        zoom: 5, //地图初始层级
        projection: 'EPSG:3857',
      }),
      controls: [], // 清空默认控件
      layers: [],
      target: mapCurrent.current!,
    });
    tileLayer.current = createVec_w();
    tileLayer.current.set('_id', 'tileLayer');
    tileLayerMark.current = createCva_w();
    tileLayerMark.current.set('_id', 'tileLayerMark');
    mapCurrents.current.addLayer(tileLayer.current);
    mapCurrents.current.addLayer(tileLayerMark.current);
    mapCurrents.current.on('click', function (event: { coordinate: any; pixel: any }) {
      mapCurrents.current.forEachFeatureAtPixel(event.pixel, function (feature: any) {
        if (feature.values_?.type === 'feature') {
          const item = feature.get('item');
          console.log('输出', feature.get('item'), 'feature');
          const style = new Style({
            image: new Icon({
              width: 37,
              height: 34,
              src: item.projApprovalType
                ? urlObj[item.projApprovalType + '选中']
                : require('../../assets/image/designIocn.png'),
            }),
          });
          feature.setStyle(style);
          setProInfo(item);
          createOverlay(feature);
          checkedLayer.current = feature;
        }
      });
    });
  };

  /**
   * @description: 创建弹窗
   * @param {any} feature
   * @return {*}
   * @author: liushuhao
   */
  const createOverlay = (feature: any) => {
    const { flatCoordinates } = feature.getGeometry();
    mapCurrents.current!.removeOverlay(overlay.current);
    overlay.current = new Overlay({
      stopEvent: false,
      offset: [0, -25],
      positioning: 'center-center',
      element: popupCurrent.current!,
    });
    setFlag(true);
    flagToop.current = true;
    overlay.current.setPosition(flatCoordinates);
    mapCurrents.current.addOverlay(overlay.current);
    mapCurrents.current.getView().animate({ zoom: 8, center: flatCoordinates, duration: 1000 });
  };

  /**
   * @description: 关闭弹窗
   * @return {*}
   * @author: liushuhao
   */
  const closeOverlay = () => {
    mapCurrents.current!.removeOverlay(overlay.current);
    setFlag(false);
  };

  /**
   * @description: 重置选中的icon
   * @return {*}
   * @author: liushuhao
   */  
  const resetCheckedPopInfo = () => {
    if (checkedLayer.current) {
      const item = checkedLayer.current!.get('item');
      const style = new Style({
        image: new Icon({
          width: 37,
          height: 34,
          src: item.projApprovalType
            ? urlObj[item.projApprovalType]
            : require('../../assets/image/designIocn.png'),
        }),
      });
      checkedLayer.current.setStyle(style);
    }
  }

  /**
   * @description: gjson style 方法
   * @return {*}
   * @author: liushuhao
   */
  const getStyle = () => {
    return new Style({
      stroke: new Stroke({
        width: 3, // 线宽
        color: 'red', // 线的颜色
      }),
    });
  };

  /**
   * @description: 渲染geojson
   * @param {any} val
   * @return {*}
   * @author: liushuhao
   */
  const reanderGjson = (val: any) => {
    if (val) {
      cityRoundLayer.current && mapCurrents.current.removeLayer(cityRoundLayer.current);
      const geojson = JSON.parse(val.geojson);
      let lineData = geojson.coordinates;
      let lineFeature = null;
      if (geojson?.type === 'MultiPolygon') {
        const geometry = new MultiPolygon(lineData).transform('EPSG:4326', 'EPSG:3857');
        lineFeature = new Feature({
          geometry,
        });
      } else if (geojson?.type === 'Polygon') {
        const geometry = new Polygon(lineData).transform('EPSG:4326', 'EPSG:3857');
        lineFeature = new Feature({
          geometry,
        });
      }
      const lineSource = new VectorSource({
        features: [],
      });
      lineSource.addFeature(lineFeature!);

      let lineLayer = new VectorLayer({
        source: lineSource,
        style: () => {
          return getStyle();
        },
        zIndex: 99,
      });
      cityRoundLayer.current = lineLayer;
      mapCurrents.current.addLayer(lineLayer);
      const geom = turf.getGeom(geojson);
      const bbox = turf.bbox(geom);
      const bboxNew = transformExtent(bbox, 'EPSG:4326', 'EPSG:3857');
      mapCurrents.current.getView().fit(bboxNew, {
        duration: 1000,
        padding: [100, 100, 100, 100],
      });
    }
  };

  /**
   * @description: 暴露出给父组件调用
   * @param {*} ref
   * @return {*}
   * @author: liushuhao
   */
  useImperativeHandle(ref, () => ({
    reset,
    setUnderlayType,
    clearLayer,
    initZoom,
    zoomIn,
    zoomOut,
  }));

  const clearLayer = () => {
    resetCheckedPopInfo()
    closeOverlay();
    cityRoundLayer.current && mapCurrents.current.removeLayer(cityRoundLayer.current);
  };

  const initZoom = () => {
    mapCurrents.current.getView().animate({ zoom: 5, center: centerPos, duration: 1000 });
  };

  const zoomIn = () => {
    const zoom = mapCurrents.current.getView().getZoom();
    mapCurrents.current.getView().animate({ zoom: zoom + 1, duration: 500 });
  };

  const zoomOut = () => {
    const zoom = mapCurrents.current.getView().getZoom();
    mapCurrents.current.getView().animate({ zoom: zoom - 1, duration: 500 });
  };



  /**
   * @description:重置
   * @return {*}
   * @author: liushuhao
   */
  const reset = () => {
    resetCheckedPopInfo()
    closeOverlay();
    cityRoundLayer.current && mapCurrents.current.removeLayer(cityRoundLayer.current);
    mapCurrents.current.getView().animate({ zoom: 5, center: centerPos, duration: 1000 });
  };

  /**
   * @description: 切换项目底图
   * @return {*}
   * @author: liushuhao
   */
  const setUnderlayType = (val: string) => {
    mapCurrents.current.removeLayer(tileLayer.current);
    mapCurrents.current.removeLayer(tileLayerMark.current);
    const options: Record<string, TileLayer<XYZ>> = {
      地图: createVec_w(),
      影像: createImg_w(),
      地形: createTer_w(),
    };
    if (options.hasOwnProperty(val)) {
      tileLayer.current = options[val];
      tileLayer.current.set('_id', 'tileLayer');
      tileLayerMark.current = createCva_w();
      tileLayerMark.current.set('_id', 'tileLayerMark');
    }
    mapCurrents.current.addLayer(tileLayer.current);
    mapCurrents.current.addLayer(tileLayerMark.current);
  };

  const getProjectValue = (val: string) => {
    const info = props.proList.filter((item) => item.projId === val)
    if (!info.length) {
      message.error('该项目不在地图上')
      return
    }
    proPositioning(info[0])
  };

  /**
 * @description: 获取城市对应的gjson 只有八仙调用，玖洲不走这个方法
 * @param {*} code
 * @return {*}
 * @author: liushuhao
 */
const getCityGjson = (code: string): Promise<{gjson: string, x: number, y: number}> => new Promise((r, j) => {
  DivisionApi.getCityDetail({ code, maxLevel: '5' }).then((rs) => {
    if (rs?.code === 200) {
      if (rs?.data?.geojson) {
        r({ gjson: rs.data.geojson, x: rs.data.xcoordinate, y: rs.data.ycoordinate });
      } else {
        message.error('该区域没行政区划示例数据，请联系管理员');
        j(new Error('该区域没行政区划示例数据，请联系管理员'));
      }
    }
  });
});

  useEffect(() => {
    initMap();
  }, []);
  useEffect(() => {
    reanderGjson(gjson);
  }, [gjson]);
  useEffect(() => {
    proPositioning(props.info);
  }, [props.info]);

  useEffect(() => {
    console.log('输出',  props.proList)
    if (proList.length) {
      setIcon(proList);
    }
  }, [props.proList]);

  useEffect(() => {
    if (globalStore && isBx) {
      if (globalStore.workspace.type === 0) {
        mapCurrents.current.getView().animate({ zoom: 5, center: centerPos, duration: 1000 });
      }
      if (globalStore.workspace.type === 2) {
        console.log('项目变更，项目id', globalStore.workspace.workspaceMetaglobalStore.globalStore.id);
        const proId = globalStore.workspace.workspaceMetaglobalStore.globalStore.id;
        getProjectValue(proId);
      }
      if (globalStore.workspace.type === 3) {
        console.log('城市变更，城市id', globalStore.workspace.cityCode);
        getCityGjson(globalStore.workspace.cityCode).then((rs: any) => {
          reanderGjson(rs)
        });
      }
    }
  }, [ globalStore ])

  return (
    <div id="map" className="mapMontainer" ref={mapCurrent}>
      <div id="popupCurrent" ref={popupCurrent}>
        {flag && (
          <Tooltip
            placement="top"
            overlayStyle={{ width: '320px', maxWidth: '300px', padding: 0 }}
            color={'#ffffff'}
            autoAdjustOverflow={false}
            destroyTooltipOnHide={true}
            getPopupContainer={() => popupCurrent.current!}
            open={flag}
            title={<InfoPop closeOverlay={closeOverlay} userInfo={userInfo} globalStore={globalStore} info={proInfo as ProjectItem}></InfoPop>}
          ></Tooltip>
        )}
      </div>
    </div>
  );
});

const InfoPop: FC<Pick<Props, 'info' | 'closeOverlay' | 'globalStore' | 'userInfo'>> = props => {
  const { info, globalStore, closeOverlay, userInfo } = props;
  const closeInfoPop = () => {
    closeOverlay!();
  };

  const updatePro = () => {
    const params = {
      projectId: '',
      type: 0,
      userId: '',
      accountId: ''
    };
    params.projectId = info.projId!;
    params.userId = userInfo.id;
    params.accountId = UtilsTools.getAccontId(globalStore.state.newData)!;
    WorkspaceApi.judgeProjectPermission(info.projId!).then((rs: any) => {
      if (rs?.data) {
        if (globalStore.state.newData.type === 2) {
          WorkspaceApi.lastLogin(params).then((r) => {
            console.log('输出', r);
            window.location.href = '';
          });
        } else {
          window.location.href = '';
        }
      } else {
        message.error('您没有该项目权限');
      }
    });
  };
  

  const goDataPositioning = () => {
    const ip = `${process.env.APP_API_PROXY}/changjiang/placement?projectId=${info.projId}`;
    console.log('数据落位地址', ip);
    window.open(ip);
  };

  const goProInfo = () => {
    updatePro();
  };
  return (
    <>
      <div  className="relative w-[300px] bg-[#FFFFFF] rounded-[8px] z-[998]" >
        <div className="absolute top-[2px] right-[5px] cursor-pointer">
          <CloseOutlined onClick={closeInfoPop} />
        </div>
        <div className="w-[300px] h-[172px] rounded-[8px] ">
          <img
            className="w-full h-full"
            src={info.projectUrl ? info.projectUrl : require('@assets/image/bgd.jpeg')}
            alt=""
          />
        </div>
        <div className="pt-[5px] pr-[5px] pb-[0px] pl-[20px]">
          <div className="text-[#2A334A] text-[18px] font-[600] leading-[28px] tracking-normal text-left mr-[5px]">
            {info.projName}
          </div>
          <div className="text-[#47516A] text-[14px] font-[400] leading-[21px] tracking-normal text-left mr-[5px]">
            {' '}
            {info.projApprovalType} | {info.projType}
          </div>
          <div className="text-[#47516A] text-[14px] font-[400] leading-[21px] tracking-normal text-left mr-[5px]">
            {info.projRegion}
          </div>
          <div className="text-[#6D7B98] text-[12px] font-[400] leading-[20px] tracking-normal text-left">
            {info.projAddress ? info.projAddress : ''}
          </div>
        </div>
          {
            isBx && <div className='w-full py-[5px] flex flex-row-reverse right-0 px-0'>
            <Button className='mr-[5px]' size='small' onClick={goDataPositioning}>数据落位</Button>
            <Button className='mr-[5px]' size='small'  onClick={goProInfo}>项目详情</Button>
          </div>
          }

      </div>
    </>
  );
};
export default memo(TiandituMap);