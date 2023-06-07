/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-12-04 22:47:19
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-12-04 22:53:31
 */
import React, { useState, FC } from 'react'
const Index: FC<{counter: number }> = (props) => {
    return (
        <span>{props.counter}</span>
      )
}
export default Index