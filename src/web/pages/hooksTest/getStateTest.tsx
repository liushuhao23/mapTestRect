/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-12-02 22:55:59
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-12-03 23:15:38
 */
import React, { useState, FC, useEffect } from 'react';
import useGetState from '@hooks/useGetState';
import usePrevious from '@hooks/usePrevious';
import useResetState from '@hooks/useResetState';

let a = { c: 1 };
let b = { c: 1 };
console.log(Object.is(a, b));

let foo = 1;
let bar = 1;
console.log(Object.is(foo, bar));

const Test1: FC = props => {
  console.log('hooksTest');
  const [count, setCount] = useState(0);
  const previous = usePrevious(count);

  const [val, setVal, getVal] = useGetState();

  const [state, setState, resetState] = useResetState({
    hello: '',
    count: 0,
  });
  useEffect(() => {
    // setVal((val: any) => val + 1)
    // console.log('val', getVal())
    // setInterval(() => {
    // }, 2000)
  }, []);

  const ggg = () => {
    setVal(() => val);
    setTimeout(() => {
      console.log('val', getVal());
    }, 0);
  };

  const zzz = () => {
    setState({ hello: 'world', count: foo++ });
  } 
  return (
    <>
      <div>
        <pre>{JSON.stringify(state, null, 2)}</pre>
        <p>
          <button type="button" style={{ marginRight: '8px' }} onClick={zzz}>
            set hello and count
          </button>

          <button type="button" onClick={resetState}>
            resetState
          </button>
        </p>
      </div>
      {/* <div>counter current value: {count}</div>
      <div style={{ marginBottom: 8 }}>counter previous value: {previous}</div>

      <button type="button" onClick={() => setCount(c => c + 1)}>
        increase
      </button>
      <button type="button" style={{ marginLeft: 8 }} onClick={() => setCount(c => c - 1)}>
        decrease
      </button> */}

      {/* <div className="">
        return <button onClick={ggg}>count: {val}</button>;
      </div> */}
    </>
  );
};
export default Test1;
