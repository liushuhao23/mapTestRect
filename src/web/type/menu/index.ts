/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-09-19 14:21:18
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-28 21:33:49
 */
type MenuItemStatic  = {
    name: string
    label: string | any
    key: string
    value: string
    parent: string
    type?: string
    icon?: React.ReactNode,
    children?: MenuItemStatic[]
}
type FileList = {
    name: string,
    path: string
}

export { MenuItemStatic, FileList }