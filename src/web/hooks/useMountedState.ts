/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-06-04 15:46:44
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-12-02 22:27:17
 */
import { useCallback, useEffect, useRef } from 'react';

export default function useMountedState(): () => boolean {
  const mountedRef = useRef<boolean>(false);
  const get = useCallback(() => mountedRef.current, []);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      
      mountedRef.current = false;
    };
  }, []);
  return get;
}
