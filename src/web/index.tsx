/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-07-01 09:14:34
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-07 13:48:23
 */
import './public-path'
import App from '@pages/App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter  } from 'react-router-dom';
import './style.css';
// import 'antd/dist/antd.css';
// import 'antd/dist/antd.less';
// antd/dist/antd.less

// import 'codemirror/lib/codemirror.css';
// import 'codemirror/lib/codemirror.js';
// import './wdyr';
const container = document.getElementById('app')!;
const root = createRoot(container);
root.render(<App />);
root.render(
  <BrowserRouter basename={window.__MICRO_APP_BASE_ROUTE__ || '/'} >
    <App />
  </BrowserRouter>
//   <HashRouter  >
//   <App />
// </HashRouter>
);
