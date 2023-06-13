/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-06-11 20:36:04
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-13 23:26:57
 */
import React, { useState, FC, useEffect, useRef } from 'react';
import 'ol/ol.css';
import './tianditu.css';
import { Map, View  } from 'ol';
import { Icon, Style } from 'ol/style.js';
import { Layer} from 'ol/layer.js';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ';

import TileLayer from 'ol/layer/Tile.js';
import { fromLonLat } from 'ol/proj';
import { DivisionApi } from '@web/api/map';
import { ProjectItem } from '@web/type/map';
import { Fill, Stroke, Circle as sCircle } from 'ol/style';

interface Props {
    info: ProjectItem
    proList: ProjectItem[]
}
// const urlObj: Record<string, any> = {
//   设计: require('@assets/image/'),
//   epc: require('@assets/image/epcIcon.png'),
//   其他: require('@assets/image/otherIcon.png')
// };



const TiandituMap: FC<Props> = (props) => {
  const { info, proList } = props;
  let centerPos = fromLonLat([116.40769, 39.89945]);
  const mapCurrent = useRef(null);
  let mapCurrents = useRef<any>(null)
  let map: any = null;
  const getInfo = async () => {
    const data = await DivisionApi.getOneLevel();
  };
  let layerCurrnet = useRef<any>(null)

  const setIcon = (arr: ProjectItem[]) => {
    if (arr.length) {
      arr.forEach((item) => {
        const style = new Style({
          image: new Icon({
            src: require('../../asstes/image/epcIcon.png')
          })
        })
        const _style = new Style({
          image: new sCircle({
              radius: 10,
              stroke: new Stroke({
                  color: '#fff',
              }),
              fill: new Fill({
                  color: '#3399CC',
              }),
          }),
      });
        const feature = new Feature({
            geometry: new Point(fromLonLat([Number(item.longitude), Number(item.latitude)]))
        });
        feature.setStyle(style);
        const _marker = new VectorLayer({
          source: new VectorSource({
              features: [feature],
          }),
      });
      mapCurrents.current.addLayer(_marker);
      });
    }
  }
  useEffect(() => {
    mapCurrents.current = new Map({
      view: new View({
        center: centerPos, //地图中心位置
        zoom: 10, //地图初始层级
      }),
      layers: [
      ],
      target: mapCurrent.current!,
    });
    let tileLayer = new TileLayer({
      source: new XYZ({
        url: 'http://t4.tianditu.com/DataServer?T=vec_w&tk=56e3056c11d2a791484e789d494fcac1&x={x}&y={y}&l={z}',
      }),
    });
    let tileLayerMark = new TileLayer({
      source: new XYZ({
        url: 'http://t4.tianditu.com/DataServer?T=cva_w&tk=56e3056c11d2a791484e789d494fcac1&x={x}&y={y}&l={z}',
      }),
    });
    mapCurrents.current.addLayer(tileLayer);
    mapCurrents.current.addLayer(tileLayerMark);
    console.log('输出', 'tianditutianditutianditutianditutianditutianditu', map);
    // getInfo();
  }, []);
  // useEffect(() => {
  // }, [props.info])

  useEffect(() => {
    if (proList.length) {
      setIcon(proList)
    }

  }, [props.proList])

  return <div id="map" className="mapMontainer" ref={mapCurrent}></div>;
};
export default TiandituMap;
