/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-02-13 15:10:28
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-07-02 13:49:42
 */
import useStore  from '@web/store/index'
let communicationProtocol: any = null;
const { getState, setState } = useStore

class CommunicationProtocol {
    options: any

    globalStoreData: any = null

    globalStore: any

    isBx = false

    userInfo: any = {}

    mainData: any = {}

    constructor(options?: any) {
      this.options = options;
      if (this.options) {
        this.Init();
      }
    }

    Init() {
      const { globalStore, user } = this.options;
      if (globalStore) {
        this.globalStore = globalStore;
        // 监听全局数据存储对象更新
        globalStore.onGlobalStoreChange((params: any) => {
         if (Object.prototype.toString.call(params) === '[object Array]') {
          this.isBx = true;
          const [newData, oldData] = params;
          this.globalStoreData.value = newData;
          setState({globalStore: newData})
         } else {
          this.isBx = false;
          console.log('来自玖洲工作台');
          this.globalStoreData.value = params;
          this.mainData = params;
          setState({mainData: this.mainData})
         }
         setState({isBx: this.isBx})
        }, true);
      }
      if (user) {
        if (this.isBx) {
          this.userInfo.value = user;
          setState({useInfo: this.userInfo})

        }
      }
    }

    getData() {
      return { data: this.globalStoreData.value, isBx: this.isBx, userInfo: this.userInfo };
    }
}

const initCommunicationProtocol = (options: any) => {
  if (!communicationProtocol) {
    communicationProtocol = new CommunicationProtocol(options)
  }
}
export { initCommunicationProtocol, communicationProtocol };
