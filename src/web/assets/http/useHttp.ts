/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-25 16:17:45
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-07-02 13:43:48
 */
import { UtilsTools } from '@assets/utils/utilsTools';
import useStore from '@web/store/index';

const { getState } = useStore;
export const settingHttpHeaders = (requestConfig: any): any => {
  const { globalStore, isBx, useInfo, mainData } = getState();
  if (isBx) {
    requestConfig.headers.entid = UtilsTools.getEntId(globalStore.value);
    requestConfig.headers.accountId = UtilsTools.getAccontId(globalStore.value);
  } else {
    if (mainData?.token) {
      requestConfig.headers['Uc-Authorization'] = mainData.token;
    }
    if (mainData?.isLocalhost) {
      requestConfig.headers.ip = 'localhost';
    }
  }

  return requestConfig;
};
