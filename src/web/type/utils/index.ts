/*
  @Author: lize
  @Date: 2021/6/29
  @Description : 
  @Parames :
  @Example :
  @Last Modified by: lize
  @Last Modified time: 2021/6/29
*/
export interface UtilsClass {
    options: null
    uuid: (val: string)=> string
    getUrlParams: (url?: string) => any
    analysisNowUrl: () => any
    removeStringSpace: (str: string) => string
    debounce: (fn: any, wait: number, immediate?: boolean) => (...args: any) => {}
    dealBlob: (res: any) => Promise<any>
    getAccontId: (state: any) => string | undefined
    getEntId: (state: any) => string | undefined
    isBx: () => boolean
}

