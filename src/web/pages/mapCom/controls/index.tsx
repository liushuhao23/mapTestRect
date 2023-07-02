/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-06-28 17:39:35
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-07-02 12:43:44
 */
import { useState, FC, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface Props {
  setUnderlayType: (val: string) => void;
  initZoomFun: () => void;
  zoomInFun: () => void;
  zoomOutFun: () => void;
  clearLayerFun: () => void;
}
const ControlsCom: FC<Props> = props => {
  const { setUnderlayType, initZoomFun, zoomInFun, zoomOutFun, clearLayerFun } = props;
  const [underlayFlag, setUnderlayFlag] = useState(false);
  const [underlayList, setUnderlayList] = useState([
    {
      name: '地图',
      img: 'https://www.tianditu.gov.cn/static/map/vec.jpg',
      checked: true,
    },
    {
      name: '影像',
      img: 'https://www.tianditu.gov.cn/static/map/img.jpg',
      checked: false,
    },
    {
      name: '地形',
      img: 'https://www.tianditu.gov.cn/static/map/ter.jpg',
      checked: false,
    },
  ]);

  /**
   * @description: 设置天地图底图
   * @param {any} item
   * @return {*}
   * @author: liushuhao
   */
  const clickunderlayItem = (item: { img: string; checked: boolean; name: any }) => {
    const data = JSON.parse(JSON.stringify(underlayList));
    data.map(
      (i: { img: string; checked: boolean; name: any }) => (i.checked = i.name === item.name)
    );
    setUnderlayList(data);
    setUnderlayType(item.name);
  };

  const initZoom = () => {
    initZoomFun();
  };

  const zoomIn = () => {
    zoomInFun();
  };

  const zoomOut = () => {
    zoomOutFun();
  };

  const clearLayer = () => {
    clearLayerFun();
  };
  return (
    <div className="fixed right-[10px] bottom-[10px] z-[999] ">
      <div
        style={{ boxShadow: ' 0px 2px 10px rgba(201, 201, 201, 0.5)' }}
        className="w-[30px] h-[85px] rounded-[4px] flex items-center bg-[rgba(245,247,250)] opacity-[.95] border-solid border-[rgba(218,224,230)] border-[1px]"
      >
        <ul className="w-full">
          <li className="w-full h-[25px] flex justify-center cursor-pointer" onClick={initZoom}>
            <img className="w-[18px] h-[18px]" src={require('@assets/image/dingwei.png')} alt="" />
          </li>
          <li className="w-full h-[25px] flex justify-center cursor-pointe" onClick={zoomIn}>
            <img className="w-[18px] h-[18px]" src={require('@assets/image/jiahao.png')} alt="" />
          </li>
          <li className="w-full h-[25px] flex justify-center cursor-pointe" onClick={zoomOut}>
            <img className="w-[18px] h-[18px]" src={require('@assets/image/jianhao.png')} alt="" />
          </li>
        </ul>
      </div>
      <div
        style={{
          border: '0.5px solid rgb(218, 224, 230)',
          boxShadow: ' 0px 2px 10px rgba(201, 201, 201, 0.5)',
        }}
        className="relative cursor-pointer  mt-[20px] w-[30px] h-[30px] bg-[rgb(245,247,250)] opacity-[.95] rounded-[4px] flex items-center justify-center"
        onClick={clearLayer}
      >
        <img className="w-[18px] h-[18px]" src={require('@assets/image/qingchu.png')} alt="" />
      </div>
      <div
        style={{
          border: '0.5px solid rgb(218, 224, 230)',
          boxShadow: ' 0px 2px 10px rgba(201, 201, 201, 0.5)',
        }}
        className="relative cursor-pointer  mt-[20px] w-[30px] h-[30px] bg-[rgb(245,247,250)] opacity-[.95] rounded-[4px] flex items-center justify-center"
      >
        <img
          className="w-[18px] h-[18px]"
          src={require('@assets/image/ditu.png')}
          onClick={() => setUnderlayFlag(!underlayFlag)}
          alt=""
        />
        <AnimatePresence>
          {underlayFlag && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-[-160px] flex text-[#fff]"
            >
              {underlayList.map(item => (
                <div
                  key={item.name}
                  onClick={() => clickunderlayItem(item)}
                  className="w-[45px] h-[45px] rounded-[50%] bg-[#ffffff] ml-[5px] overflow-hidden relative"
                >
                  <img src={item.img} className="w-full h-full rounded-[50%]" alt="" />
                  <div
                    className={`${
                      item.checked
                        ? 'border-[1px] border-solid border-[#0ffaff] text-[#0ffaff]'
                        : ''
                    } w-[45px] h-[23px] text-[10px] pt-[5px] absolute bottom-0 left-0 right-0 m-auto text-center whitespace-nowrap bg-[rgba(25,40,58,0.3)]`}
                  >
                    <span>{item.name}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
// ControlsCom.whyDidYouRender = true;
export default memo(ControlsCom);
