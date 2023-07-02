/*
  @Author: lize
  @Date: 2021/6/29
  @Description : 
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/6/29
*/

import { communicationProtocol } from '@web/common';
import { UtilsClass } from '@web/type/utils';

let UtilsTools: UtilsClass;

class Utils implements UtilsClass {
  options: any = null;
  constructor(options: any) {
    this.options = options;
  }
  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string): string => {
      const r = (Math.random() * 16) | 0; // eslint-disable-line
      let v = c == 'x' ? r : (r & 0x3) | 0x8; // eslint-disable-line
      return v.toString(16);
    });
  }
  getUrlParams(url?: string): any {
    const href = url || window.location.href;
    const paramsStr = href.split('?')[1];
    const paramsAry = paramsStr ? paramsStr.split('&') : [];
    const tem: any = {};
    for (let i = 0; i < paramsAry.length; i += 1) {
      const [key, value] = paramsAry[i].split('=');
      tem[key] = value;
    }
    return tem;
  }
  analysisNowUrl(): any {
    let path = window.location.hash ? window.location.hash.split('?')[0] : '#/'; // eslint-disable-line
    if (path) path = path.split('#')[1]; // eslint-disable-line
    const query = this.getUrlParams();
    return {
      protocol: window.location.protocol,
      port: window.location.port,
      pathname: window.location.pathname,
      origin: window.location.origin,
      hostname: window.location.hostname,
      host: window.location.host,
      hash: window.location.hash,
      path,
      query,
    };
  }
  // 去除字符串空格
  removeStringSpace(str: string): string {
    return str.replace(/\s*/g, '');
  }
  debounce(fn: any, wait = 1000, immediate?: boolean): any {
    let timer: any = null;
    return (...args: any) => {
      if (timer) clearTimeout(timer);
      if (immediate && !timer) {
        fn.call(this, args);
      }
      timer = setTimeout(() => {
        fn.call(this, args);
      }, wait);
    };
  }

  dealBlob(res: any): any {
    const reader: any = new FileReader();
    if (res.data.type === 'application/json') {
      return new Promise(resolve => {
        const blob = new Blob([res.data], { type: 'application/json' });
        const fr = new FileReader();
        const resultData: any = {};
        fr.onload = item => {
          const outcome = JSON.parse((item.target!.result as string).replace(/\\/g, ''));
          if (!outcome.success) {
            resultData.img = '';
            resultData.errMessage = outcome.errMessage;
            resultData.success = false;
          }
          resolve(resultData);
        };
        fr.readAsText(blob);
      });
    }
    if (res.data.type === 'text/xml') {
      return new Promise(resolve => {
        reader.readAsDataURL(res.data);
        const result: any = {};
        reader.onload = (item: any) => {
          result.img = item.target.result;
          result.errMessage = '';
          result.success = true;
          resolve(result);
        };
      });
    }
  }

  getAccontId(state: any): string | undefined {
    return state.workspace?.type === 2 || state.workspace?.type === 3
      ? state.workspace?.workspaceMetaData._enterprise.accountId
      : state.workspace?.workspaceMetaData.accountId;
  }

  getEntId(state: any): string | undefined {
    return state.workspace?.type === 2 || state.workspace?.type === 3
      ? state.workspace?.workspaceMetaData._enterprise.id
      : state.workspace?.workspaceMetaData.id;
  }

  isBx(): boolean {
    return !window.__POWERED_BY_QIANKUN__ ? false : communicationProtocol.getData().isBx;
  }
}
UtilsTools = new Utils({});
export { UtilsTools };
