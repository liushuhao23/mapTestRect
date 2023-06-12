/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-02-13 15:10:28
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-13 00:03:46
 */

import { emitter } from "@web/mitt";


// eslint-disable-next-line import/no-mutable-exports
// let communicationProtocol = null;

// eslint-disable-next-line import/no-mutable-exports
let mainData: any;

class CommunicationProtocol {
    options: any

    globalStore: any

    globalStoreData: any

    constructor(options: any) {
      this.options = options;
      if (this.options) {
        this.Init();
      }
    }

    Init() {
      const { globalStore } = this.options;
      console.log(globalStore, 'globalStore')
      if (globalStore) {
        this.globalStore = globalStore;
        // 监听全局数据存储对象更新
        globalStore.onGlobalStoreChange((params: any) => {
          emitter.emit('getWorkspaceData', params)
          mainData = params;
        }, true);
      }
    }
}
export { CommunicationProtocol, mainData };