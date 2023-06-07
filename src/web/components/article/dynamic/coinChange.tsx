/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-11-01 14:54:29
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-01 18:14:13
 */
import React, { useState, FC, useEffect } from 'react'
import CodeMirrorCom from '@components/codemirror/index'
interface Props {
  getValFun: (val: string) => void
}

const Coinchange: FC<Props> = (props: Props): JSX.Element => {
  const [value, setValue] = useState('')
  const getVal = (val: string) => {
    props.getValFun(val)
  }

  const name = 'Coinchange'

  const Coinchange = (coins: number[], amount: number) => {
    let length = coins.length
    let dp = Array(amount + 1).fill(Infinity)
    dp[0] = 0
    for (let i = 0; i < length; i++) {
      for (let j = coins[i]; j <= amount; j++) {
        dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1)
        console.log(j, 'j', dp)
      }
    }
    return dp[amount] === Infinity ? -1 : dp[amount]
  }
  useEffect(() => {
    Coinchange([2,1,5], 5)
    setValue(`const ${name} = ${Coinchange.toString()}`)
  }, [])
  return (
    <div className="w-full h-full">
      <CodeMirrorCom value={value} getVal={getVal}></CodeMirrorCom>
    </div>
  )
}
export default Coinchange
