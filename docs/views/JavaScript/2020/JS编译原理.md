---
title: JS编译原理
date: 2020-06-22
sidebar: auto
tags:
  - JS编译
categories:
  - JavaScript
---

## 一句话概括 JavaScript

- JS 是一门基于对象，面向原型、动态弱类型语言。不存在与编译阶段。
- 动态：声明变量不用确定类型，赋值自动确定类型。
- 弱类型：不类型数据之间进行运算，会自动转换类型（隐式转换）。

## 编译原理

- 第一阶段：分词/词法分析

  - 字符组成的字符串被分解为计算机能理解的代码块
  - 称为**词法单元**

- 第二阶段：解析/语法分析

  - 词法单元流被转换为由元素主机嵌套形成的`tree`
  - 称为**抽象语法树**

- 第三阶段：代码生成
  - 词法单元树被转换成一组组可执行代码
  - 称为**机器指令**

## 词法作用域

- 词法作用域
  - 词法分析阶段的作用域，声明变量等
  - 能通过`eval`和`with`来改变词法作用域
  - 上述关键字会导致引擎无法在编译时对作用域查找进行优化（避免使用）
- 类似动态作用域

  - 对象的 `this` 指向

  **JS 没有动态作用域，只有静态作用域**

  ```js
  /*静态作用域，变量定义的时候就确定了作用域*/
  function foo() {
    console.info(e);
  }
  function bar() {
    let e = "动态作用域";
    foo();
  }
  let e = "词法作用域(静态作用域)";
  bar();
  ```

## 作用域

- 引擎负责 `JS` 程序编译和执行
- 编译器负责语法分析、代码生成
- 作用域用来收集并维护所有变量访问规则

_引擎的词法分析根据作用域来声明变量。_

_一个变量声明，编译器首先进行`RHS`查找当前作用域是否存在将要赋值的值，然后才进行`LHS`查找当前作用域是否存在声明的变量。_

### 全局作用域

- 最外层函数和最外层函数外面定义的变量拥有全局作用域
- 所有未定义直接赋值的变量自动声明为拥有全局作用域
- 所有 `window` 对象的属性拥有全局作用域

_负面影响：污染全局命名空间（很多库源码都会使用`(function(){...})()`）。模块化（`ES6`、`commonjs` 等）的广泛使用也为防止污染全局命名空间提供了更好的解决方案。_

### 函数作用域

_函数作用域值指属于函数的全部变量都可以在整个函数范围内使用以及复用。_

_`if`、`switch`、`while`、`for`这些条件循环语句并不会创建新的作用域，能否访问到内部变量取决与声明方式`var`、`let`、`const`_

### 块级作用域

_内层变量覆盖外层变量_

```js
var tmp = new Date();
function f() {
  console.info(tmp);
  if (false) {
    var tmp = "hello world";
  }
}
f();
```

_执行函数后，变量提升，内层 `tmp` 变量覆盖外层 `tmp` 变量。_

_`let`、`const` 的出现改变了 `JS` 没有块级作用域的情况。_
_使得广泛应用的匿名立即执行函数表达式（匿名 `IIFE`）不在必要。_

```js
// IIFE写法
(function(){...})()
// 块级作用域写法
{let tmp = ...}
```

### 变量提升

_`var` 声明，编译器将变量提升到作用于顶部_
_`let`、`const` 声明，编译器将变量放入临时死区（`TDZ`）_
_访问 `TDZ` 中的变量会触发运行错误_

```js
typeof str; // Uncaught ReferenceError: str is not defined
const str = "CMCMC";
```

_函数声明类似`var`，会提升函数变量_

_块级作用域中声明函数_

- 允许块级作用域内声明函数
- 函数声明类似与`var`，将提升到全局作用与和函数作用域
- 函数声明还会提升到所有块级作用域的头部

**块级作用域中声明函数变量，使用函数表达式，避免使用函数声明语句**

## 闭包

_当前函数记住并访问所在词法作用域时，就产生了闭包。即函数在当前作用域之外执行_

- 循环和闭包结合

```javascript
// 每隔一秒输出+1
// 此处setTimeout 为异步任务，并不进入主线程执行，放入任务队列中等待主线程任务处理完成
// 才会执行异步任务，
// index 变量为全局作用域变量。所以在异步任务开始执行的时候index值等于5
// 避免此情况产生，异步任务需要有自己独立的作用域
// 解决办法1：使用ES6语法使用let声明变量index。从而产生块级作用域
// 解决办法2：使用匿名IIFE 产生函数作用域
for (var index = 0; index < 5; index++) {
  setTimeout(function timer() {
    console.info(index);
  }, index * 1000);
}
for (let index = 0; index < 5; index++) {
  setTimeout(function timer() {
    console.info(index);
  }, index * 1000);
}
for (var index = 0; index < 5; index++) {
  setTimeout(function() {
    console.info(index);
  }, 1000 * index);
}
```

- 标准闭包函数

```javascript
function apple() {
  var count = 0;
  function output() {
    console.info(count);
  }
  fruit(output);
}
function fruit(arg) {
  arg();
}
apple();
```

## 垃圾回收

_JS 拥有两种垃圾回收机制_

- 标记清除
  - 垃圾收集器，会给内存中所有变量加上标记（所有变量上标记）
  - 去掉环境中的变量以及被环境中的变量引用的变量的标记（使用的变量取消标记）
  - 销毁任然携带标记的变量
- 引用计数
  - 追踪记录每一个值被引用的次数
  - 引用类型数据被引用的次数（被引用+1，取消引用-1）
  - 清除引用值为 0 的引用类型数据
  - 循环引用导致引用的次数永远不为 0

## 参考资料

- [ES6 入门-let 和 const 命令](https://es6.ruanyifeng.com/#docs/let)

- [JavaScript 有预编译吗？](https://www.zhihu.com/question/29105940)

- [从 JS 编译原理到作用域(链)及闭包](https://juejin.im/post/5ca995626fb9a05e1a7aabd8#heading-0)
