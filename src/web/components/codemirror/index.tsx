/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-09-20 14:16:05
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-08 09:22:14
 */
import React, { useState, FC, useEffect, memo } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import './codeMirrorIinit';
import { themeArr } from '@web/resource/codeMirrorTheme';
import { Select } from 'antd';
import { Props } from '@web/type/codemirror';
import { UtilsTools } from '@web/asstes/utils/utilsTools'
import Article from '@web/api/article/index'
const { Option } = Select;

const CodeMirrorCom: FC<Props> = (props: Props) => {
  const [themeChanged, setThemeChanged] = useState('idea');
  const [codeValue, setCodeVaule] = useState('')
  const change = UtilsTools.debounce((data: any) => {
    props.getVal(data[2])
  }, 1000);
  const handleChange = (val: string) => {
    setThemeChanged(val);
  };
  useEffect(() => {
    setCodeVaule(props.value)
    // _id: { type: String, required: true },
    // user_name: { type: String, required: true },
    // password: { type: String, required: true },
    // id: { type: String, required: false },
    // createTime: { type: String, required: false },
    Article.getItem({user_name: 'liushuhao', password: '123456'})
  }, [props.value])

  return (
    <>
      <div className="flex justify-end items-center mb-5">
        <span className="mr-5">选择主题: </span>
        <Select defaultValue={themeChanged} style={{ width: 200 }} onChange={handleChange}>
          {themeArr.map(value => (
            <Option value={value} key={value}>
              {value}
            </Option>
          ))}
        </Select>
      </div>
      <CodeMirror
        className='h-[calc(100%_-_90px)]'
        value={codeValue}
        options={{
          mode: 'javascript',
          theme: themeChanged,
          lineNumbers: true,
          height: '500px',
          extraKeys: {
            //配置按键
            Alt: 'autocomplete', // 按下`alt`时出现代码提示
          },
          lineWrapping: true, // 自动换行
          styleActiveLine: true, // 选中行高亮
          matchBrackets: true, // 匹配括号
          gutters: ['CodeMirror-lint-markers'],
          lint: true,
          spellcheck: true, // 代码出错提醒
          indentUnit: 4,
        }}
        editorDidMount={(editor) => {
          editor.setSize('100%', '100%');
        }}
        onChange={change}
      />
    </>
  );
};
export default memo(CodeMirrorCom) ;
