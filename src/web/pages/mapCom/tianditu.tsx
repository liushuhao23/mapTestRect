/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-06-11 20:36:04
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-12 23:47:16
 */
import React, { useState, FC, useEffect, useRef } from 'react'
import 'ol/ol.css';
import './tianditu.css'
import { Map, View } from 'ol';
import XYZ from 'ol/source/XYZ'
import TileLayer from 'ol/layer/Tile.js';
import { fromLonLat } from "ol/proj";
import { DivisionApi } from '@web/api/map';

const TiandituMap: FC = () => {
    let centerPos = fromLonLat([116.40769, 39.89945]);
    const mapCurrent = useRef(null)
    let map = null;
    const getInfo = async () => {
        const data =  await DivisionApi.getOneLevel()
        console.log('getInfogetInfogetInfogetInfogetInfogetInfo', data,  )
    }
    useEffect(() => {
        map = new Map({
            view: new View({
                center: centerPos,//地图中心位置
                zoom: 10,//地图初始层级
                // maxZoom: 15,
                // minZoom: 9
            }),
            layers: [],
            target: mapCurrent.current!
        });
        let tileLayer = new TileLayer({
            source: new XYZ(
                {
                    url: 'http://t4.tianditu.com/DataServer?T=vec_w&tk=56e3056c11d2a791484e789d494fcac1&x={x}&y={y}&l={z}'
                }
            )
        });
        let tileLayerMark = new TileLayer({
            source: new XYZ(
                {
                 url: 'http://t4.tianditu.com/DataServer?T=cva_w&tk=56e3056c11d2a791484e789d494fcac1&x={x}&y={y}&l={z}'
                }
            )
        })
        map.addLayer(tileLayer)
        map.addLayer(tileLayerMark)
        console.log('输出',  'xxhh')
        getInfo()
    }, [])
    return (
        <div id="map" className='mapMontainer'  ref={mapCurrent}></div>
    )
}
export default TiandituMap