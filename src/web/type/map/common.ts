/*
 * @Description: 公共类型
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-04-24 14:36:13
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-04-24 14:36:45
 */
export interface ReverseReferenceCity<T> {
  code: number,
  data: T,
  message: string
}
