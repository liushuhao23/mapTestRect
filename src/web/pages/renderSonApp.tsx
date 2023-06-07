/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-06-28 19:14:46
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-09-06 19:51:33
 */
import { useLocation } from 'react-router-dom';
import { AppData } from 'web/type/global';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';

function renderSonApp(props: { infoData: AppData }) {
  const { infoData } = props;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    //
  }, []);

  return (
    <Spin spinning={loading} tip="应用加载中，请稍后" size="large">
      <div style={{height:'100%'}}>
        <span>333</span>
      </div>
    </Spin>
  );
}

export default renderSonApp;
