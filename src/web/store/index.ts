/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-07-02 00:09:57
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-07-02 13:21:30
 */
import { createStore } from 'zustand/vanilla'

type State = {
  globalStore: any
  isBx: boolean,
  useInfo: any,
  mainData: any
}

type Action = {
  updateGlobalStore: (firstName: State['globalStore']) => void
  updateUseInfo: (info: State['useInfo']) => void
  updateMainData: (info: State['mainData']) => void
}

const useStore = createStore<State & Action>((set) => ({
  globalStore: {},
  isBx: false,
  useInfo: {},
  mainData: {},
  updateUseInfo: (info) => set(() => ({ useInfo: info })),
  updateGlobalStore: (globalStore) => set(() => ({ globalStore: globalStore })),
  updateMainData: (info) => set(() => ({ mainData: info })),
}))
export default useStore;
