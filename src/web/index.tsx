/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-07-01 09:14:34
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-28 17:11:02
 */
import './public-path'
import App from '@pages/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter  } from 'react-router-dom';
import './style.css';
import 'antd/dist/antd.less';
import zhCN from 'antd/es/locale/zh_CN';
import { emitter } from './mitt';
import { CommunicationProtocol } from './common';
import { getWorkspaceData } from './assets/http/useHttp';
import { ConfigProvider } from 'antd';
import '@assets/reset.css'
import '@assets/css/index.less'
import '@assets/svg/iconfont';
import '@assets/svg/iconfont.css';


let root: any;
function render(props: any) {
  const { container } = props;
  emitter.on('getWorkspaceData', getWorkspaceData)
  root = createRoot(container? container.querySelector('#app')! : document.querySelector('#app'));
  root.render(
    <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/city' : '/'} >
      <ConfigProvider locale={zhCN} prefixCls='jiuzhoumap'>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react18] react app bootstraped');
}

export async function mount(props: any) {
  render(props);
  new CommunicationProtocol(props)
  console.log('[map] props from main framework', props);
}

export async function unmount(props: any) {
  root.unmount();
  root = null;
}
