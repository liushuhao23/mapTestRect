/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-10-31 16:33:05
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-01 09:22:13
 */
import React, { useState, FC, useEffect } from 'react';
import CodeMirrorCom from '@components/codemirror/index';
interface Props {
  getValFun: (val: string) => void;
}

const Treeconversionarr: FC<Props> = (props: Props): JSX.Element => {
  const [value, setValue] = useState('');
  const name = 'Treeconversionarr'
  const getVal = (val: string) => {
    props.getValFun(val);
  };
  let arr = [
    { id: 1, name: '部门1', pid: 0 },
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 4 },
  ];

  let conver = (arr: any) => {
    const getChildren = (data: any, result: any, pid: any) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].pid === pid) {
          const newData =  {
            ...data[i],
            children: []
          }
          result.push(newData)
          getChildren(data, newData.children, data[i].id)
        }
      }
    }
    const arrayToTree = (data: any, pid: any) => {
      const result: any = [];
      getChildren(data, result, pid)
      return result;
    }
    arrayToTree(arr, arr[0].pid)
  }

  const converTwo = function(arr: any) {
    let map = new Map()
    arr.forEach((item: any) => {
      !item.children && (item.children = [])
      map.set(item.id, item)
    });
    arr.forEach((item: any) => {
      if (map.get(item.pid)) {
        let target = map.get(item.pid)
        console.log(target, 'target')
        target.children.push(item)
      }
    });
    console.log(arr[0], 'xxxx')
  }

  useEffect(() => {
    conver(arr)
    converTwo(arr)
    // setValue(`const ${name} =  ${conver.toString()}`)
  }, [])

  return (
    <div className="w-full h-full">
      <CodeMirrorCom value={value} getVal={getVal}></CodeMirrorCom>
    </div>
  );
};
export default Treeconversionarr;
