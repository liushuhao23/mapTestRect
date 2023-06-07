/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-10-23 22:52:58
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-10-25 15:19:57
 */
import React, { useState, FC, useEffect } from 'react';
import CodeMirrorCom from '@components/codemirror/index';
import { resolve } from 'node:path/win32';
interface Props {
  getValFun: (val: string) => void;
}

const Concurrency: FC<Props> = (props: Props): JSX.Element => {
  const [value, setValue] = useState('');
  let index = 0;
  let count = '';
  const getVal = (val: string) => {
    props.getValFun(val);
  };

  let res = [];
  const arr = Array(15).fill('');

  //   需求描述：
  // 浏览器限制每次最多发出10个请求接口，
  // 总共有1000个待请求接口，每个接口的响应时间是随机的，要保证在某个接口请求成功之后立即请求下一个接口，
  // 保证当前并发度始终为10。
  function getData(deplay: number): Promise<number> {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(deplay, 'v');
        index++;
        resolve(index);
      }, deplay);
    });
  }

  function getDataOne(): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        count += '🇫🇯';
        resolve(count);
      }, 1000);
    });
  }

  function test1() {
    let max_number = 10;
    let index = 0;

    let PromiseArr = [];
    let now_number = new Proxy(
      {
        _now_number: 0,
      },
      {
        get: function (target: any, propKey) {
          if (propKey in target) {
            return target[propKey];
          }
        },

        set: function (obj, prop, value) {
          obj[prop] = value;
          if (prop === '_now_number') {
            if (value === max_number) {
              setTimeout(() => {
                now_number._now_number = 0;
                run();
              }, 3000);
            }
          }
          return true;
        },
      }
    );

    function successRunCallBack(res: any) {
      console.log(res, 'res');
      index++;
      console.log(now_number._now_number, 'now_number._now_number');
      if (now_number._now_number === max_number) {
        console.log('一次对列已完成, 正在继续进行下次队列');
      } else if (now_number._now_number < max_number) {
        now_number._now_number++;
        run();
      }
    }

    function errRunCallBack(error: unknown) {}

    function run(fn?: () => Promise<any>) {
      if (index === arr.length) {
        console.log('队列已经全部执行完成');
        return false;
      }
      return getData(index === 0 ? 1 + 1000 : index * 10 + 1000).then(res =>
        successRunCallBack(res)
      );
    }

    function start() {
      run();
    }
    start();
  }

  function test2() {
    // JS实现一个带并发限制的异步调度器Scheduler，
    // 保证同时运行的任务最多有两个。
    // 完善代码中Scheduler类，使得以下程序能正确输出
    class Scheduler {
      public cache: any[];
      public task: any[];
      public _max: number;
      constructor() {
        this.cache = []; // 缓存任务数据
        this.task = []; // 当前执行任务队列
        this._max = 2; // 最大并发任务
      }
      add(promiseCreator: any) {
        return new Promise(resolve => {
          // console.log(resolve, 'resolve')
          promiseCreator.resolve = resolve;
          if (this.task.length < this._max) {
            this.runWork(promiseCreator);
          } else {
            this.cache.push(promiseCreator);
          }
        });
      }
      runWork(promiseCreator: any) {
        this.task.push(promiseCreator);
        promiseCreator().then(() => {
          promiseCreator.resolve()
          // console.log(this.task, 'ccc')
          // console.log(this.cache, 'cache')
          this.task.splice(this.task.indexOf(promiseCreator, 1))
          if (this.cache.length) {
            this.runWork(this.cache.shift())
          }
        });
      }
    }
    const timeout = (time: number) => new Promise(resolve => {
      setTimeout(resolve, time)
    })
    const scheduler = new Scheduler()
    const addTask = (time: number, order: any) => {
      const result = scheduler.add(() => timeout(time))
      result.then(() => console.log(order + 'order'))
    }
    
    // addTask(5000, '1')
    // addTask(2000, '2')
    // addTask(0, '3')
    // addTask(1500, '4')// output: 2 3 1 4

    // addTask(1000, '1')
    // addTask(500, '2')
    // addTask(300, '3')
    // addTask(400, '4')// output: 2 3 1 4
    // 一开始，1、2两个任务进入队列
    // 500ms时，2完成，输出2，任务3进队
    // 800ms时，3完成，输出3，任务4进队
    // 1000ms时，1完成，输出1
    // 1200ms时，4完成，输出4
  }
  //   function test() {
  //     /**
  //      * @description  发起请求任务
  //      * @param {Numner} idx promiseArr 数组下标位置
  //      * @param {Object} req 当前发起请求的任务信息
  //      * @param {Number} delay 定时器延迟时间（模拟接口响应时间）
  //      * @returns 请求任务的 promise 对象
  //      */
  //     const createRequest = (idx: any, req: any, delay = 1000) => {
  //         createdTaskCount++; // 创建成功次数+1
  //         console.log(`下标${idx}的位置正在创建id为${req.id}个任务, 当前请求成功个数为：${finishedTaskCount}`)
  //         const result = new Promise(resolve => {
  //             setTimeout(() => {
  //                 resolve(req.id);
  //             }, delay)
  //         })
  //         return result;
  //     };
  //     /**
  //      *
  //      * @param {Number} idx promiseArr数组下标位置
  //      * @param {Object} req 当前请求成功的任务信息
  //      * @returns req.id
  //      */
  //     const finishedCallback = (idx: any, req: any) => { //请求成功之后的回调
  //         finishedTaskCount++; // 请求成功次数+1
  //         if (createdTaskCount == MAXCOUNT) {
  //             console.log('并发请求已经全部发起');
  //             return Promise.resolve(req.id);
  //         }
  //         return run(idx);
  //     }
  //     /**
  //      * @description 绑定 接口 跟 回调方法
  //      * @param {Number} idx promiseArr数组下标位置
  //      */
  //     const run: any = (idx: any) => {
  //         const req = taskQueue.splice(0, 1)[0]; // 下一个要发起的请求信息
  //         return createRequest(idx, req, idx * Math.random() * 1000).then(() => finishedCallback(idx, req))
  //     }

  //     const MAXCOUNT = 100, MAXLIMIT = 10;
  //     let taskQueue: any = [], promiseArr = [], createdTaskCount = 0, finishedTaskCount = 0;
  //     for (let i = 1; i <= MAXCOUNT; i++) { // 生成任务队列
  //         taskQueue.push({ id: i, url: `url${i}` });
  //     }
  //     for (let i = 0; i < MAXLIMIT; i++) { // 生成任务 promise 数组
  //         promiseArr.push(run(i));
  //     }
  //     Promise.all(promiseArr).then(res => {
  //         console.log("接口全部请求成功", res)
  //     })
  // }
  useEffect(() => {
    // test()
    // test1()
    // test2();
    setValue(() => {
      return test2.toString()
    })
  }, []);
  // test().start
  return (
    <div className="w-full h-full">
      <CodeMirrorCom value={value} getVal={getVal}></CodeMirrorCom>
    </div>
  );
};
export default Concurrency;
