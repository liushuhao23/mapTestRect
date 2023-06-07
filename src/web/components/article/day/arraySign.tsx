/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-10-27 15:13:07
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-10-27 15:25:20
 */
import React, { useState, FC, useEffect } from 'react'
import CodeMirrorCom from '@components/codemirror/index'
interface Props {
  getValFun: (val: string) => void
}

const Arraysign: FC<Props> = (props: Props): JSX.Element => {
  const [value, setValue] = useState('')
  const getVal = (val: string) => {
    props.getValFun(val)
  }
  const nums =
  [1,28,-91,-62,-36,-1,-84,-90,-92,61,6,-58,-60,2,51,-15,-18,-81,87,84,100,-84,-13,-87,-33,72,-72,-59,-79,28,-69,-97,-93,17,67]
  const arraySign = function(nums: number[]) {
    let sign = 1
    for (const item of nums) {
      if (item === 0) sign = 0
      if (item < 0) sign =  -sign
    }
    return sign
  };
  useEffect(() =>{
    console.log(arraySign(nums))
  }, [])
  return (
    <div className="w-full h-full">
      <CodeMirrorCom value={value} getVal={getVal}></CodeMirrorCom>
    </div>
  )
}
export default Arraysign
