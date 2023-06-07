import { DependencyList, useCallback, useRef, useState } from "react";
import { FunctionReturningPromise, PromiseType } from "./misc";
import useMountedState from "./useMountedState";

/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-06-03 19:33:58
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-06-05 12:19:31
 */
type AsyncState<T> =
    | {
        loading: boolean;
        error?: undefined;
        value?: undefined;
    }
    | {
        loading: true;
        error?: Error | undefined;
        value?: T;
    }
    | {
        loading: false;
        error: Error;
        value?: undefined;
    }
    | {
        loading: false;
        error?: undefined;
        value: T;
    };

type StateFromFunctionReturningPromise<T extends FunctionReturningPromise> = AsyncState<PromiseType<ReturnType<T>>>
type AsyncFnReturn<T extends FunctionReturningPromise> = [StateFromFunctionReturningPromise<T>, T]


export function useAsyncFn<T extends FunctionReturningPromise>(fn: T,
    deps: DependencyList[],
    initialState: StateFromFunctionReturningPromise<T> = { loading: false }): AsyncFnReturn<T> {
    let lastCallId = useRef(0)
    const isMounted = useMountedState()
    const [state, set] = useState(initialState)
    const hooksDeps = [fn, isMounted, state.loading]
    if (deps.length) {
        (<typeof hooksDeps & DependencyList[]>hooksDeps).push(deps)
    }
    const callback = useCallback((...args: Parameters<T>): ReturnType<T> => {
        const callId = ++lastCallId.current
        set({ loading: true })
        return fn(...args).then((value) => {
            isMounted() && callId === lastCallId.current && set({ value, loading: false })
            return value
        }, (error) => {
            isMounted() && callId === lastCallId.current && set({ error, loading: false })
            return error
        }) as ReturnType<T>
    }, [...hooksDeps])
    return [state, callback as unknown as T]
}