/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-06-11 20:36:04
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-27 18:06:31
 */
import React, { useState, FC, useEffect, useRef } from 'react';
import 'ol/ol.css';
import './tianditu.less';
import { Map, Overlay, View } from 'ol';
import { Icon, Style, Text } from 'ol/style.js';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON.js';
import XYZ from 'ol/source/XYZ';

import TileLayer from 'ol/layer/Tile.js';
import { fromLonLat } from 'ol/proj';
import { DivisionApi } from '@web/api/map';
import { ProjectItem } from '@web/type/map';
import { Button, Popconfirm, Space, Tooltip } from 'antd';
import { Fill, Stroke, Circle as sCircle } from 'ol/style';
import { CloseOutlined } from '@ant-design/icons';
import ReactDOMServer from 'react-dom/server';

interface Props {
  info: ProjectItem;
  proList: ProjectItem[];
  gjson: string
  closeOverlay?: () => void
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
let layerList: any[] = []

const TiandituMap: FC<Props> = props => {
  const { proList, gjson } = props;
  const [ proInfo, setProInfo ] = useState<ProjectItem | Record<string, any>>({})
  let centerPos = fromLonLat([116.40769, 39.89945]);
  const mapCurrent = useRef(null);
  const popupCurrent =useRef(null)
  let mapCurrents = useRef<any>(null);
  const flagToop = useRef<boolean>(false)
  const overlay = useRef<any>(null)
  const featureObject = useRef<any>({})
  const [flag, setFlag] = useState(false)

  const proPositioning = (info: ProjectItem) => {
    console.log(info, 'proPositioning')
    if (Object.keys(info).length) {
      const featureCurrent = featureObject.current[info.id]
      setProInfo(info)
      createOverlay(featureCurrent)
    }
  }

  const setIcon = (arr: ProjectItem[]) => {
    featureObject.current = {}
    if (layerList.length) {
      layerList.forEach(layer => {
        mapCurrents.current.removeLayer(layer)
      });
      layerList = []
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
              text: item.projName!?.length > 6 ? `${item.projName!.slice(0, 6)}...`: item.projName,
              offsetY: 30,
              backgroundStroke: new Stroke({
                color: '#ffffff',
              }),
              backgroundFill: new Fill({
                color: '#ffffff',
              }),
              fill: new Fill({
                color: '#333333'
              }),
              font: '12px sans-serif',
              padding: [1, 4, 1, 4]
            })
          })
          const feature = new Feature({
            geometry: new Point(fromLonLat([Number(item.longitude), Number(item.latitude)])),
          });
          const featureText = new Feature({
            geometry: new Point(fromLonLat([Number(item.longitude ), Number(item.latitude)])),
          })
          feature.setProperties({
            id: item.id,
            name: item.projName,
            type: 'feature',
            item: item
          });
          featureObject.current[item.id] = feature
          feature.setStyle(style);
          featureText.setStyle( textStyle);
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
          layerList.push(_marker, _markerText)
        });
      }

  };

  const initMap = () => {
    mapCurrents.current = new Map({
      view: new View({
        center: centerPos, //地图中心位置
        zoom: 5, //地图初始层级
      }),
      layers: [],
      target: mapCurrent.current!,
    });
    let tileLayer = new TileLayer({
      source: new XYZ({
        url: 'http://t4.tianditu.com/DataServer?T=vec_w&tk=56e3056c11d2a791484e789d494fcac1&x={x}&y={y}&l={z}',
      }),
    });
    tileLayer.set('_id', 'tileLayer')
    let tileLayerMark = new TileLayer({
      source: new XYZ({
        url: 'http:// /DataServer?T=cva_w&tk=56e3056c11d2a791484e789d494fcac1&x={x}&y={y}&l={z}',
      }),
    });
    tileLayerMark.set('_id', 'tileLayerMark')
    mapCurrents.current.addLayer(tileLayer);
    mapCurrents.current.addLayer(tileLayerMark);
    mapCurrents.current.on('click', function(event: { coordinate: any; pixel: any; }) {
      mapCurrents.current.forEachFeatureAtPixel(event.pixel, function(feature: any) {
        if (feature.values_?.type === "feature") {
          setProInfo(feature.values_.item)
          createOverlay(feature)
        }
      });
    });  
  }

  const createOverlay = (feature: any) => {
    console.log('输出createOverlay',  )
    const { flatCoordinates } = feature.getGeometry();
    console.log('输出',  flatCoordinates, 'flatCoordinates')
    mapCurrents.current!.removeOverlay(overlay.current)
    overlay.current = new Overlay({
        stopEvent: false,
        offset: [0, -25],
        positioning: 'center-center',
        element: popupCurrent.current!,
    });
    // setFlag(false)
    setFlag(true)
    flagToop.current = true;
    overlay.current.setPosition(flatCoordinates);
    mapCurrents.current.addOverlay(overlay.current)
    mapCurrents.current.getView().animate({zoom: 8, center: flatCoordinates, duration: 1000} )
  }

  const closeOverlay = () => {
    mapCurrents.current!.removeOverlay(overlay.current)
    setFlag(false)
  }

  const reanderGjson = (val: string) => {
    if (val) {
      const geojson = JSON.parse(val);
      console.log('输出',  geojson, 'geojson')
      const gjsonMarkers = new VectorLayer({
        source: new VectorSource({
          features: new GeoJSON().readFeatures(geojson),
        }),
      });
      mapCurrents.current.addLayer(gjsonMarkers);
    }
  }

  useEffect(() => {
    initMap()
  }, []);
  useEffect(() => {
    reanderGjson(gjson)
  }, [gjson])
  useEffect(() => {
    proPositioning(props.info);
  }, [props.info])

  useEffect(() => {
    if (proList.length) {
      setIcon(proList);
    }
  }, [props.proList]);


  return (
    <div id="map" className="mapMontainer" ref={mapCurrent}>
      <div id='popupCurrent'  ref={popupCurrent}>
        {
          flag && 
          <Tooltip  
            placement="top" 
            overlayStyle={ {'width':  '320px', 'maxWidth': '300px', 'padding': 0}}
            color={'#ffffff'}  
            autoAdjustOverflow={false}
            destroyTooltipOnHide={true} 
            getPopupContainer={() => popupCurrent.current!	} 
            open={flag} 
            title={<InfoPop closeOverlay={ closeOverlay }  info={proInfo as ProjectItem}></InfoPop>}>
          </Tooltip>
        }
      </div>
    </div>
  )
};

const InfoPop: FC<Pick<Props, 'info' | 'closeOverlay'>>  =(props) => {
  const {info, closeOverlay } = props
  const closeInfoPop = () => {
    closeOverlay!()
  }
  return  <>
    <div className="relative w-[300px] h-[285px] bg-[#FFFFFF] rounded-[8px] z-[998]">
      <div className='absolute top-[2px] right-[5px] cursor-pointer'>
        <CloseOutlined onClick={closeInfoPop}/>
      </div>
      <div className="w-[300px] h-[172px] rounded-[8px] ">
        <img className='w-full h-full' src={info.projectUrl ? info.projectUrl : require('@assets/image/bgd.jpeg')} alt="" />
      </div>
      <div className="pt-[5px] pr-[5px] pb-[0px] pl-[20px]">
        <div className="text-[#2A334A] text-[18px] font-[600] leading-[28px] tracking-normal text-left mr-[5px]">{info.projName}</div>
        <div className="text-[#47516A] text-[14px] font-[400] leading-[21px] tracking-normal text-left mr-[5px]"> {info.projApprovalType} | {info.projType}</div>
        <div className="text-[#47516A] text-[14px] font-[400] leading-[21px] tracking-normal text-left mr-[5px]">{info.projRegion}</div>
        <div className="text-[#6D7B98] text-[12px] font-[400] leading-[20px] tracking-normal text-left">{info.projAddress ? info.projAddress : ''}</div>
      </div>
    </div>
  </>
}
export default TiandituMap;
