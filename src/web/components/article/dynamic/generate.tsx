/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-10-27 16:16:41
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-10-27 18:10:40
 */
import React, { useState, FC, useEffect } from 'react'
import CodeMirrorCom from '@components/codemirror/index'
interface Props {
  getValFun: (val: string) => void
}

const Generate: FC<Props> = (props: Props): JSX.Element => {
  const generate = (numRows: number) => {
    let resA: any[] = []
    for (let i = 0; i < numRows; i++) {
      const row = new Array(i + 1).fill(1)
      for (let j = 1; j < row.length - 1 ; j++) { 
        row[j] = resA[i - 1][j - 1] + resA[i -1][j]
      }
      resA.push(row)
    }
    console.log(resA)
    return resA
  }
  const [value, setValue] = useState(generate.toString())
  const getVal = (val: string) => {
    props.getValFun(val)
  }
  useEffect(() => {
    generate(3)
  }, [])
  return (
    <div className="w-full h-full">
      <CodeMirrorCom value={value} getVal={getVal}></CodeMirrorCom>
    </div>
  )
}
export default Generate
