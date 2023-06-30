/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-06-16 15:29:24
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-30 14:14:24
 */
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
// 创建矢量底图
function createVec_w() {
  var source = new XYZ({
    url: 'http://t4.tianditu.com/DataServer?T=vec_w&tk=56e3056c11d2a791484e789d494fcac1&x={x}&y={y}&l={z}',
  });
  var layer = new TileLayer({
    source: source,
    zIndex: 0
  });
  return layer;
}
// 创建标注图层
function createCva_w() {
  var source = new XYZ({
    url: 'http://t4.tianditu.com/DataServer?T=cva_w&tk=56e3056c11d2a791484e789d494fcac1&x={x}&y={y}&l={z}',
  });
  var layer = new TileLayer({
    source: source,
    zIndex: 0
  });
  return layer;
}
// 创建影像底图
function createImg_w() {
  var source = new XYZ({
    url: 'http://t4.tianditu.com/DataServer?T=img_w&tk=56e3056c11d2a791484e789d494fcac1&x={x}&y={y}&l={z}',
  });
  var layer = new TileLayer({
    source: source,
    zIndex: 0
  });
  return layer;
}
// 创建地形底图
function createTer_w() {
  var source = new XYZ({
    url: 'http://t4.tianditu.com/DataServer?T=ter_w&tk=56e3056c11d2a791484e789d494fcac1&x={x}&y={y}&l={z}',
  });
  var layer = new TileLayer({
    source: source,
    zIndex: 0
  });
  return layer;
}

export { createTer_w, createImg_w, createCva_w, createVec_w }