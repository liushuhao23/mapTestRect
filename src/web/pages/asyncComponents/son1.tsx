/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-12-04 22:47:12
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-12-05 22:20:58
 */
import React, { useState, FC, useEffect } from 'react';
const Index: FC<{ counter: number; isStale: boolean }> = props => {
  const [loading, setLoading] = useState(false);
  let [z, setZz] = useState(1)
  let tt = props.counter

  useEffect(() => {
    console.log(props.isStale, 'props.isStale')
    if (props.isStale) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [props.isStale]);
  useEffect(() => {
    while(tt < 100000) {
      // tt++
      tt++
    }
    console.log('输出',  tt)
    // setZz(1111)
  }, [props.counter]);
  return (
    
    <>
     <span>{tt}</span>
    {loading ? <span>加载中</span> :  <span>{props.counter}</span>}
    </>
  )
};
export default Index;
