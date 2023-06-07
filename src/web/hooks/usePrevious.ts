/*
 * @Description: description  保存上一次状态的 Hook。
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-12-03 16:15:11
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-12-03 16:48:00
 */
import { useRef } from 'react';

export type ShouldUpdateFunc<T> = (prev: T | undefined, next: T) => boolean;

const defaultShouldUpdate = <T>(a?: T, b?: T) => !Object.is(a, b);

function usePrevious<T>(
  state: T,
  shouldUpdate: ShouldUpdateFunc<T> = defaultShouldUpdate,
): T | undefined {
    const currentRef = useRef<T>()
    const preRef = useRef<T>()
    if (shouldUpdate(currentRef.current, state)) {
        preRef.current = currentRef.current
        currentRef.current = state
    }
    return preRef.current
}

export default usePrevious;