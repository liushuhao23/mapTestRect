/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-10-31 11:07:57
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-10-31 13:56:38
 */
import React, { useState, FC } from 'react'
import CodeMirrorCom from '@components/codemirror/index'
interface Props {
  getValFun: (val: string) => void
}

const Maxprofit: FC<Props> = (props: Props): JSX.Element => {
  const [value, setValue] = useState('')
  const getVal = (val: string) => {
    props.getValFun(val)
  }

  const maxProfit = (prices: number[]) => {
    let length = prices.length
    let dp = Array(length).fill([0, 0])
    dp[0] = [-prices[0], 0];
    for (let i = 1; i < length; i++) {
      dp[i] = [
        Math.max(dp[i - 1][0], -prices[i]),
        Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i] ) 
      ]
    }
    return dp[length - 1][1]
  }
  maxProfit([7,1,5,3,6,4])
  return (
    <div className="w-full h-full">
      <CodeMirrorCom value={value} getVal={getVal}></CodeMirrorCom>
    </div>
  )
}
export default Maxprofit
