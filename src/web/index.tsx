/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-07-01 09:14:34
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-08 17:36:53
 */
import './public-path'
import App from '@pages/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter  } from 'react-router-dom';
import './style.css';
import 'antd/dist/antd.css';
// import 'antd/dist/antd.less';
// antd/dist/antd.less
import './asstes/theme/index.less'


// import 'codemirror/lib/codemirror.css';
// import 'codemirror/lib/codemirror.js';
// import './wdyr';
// const container = document.getElementById('app')!;
// const root = createRoot(container);
// root.render(<App />);
// root.render(
//   <BrowserRouter basename={window.__MICRO_APP_BASE_ROUTE__ ? 'maApp' : '/'} >
//     <App />
//   </BrowserRouter>
// //   <HashRouter  >
// //   <App />
// // </HashRouter>
// );
let root: any;
console.log(window.__POWERED_BY_QIANKUN__ , 'window.__POWERED_BY_QIANKUN__ ')
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
  const { container } = props;
  root.unmount();
  root = null;
  // ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
}
