/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-10-17 14:39:01
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-01 14:50:49
 */
import React, { useState, FC, useEffect } from 'react'
import CodeMirrorCom from '@components/codemirror/index'
interface Props {
  getValFun: (val: string) => void
}

const Weightbagproblem1: FC<Props> = (props: Props): JSX.Element => {
  const [value, setValue] = useState('')
  const getVal = (val: string) => {
    props.getValFun(val)
  }

  const name = 'Weightbagproblem1'

  const weightBagProblemFun = (wight: number[], value: number[], size: number) => {
    let length = wight.length
    let dp  = Array(size + 1).fill(0)
    for (let i = 1; i <= length; i++) {
      for (let j = size; j >= wight[i - 1]; j--) {
        dp[j] = Math.max(dp[j], dp[j - wight[ i - 1]] + value[i - 1])
      }
    }
    console.log(dp, 'dp')
    return dp[size]
  }

  useEffect(() => {
    
    weightBagProblemFun([1, 3, 4, 5], [15, 20, 30, 55], 6)
    setValue(`const ${name} = ${weightBagProblemFun.toString()}`)
  }, [])

  return (
    <div className="w-full h-full">
      <CodeMirrorCom value={value} getVal={getVal}></CodeMirrorCom>
    </div>
  )
}
export default Weightbagproblem1
