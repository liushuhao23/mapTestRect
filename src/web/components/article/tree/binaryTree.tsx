/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-10-17 14:39:00
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-10-17 14:48:27
 */
import React, { useState, FC } from 'react'
import CodeMirrorCom from '@components/codemirror/index'
interface Props {
  getValFun: (val: string) => void
}

const Binarytree: FC<Props> = (props: Props): JSX.Element => {
  const [value, setValue] = useState('')
  const getVal = (val: string) => {
    props.getValFun(val)
  }
  return (
    <div className="w-full h-full">
      <CodeMirrorCom value={value} getVal={getVal}></CodeMirrorCom>
    </div>
  )
}
export default Binarytree
