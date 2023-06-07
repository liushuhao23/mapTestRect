/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-12-04 22:47:01
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-12-05 22:33:14
 */
import React, { useState, FC, useDeferredValue } from 'react'
import SonOne from './son1'
import SonTwo from './son2'
import List from './list'
import { useCallback } from 'react'
import { useEffect } from 'react'

const Index: FC = () => {
    const [counter, setCounter] = useState(0)
    const deferredCounter = useDeferredValue(counter);
    const [ value ,setInputValue ] = React.useState('')
    
    const query = React.useDeferredValue(value)
    
    const handleChange =  (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    useEffect(() => {
      console.log(222)
    }, [])
    return (
      <>
      <span>{Math.ceil(Math.random()*10)}</span>
      <input onChange={handleChange}
          placeholder="输入搜索内容"
          value={value}
      />
        <List></List>
        {/* <button onClick={() => setCounter(counter + 1)}>增加</button> */}
      </>
    )
}
export default Index