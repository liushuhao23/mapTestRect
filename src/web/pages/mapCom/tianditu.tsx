/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-06-11 20:36:04
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-28 17:38:38
 */
import React, { useState, FC, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import 'ol/ol.css';
import './tianditu.less';
import { Map, Overlay, View } from 'ol';
import { Icon, Style, Text } from 'ol/style.js';
import { Feature } from 'ol';
import { Point, MultiPolygon, Polygon, MultiPoint } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON.js';
import {getCenter} from 'ol/extent';
import * as turf from '@turf/turf';
import XYZ from 'ol/source/XYZ';

import TileLayer from 'ol/layer/Tile.js';
import { fromLonLat } from 'ol/proj';
import { DivisionApi } from '@web/api/map';
import { ProjectItem } from '@web/type/map';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import { Fill, Stroke, Circle as sCircle } from 'ol/style';
import { CloseOutlined } from '@ant-design/icons';
import ReactDOMServer from 'react-dom/server';
import CircleStyle from 'ol/style/Circle';

interface Props {
  info: ProjectItem;
  proList: ProjectItem[];
  gjson: string;
  closeOverlay?: () => void;
}

export interface TiandituRef {
  reset: () => void
}
// ../../assets/image/designIocn.png
const urlObj: Record<string, any> = {
  设计类: require('@assets/image/designIocn.png'),
  // 设计类选中: require('@assets/image/designIocnChecked.png'),

  EPC: require('@assets/image/epcIcon.png'),
  // EPC选中: require('@assets/image/epcIconChecked.png'),
  其他: require('@assets/image/otherIcon.png'),
  // 其他选中: require('@assets/image/otherIconChecked.png')
};

const TiandituMap =forwardRef<TiandituRef, Props >((props, ref) => {
  const { proList, gjson } = props;
  const [proInfo, setProInfo] = useState<ProjectItem | Record<string, any>>({});
  let centerPos = [108.95, 34.27];
  const mapCurrent = useRef(null);
  const popupCurrent = useRef(null);
  let mapCurrents = useRef<any>(null);
  const flagToop = useRef<boolean>(false);
  const overlay = useRef<any>(null);
  const featureObject = useRef<any>({});
  const [flag, setFlag] = useState(false);
  const cityRoundLayer = useRef<any>(null)
  const layerList = useRef<any[]>([])

  /**
   * @description: 渲染项目位置
   * @param {ProjectItem} info
   * @return {*}
   * @author: liushuhao
   */  
  const proPositioning = (info: ProjectItem) => {
    console.log(info, 'proPositioning');
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
          geometry: new Point([Number(item.longitude), Number(item.latitude)]),
        });
        const featureText = new Feature({
          geometry: new Point([Number(item.longitude), Number(item.latitude)]),
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
        });
        const _markerText = new VectorLayer({
          source: new VectorSource({
            features: [featureText],
          }),
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
        zoom: 5.4, //地图初始层级
        projection: 'EPSG:4326'
      }),
      controls: [], // 清空默认控件
      layers: [],
      target: mapCurrent.current!,
    });
    let tileLayer = new TileLayer({
      source: new XYZ({
        url: 'http://t4.tianditu.com/DataServer?T=vec_w&tk=56e3056c11d2a791484e789d494fcac1&x={x}&y={y}&l={z}',
      }),
    });
    tileLayer.set('_id', 'tileLayer');
    let tileLayerMark = new TileLayer({
      source: new XYZ({
        url: 'http://t3.tianditu.com/DataServer?T=cva_w&tk=56e3056c11d2a791484e789d494fcac1&x={x}&y={y}&l={z}',
      }),
    });
    tileLayerMark.set('_id', 'tileLayerMark');
    mapCurrents.current.addLayer(tileLayer);
    mapCurrents.current.addLayer(tileLayerMark);
    mapCurrents.current.on('click', function (event: { coordinate: any; pixel: any }) {
      mapCurrents.current.forEachFeatureAtPixel(event.pixel, function (feature: any) {
        if (feature.values_?.type === 'feature') {
          setProInfo(feature.values_.item);
          createOverlay(feature);
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
      let lineData =  geojson.coordinates;;
      let lineFeature = null;
      if (geojson?.type === 'MultiPolygon') {
        lineFeature = new Feature({
          geometry: new MultiPolygon(lineData)
        });
      } else if (geojson?.type === 'Polygon') {
        lineFeature = new Feature({
          geometry: new Polygon(lineData)
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
        }
      });
      cityRoundLayer.current = lineLayer
      mapCurrents.current.addLayer(lineLayer);
      const geom = turf.getGeom(geojson);
      const bbox = turf.bbox(geom);
      mapCurrents.current.getView().fit(bbox, {
        duration: 1000,
        padding: [100, 100, 100, 100]
      });
    }
  };

  /**
   * @description: 暴露出给父组件调用
   * @param {*} ref
   * @return {*}
   * @author: liushuhao
   */  
  useImperativeHandle(ref, ()=> ({
    reset
  }))

  /**
   * @description:重置
   * @return {*}
   * @author: liushuhao
   */  
  const reset = () => {
    closeOverlay()
    cityRoundLayer.current && mapCurrents.current.removeLayer(cityRoundLayer.current);
    mapCurrents.current.getView().animate({ zoom: 5.4, center: centerPos, duration: 1000 });
  }

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
    if (proList.length) {
      setIcon(proList);
    }
  }, [props.proList]);

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
            title={<InfoPop closeOverlay={closeOverlay} info={proInfo as ProjectItem}></InfoPop>}
          ></Tooltip>
        )}
      </div>
    </div>
  );
});

const InfoPop: FC<Pick<Props, 'info' | 'closeOverlay'>> = props => {
  const { info, closeOverlay } = props;
  const closeInfoPop = () => {
    closeOverlay!();
  };
  return (
    <>
      <div className="relative w-[300px] h-[285px] bg-[#FFFFFF] rounded-[8px] z-[998]">
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
      </div>
    </>
  );
};
export default TiandituMap;
