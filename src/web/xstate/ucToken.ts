/*
 * @Description: description
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2023-06-12 22:06:29
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-12 22:34:02
 */
import { createMachine, send, assign, interpret } from 'xstate';

const states = {
    wait: {
        on: {
            UPDATETOKEN: {
                target: 'update'
            }
        }
    },
    update: {},
    updateSuccess: {},
    updateError: {},
    logout: {}
}

const actions = {
    update: (context: any, event: any) => {
        console.log('输出',  'update')
        console.log(context, 'context', event, 'event')
    },
    logout: (context: any, event: any) => {
        console.log('输出',  'logout')
        console.log(context, 'context', event, 'event')
    }
}
const createUcTokenMachine = (token: string) => {
    return createMachine({
        id: 'ucToken',
        initial: 'wait',
        context: {
            token
        },
        states
    }, {
        actions
    })
}