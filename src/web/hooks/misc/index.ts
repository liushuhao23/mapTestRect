/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-06-03 19:33:58
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-06-03 20:48:56
 */

export type PromiseType<P extends Promise<unknown>> =  P extends Promise<infer T > ? T : unknown
export type FunctionReturningPromise = (...args: any[]) => Promise<any>