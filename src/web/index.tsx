/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-07-01 09:14:34
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-09 17:29:22
 */
import './public-path'
import App from '@pages/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter  } from 'react-router-dom';
import './style.css';
import 'antd/dist/antd.css';
import './asstes/theme/index.less'

let root: any;
function render(props: any) {
  const { container } = props;
  root = createRoot(container? container.querySelector('#app')! : document.querySelector('#app'));
  root.render(
    <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/maApp' : '/'} >
      <App />
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
  console.log('[react18] props from main framework', props);
  render(props);
}

export async function unmount(props: any) {
  root.unmount();
  root = null;
}
