/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-10-23 20:02:45
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-03 11:37:53
 */
import React, { useState, FC, useEffect } from 'react'
import CodeMirrorCom from '@components/codemirror/index'
interface Props {
  getValFun: (val: string) => void
}

const Mergealternately: FC<Props> = (props: Props): JSX.Element => {
  const [value, setValue] = useState('')
  const getVal = (val: string) => {
    props.getValFun(val)
  }
  function MergealternatelyFun(word1: string, word2: string) {
    if (!word1 && !word2) return ''
    let res = ''
    let p = 0 
    let q = 0
    let length1 = word1.length
    let length2 = word2.length
    while(p + q < length1 + length2) {
      if (p < length1) {
        res += word1[p]
      p++

      }
      if (q < length2) {
        res +=word2[q]
      q++
      }
    }
    return res
  };
  // MergealternatelyFun('abcd', 'pq')

  useEffect(() => {
    // console.log(MergealternatelyFun.toString(), 'MergealternatelyFun.toString()')
  }, [])
  return (
    <div className="w-full h-full">
       <CodeMirrorCom value={value} getVal={getVal}></CodeMirrorCom>
    </div>
  )
}
export default Mergealternately
