/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-06-28 19:14:58
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-09-06 14:44:59
 */
// import { toggleMachineAtom } from '@hooks/useLibs/yideng-jotai';
// import { atom, useAtom } from 'jotai';
// import { atomWithImmer, useImmerAtom } from 'jotai/immer';
// import { memo, useCallback, useEffect } from 'react';
// function Courses() {
//   const [state, send] = useAtom(toggleMachineAtom);
//   const data = state.value.toString();
//   return (
//     <div>
//       <h2 onClick={() => send('TOGGLE')}>{data}</h2>
//       <hr />
//     </div>
//   );
// }

// export default memo(Courses);

import React from 'react';

// import { useLocalStorage } from '@hooks/useLocalStorage';

// Usage
export default function Component() {
  // const [isDarkTheme, setDarkTheme] = useLocalStorage<boolean>('darkTheme', true);

  const toggleTheme = () => {
    // setDarkTheme(prevValue => !prevValue);
    // 
  };

  return (
    <>
    </>
  );
}
