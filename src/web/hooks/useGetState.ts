import { useCallback } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
/*
 * @Description: description getState 方法获取值
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-12-02 22:27:28
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-12-03 16:47:34
 */

type GetStateAction<S> = () => S;

function useGetState<S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, GetStateAction<S>];

function useGetState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
  GetStateAction<S | undefined>,
];
function useGetState<S>(initialState?: S) {
    const [state, setState] = useState(initialState) 
    let stateRef  = useRef(initialState)
    stateRef.current= state
    const getState = useCallback(() => stateRef.current, [])
    return [state, setState, getState]
}

export default useGetState