import React, { useState, FC } from 'react'
import CodeMirrorCom from '@components/codemirror/index'
interface Props {
  getValFun: (val: string) => void
}

const Findlength: FC<Props> = (props: Props): JSX.Element => {
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
export default Findlength
