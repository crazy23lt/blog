---
title: JS异步编程
date: 2020-06-22
sidebar: auto
tags:
  - 异步编程
categories:
  - JavaScript
---

## 异步编程解决方案

异步的意义：非阻塞 IO 操作，页面始终能响应用户的操作。

### Promise 的实现原理

- 避免出现层层嵌套的回调函数
- 拥有统一的接口，控制异步操作更容易
- Promise 拥有三种状态
  - pending（进行中）
  - fulfilled（已成功）
  - rejected（已失败）

#### Promise.prototype.then()

- Promise 构造函数的原对象上有 then 方法：Promise.prototype.then
- then 方法返回值：新的 Promise 实例（因此可以使用链式写法）
- then 接受两个参数
  - resolved 状态的回调函数
  - rejected 状态的回调函数

#### Promise.prototype.catch()

- 上述 then 方法的 rejected 状态的回调函数
  - .then(null, rejection)
  - Promise.prototype.catch()方法指定发生错误时的回调函数。

#### Promise.prototype.finally()

- finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作

#### Promise.all()

- `const p = Promise.all([p1, p2, p3]);`
- Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。
- Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

#### Promise.resolve(参数)

- 四种参数
  - Promise 实例，**返回该实例**
  - thenable 对象，**将这个对象转为 Promise 对象，然后就立即执行 thenable 对象的 then 方法。**
  - 其他情况以该值为成功状态返回一个 Promise 对象。

#### Promise.reject()

- Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为 rejected。

### async/await 的实现原理

async 是 Generator 函数的语法糖

### Generator 的实现原理

### 实现 Promise

- Promise 大致框架解构（三部分）

  - then 收集依赖
  - 异步触发 resolve
  - resolve 执行依赖

- Promise 三种状态值 （状态值改变）

  - Promise 本质是一个状态机，且状态只能为以下三种：
    - Pending（等待态）、Fulfilled（执行态）、Rejected（拒绝态）
    - 只能从 Pending -> Fulfilled 或 Pending -> Rejected，
    - 状态的变更是单向的,状态变更不可逆

- Promise then 链式调用
  - then 方法接收两个可选参数，分别对应状态改变时触发的回调。
  - then 方法返回一个 promise。
  - then 方法可以被同一个 promise 调用多次。

## 参考资料

- [ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/promise)

- [9k 字 | Promise/async/Generator 实现原理解析](https://juejin.im/post/5e3b9ae26fb9a07ca714a5cc#heading-2)
