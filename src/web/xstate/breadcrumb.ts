/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-09-26 10:14:10
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-09-27 16:03:04
 */
import { createMachine, send, assign, interpret } from 'xstate';
const breadcrumbMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QCMBOYCGEDGqCuAtsgHRYQDEAggCLUCSAKgKICyioADgPawCWALry4A7diAAeiAEwA2ACzFZMgIwB2ABwBOLarlSAzHIA0IAJ6Jl61cTmr9y-fs0BWbRs0BfDybSYc+IlIICgAxOgA5SgAZMW4+QRExSQRZBSU1LR09QxNzBH1dGzkVXVd1ApkABmcvH3QsXEISPA4IDH4wcjDImKQQOIEhUT7klQUZZ2UZHVVNF31nXOlKmWJNCZlp9SkpScrdWpBfBoCSACUwADN0WAALLojo2J5BxJHEMeIJqZm55wWlggXDZNMo1M51DJHNUrF5vCBhFwIHAxMd-E1iLxhAJnvEhkkLGDiJMpNkFqTKup-oDHM4bPp9sVnJVKc5-oc0Y1AmRca9hqBknpAZZKjYZJo7HJNFLlKTVBz6ujAi02h1eQl+RJEE4pMR9FS9rNKlIwQ5hc5rBKZAYGQZyta5Aq-Fzzlcbrd1fj3ghmdZjXZdFJKnJ9gVAVo1upthCJqplBblJ54ZzTsQADZcKBcPD8T1vAWIOO6-UTTQ7SaymSqQFB0XrZSVBbBi1yZmO5OKl3EYRgADuAAJYPx2mB+8o85rklY1hUpBK5HIrC5NMLZTZ1KzNpN1K2NE6Tk0JwSEJZheo4R4gA */
  createMachine({
    context: { activeArr: [] } as { activeArr: { name: string, path: string }[] },
    id: 'breadcrumb',
    initial: 'init',
    states: {
      init: {
        on: {
          ADD: {
            target: 'add'
          }
        }
      },
      add: {
        on: {
          ADDITEM: {
            actions: 'addItems',
          },
          UPDATE: {
            target: 'update',
          },
          FINAL: {
            target: 'logout',
          },
        },
      },
      update: {
        entry: 'entryUpdate',
        exit: 'exitUpdate',
        on: {
          FINAL: {
            target: 'logout',
          },
        },
      },
      Refresh: {
        on: {
          FINAL: {
            target: 'logout',
          },
        },
      },
      logout: {
        type: 'final',
      }
    },
  },
    {
      actions: {
        addItems: assign({
          activeArr: (context, event: any) => {
            console.log(context, event)
            return [...context.activeArr, { name: event.name, path: event.key }]
          }
        }),
        entryUpdate: (context, event) => {
          console.log('entryUpdate')
          // console.log(context, 'context')
          // console.log(event, 'event')
        },
        exitUpdate: (context, event) => {
          console.log('exitUpdate')
          // console.log(context, 'context')
          // console.log(event, 'event')
        }
      }
    }
  );
const breadCrumInstance = interpret(breadcrumbMachine);
breadCrumInstance.start();

export { breadCrumInstance, breadcrumbMachine }