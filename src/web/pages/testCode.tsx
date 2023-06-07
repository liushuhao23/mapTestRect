/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-09-20 14:21:03
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-09-23 15:40:58
 */
import React, { useState, FC } from 'react'
import CodeMirrorCom from '@components/codemirror/index'
const TestCode: FC = () => {
  const [value, setValue] = useState('')
    return (
      <div className='w-full h-full'>
        <CodeMirrorCom value={value}></CodeMirrorCom>
      </div>
    )
}
export default TestCode