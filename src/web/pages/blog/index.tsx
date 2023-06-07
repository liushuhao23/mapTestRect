/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-09-24 20:25:18
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-11-01 14:53:39
 */

import React, { useState, FC, memo, useCallback } from 'react'
import fileList from '@components/article/index'
import { useMyLocation } from '@hooks/useLocationType'
import Desc from './desc'
import { Button, Typography } from 'antd';
interface Props {
    getValFun: (val: string) => void
}

const fileListArr: Record<string, {name: string, path: string}> = fileList
const Blog: FC = () => {
    const location = useMyLocation<{item: string}>()
    const [val, setValue] = useState('')
    const { state } = location
    const [open, setOpen] = useState(false)
    const [desc, setDesc] = useState('')
    const [ellipsis, setEllipsis] = useState(true)
    const { Paragraph } = Typography;
    const openTest = () => {
        setOpen(true)
    }
    const onClose = (e: any) => {
        setOpen(false)
    }
    const aCom = (componentName: string): React.FC<Props> => {
        const component = require(`@components/article/${fileListArr[componentName].path}`).default
        return component
    }  
    const ComItem = aCom(state.item)
    const getVal = useCallback((val: string) => {
        setValue(val)
    }, [])
    return (
        <>
        <div className='flex flex-col h-full '>
            <span>{fileListArr[state.item].name}</span>
            <Paragraph ellipsis={ellipsis ? { rows: 2, expandable: true, symbol: '更多' } : false}>
                {desc}
            </Paragraph>
            <ComItem getValFun={getVal}></ComItem>  
            <div className='flex justify-end'>
                <Button type="primary" onClick={openTest}>测试</Button>
            </div>
            <Desc desc={desc} open={open} resVal={val} onClose={onClose} ></Desc>
        </div>
        </>
    )
}
export default memo(Blog) 