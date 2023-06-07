/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-09-25 19:15:25
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-09-25 19:28:11
 */
import { useLocation, Location } from "react-router-dom";

export function useMyLocation<T>() {
    return useLocation() as Location & { state: T }
}