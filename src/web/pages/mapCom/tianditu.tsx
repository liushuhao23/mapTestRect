/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-06-11 20:36:04
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-16 16:30:28
 */
import React, { useState, FC, useEffect, useRef } from 'react';
import 'ol/ol.css';
import './tianditu.css';
import { Map, Overlay, View } from 'ol';
import { Icon, Style, Text } from 'ol/style.js';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';

import TileLayer from 'ol/layer/Tile.js';
import { fromLonLat } from 'ol/proj';
import { DivisionApi } from '@web/api/map';
import { ProjectItem } from '@web/type/map';
import { Fill, Stroke, Circle as sCircle } from 'ol/style';

interface Props {
  info: ProjectItem;
  proList: ProjectItem[];
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
  const { info, proList } = props;
  let centerPos = fromLonLat([116.40769, 39.89945]);
  const mapCurrent = useRef(null);
  const popupCurrent =useRef(null)
  //  var content = document.getElementById("popup-content"); //显示弹出框具体内容的div
  let mapCurrents = useRef<any>(null);
  let map: any = null;
  const getInfo = async () => {
    const data = await DivisionApi.getOneLevel();
  };

  const proPositioning = (info: ProjectItem) => {
    console.log(info, 'proPositioning')
  }


  const setIcon = (arr: ProjectItem[]) => {
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
            item: item
          });
          featureText.setProperties({
            id: item.id,
            name: item.projName,
            item: item
          });
          feature.setStyle(textStyle);
          featureText.setStyle(style);
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
          mapCurrents.current.addLayer(_marker);
          mapCurrents.current.addLayer(_markerText);
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
        url: 'http://t4.tianditu.com/DataServer?T=vec_w&tk=e82abda816105f0b122bc32800e708ae&x={x}&y={y}&l={z}',
      }),
    });
    tileLayer.set('_id', 'tileLayer')
    let tileLayerMark = new TileLayer({
      source: new XYZ({
        url: 'http://t4.tianditu.com/DataServer?T=cva_w&tk=e82abda816105f0b122bc32800e708ae&x={x}&y={y}&l={z}',
      }),
    });
    tileLayerMark.set('_id', 'tileLayerMark')
    mapCurrents.current.addLayer(tileLayer);
    mapCurrents.current.addLayer(tileLayerMark);
    mapCurrents.current.on('click', function(event: { coordinate: any; pixel: any; }) {
      // 获取点击的坐标
     
      
      mapCurrents.current.forEachFeatureAtPixel(event.pixel, function(feature: any) {
        let clickedCoordinate = event.coordinate;
        console.log('Clicked on feature:', feature);
        const overlay = new Overlay({
            //设置弹出框的容器
            element: popupCurrent.current!,
            //是否自动平移，即假如标记在屏幕边缘，弹出时自动平移地图使弹出框完全可见
            autoPan: true
        });
        (popupCurrent.current! as HTMLElement).innerHTML = "<div className='w-[100px]'><Button type='primary'>Primary Button</Button></div> ";
        overlay.setPosition(clickedCoordinate);
        mapCurrents.current.addOverlay(overlay)
      });
    });
  }
  useEffect(() => {
    initMap()
  }, []);
  useEffect(() => {
    proPositioning(props.info);
  }, [props.info])

  useEffect(() => {
    if (proList.length) {
      setIcon(proList);
    }
  }, [props.proList]);

  return <>
    <div id="map" className="mapMontainer" ref={mapCurrent}></div>
    <div id="popup" className="ol-popup" ref={popupCurrent}>
      <a href="#" id="popup-closer" className="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
  </>

};
export default TiandituMap;
