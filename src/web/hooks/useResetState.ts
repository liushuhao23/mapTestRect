import { useRef, useState, useCallback } from 'react';
/*
 * @Description: description 提供重置 state 方法的 Hooks
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-12-03 16:49:09
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-12-03 23:12:03
 */


const useResetState = (initialState: any) => {
    const [state, setState] = useState(initialState) 
    const initData = useRef(initialState)

    const resetState = useCallback(() => {
        setState(initData.current)
    }, [])
    return [state, setState, resetState]
}

export default useResetState