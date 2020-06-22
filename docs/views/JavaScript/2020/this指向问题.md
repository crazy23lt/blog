---
title: this指向
date: 2020-06-22
sidebar: auto
tags:
  - this指向
categories:
  - JavaScript
---

## 执行上下文与作用域

- 作用域:**数声明的时候就确定的一套变量访问规则**
- 执行上下文:**函数执行时才产生的一系列变量的环境**
- 函数执行过程
  - 执行上下文阶段
    - 生成变量
    - 生成作用域链
    - 确定 `this` 指向
  - 函数执行阶段
    - 逐行执行代码

## 顶层对象与全局对象

- 全局对象：在整个文件都是其作用域的范围
- 顶层对象：在浏览器环境指的是 window 对象，在 Node 指的是 global 对象

- ES5：顶层对象的属性与全局变量是等价的。
- ES6：let 、const 和 class 声明的对象只是全局对象,var 和 function 声明的对象仍旧是顶层对象的属性

### ES5 不同环境中的顶层对象

- 浏览器里面，顶层对象是 window，但 Node 和 Web Worker 没有 window。
- 浏览器和 Web Worker 里面，self 也指向顶层对象，但是 Node 没有 self。
- Node 里面，顶层对象是 global，但其他环境都不支持。

## this 指向

- 全局上下文 `this` 指向 `window`（非严格模式和严格模式）

- 函数上下文中

  - 普通函数调用：
    - 严格模式 `this` 绑定到 `undefined`
    - 非严格模式 `this` 绑定到全局对象（`window`）
  - 对象上的函数调用：`this` 绑定到该对象上
  - `call`、`apply`(或 `bind`)：
    - 严格模式 `this` 绑定到第一个参数
    - 非严格模式下
      - 第一个参数时 `null` 或 `undefined` 则 `this` 绑定到全局对象 `window` 上
      - 其他情况，`this` 绑定到第一个参数被 `new Object()`包装的对象上
  - new 调用：绑定到新创建对象上
  - ES6 箭头函数：根据当前函数执行上下文
  - DOM 事件函数：绑定到 `DOM` 事件元素上，也有可能绑定到全局对象上(IE6~IE8 的 `attachEvent`)

- this 五种绑定方式
  - 默认绑定 this 指向全局对象
  - 隐式绑定(函数引用有上下文对象)
  - 显示绑定(call、apply)
  - new 绑定
  - 箭头函数(this 指向函数定义时的上下文)

### call 与 apply

- `Function.prototype.call(thisArg, arg1, arg2, ...)`
  - `thisArg`:可选值，`function` 运行时指定的 `this` 值
    - 非严格模式与严格模式：见上述函数上下文中的 `call、apply` 中的 `this` 指向
- `Function.prototype.apply(thisArg, [argsArray])`
  - `thisArg`:可选值，`function` 运行时指定的 `this` 值
    - 非严格模式与严格模式：见上述函数上下文中的 `call、apply` 中的 `this` 指向

### 闭包

## 参考资料

- [JS 基础篇之作用域、执行上下文、this、闭包](https://juejin.im/post/5cf8612df265da1bcb4f1bf8)

- [从这两套题，重新认识 JS 的 this、作用域、闭包、对象](https://segmentfault.com/a/1190000010981003)

- [一道常被人轻视的前端 JS 面试题](https://www.cnblogs.com/xxcanghai/p/5189353.html)

- [面试官问：JS 的 this 指向](https://juejin.im/post/5c0c87b35188252e8966c78a#heading-14)

- [javaScript 中全局对象与顶层对象的区别与联系](https://blog.csdn.net/qq_22149613/article/details/104895415)
