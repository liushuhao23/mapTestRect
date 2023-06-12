
/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-06-08 22:05:59
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-13 00:07:46
 */
import { AxiosRequestConfig } from 'axios';
let workspaceData: any
export const getWorkspaceData = (val: any) => {
  console.log(val, 'val8888888888888')
  workspaceData = val
} 

export const settingHttpHeaders = (requestConfig: any,): AxiosRequestConfig => {
  console.log(workspaceData,'xjjxjxjxjxjjxjxjxjjxj')
  requestConfig.headers['Uc-Authorization'] = workspaceData.token;
  return requestConfig;
}
