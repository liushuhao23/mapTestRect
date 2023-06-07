/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-09-26 09:17:15
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-07 13:46:43
 */
import { Button } from 'antd'
import React,  { useState, FC, memo } from 'react'
const SubmitCom: FC = () => {
    const submit = () => {
        console.log(submit)
    }
    return (
        <>
            <Button type="primary" onClick={submit}>执行</Button>
        </>
    )
}
export default memo(SubmitCom)