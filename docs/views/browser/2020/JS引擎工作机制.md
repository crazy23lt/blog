---
title: JS异步机制
date: 2020-06-22
sidebar: auto
tags:
  - V8引擎
categories:
  - 浏览器
---

# JS 引擎的异步机制

- `JavaScript` 引擎是**单线程运行的**,浏览器无论在什么时候都只且**只有一个线程在运行** `JavaScript` 程序。
- 浏览器的**内核是多线程的**，它们在内核控制下相互配合以**保持同步**。

  - 一个浏览器至少实现**三个常驻线程**：`JavaScript` 引擎线程，`GUI` 渲染线程，浏览器事件触发线程。
    - `JavaScript` 引擎是基于**事件驱动单线程执行**的，`JavaScript` 引擎一直等待着**任务队列**中任务的到来，然后加以处理，浏览器**无论什么时候**都只有一个 `JavaScript` 线程在运行 `JavaScript` 程序。
    - `GUI` 渲染线程负责**渲染浏览器界面**，当界面发生重绘`（Repaint）`或回流`(Reflow)`时,该线程就会执行。但需要注意，`GUI` 渲染线程与 `JavaScript` 引擎是**互斥**的，当 `JavaScript` 引擎执行时 `GUI` 线程会被挂起，`GUI` 更新会被保存在一个队列中等到 `JavaScript` 引擎空闲时立即被执行。
    - 事件触发线程，当一个事件被触发时该线程会把事件添加到**待处理队列的队尾**，等待 `JavaScript` 引擎的处理。这些事件可来自 `JavaScript` 引擎当前执行的代码块如 `setTimeout`、也可来自浏览器内核的其他线程如鼠标点击、`Ajax` 异步请求等，但由于 `JavaScript` 的单线程关系所有这些事件都得排队等待 `JavaScript` 引擎处理（**当线程中没有执行任何同步代码的前提下才会执行异步代码**）。

## JS 引擎为啥是单线程？

- 作为浏览器脚本语言，`JavaScript` 的主要用途是**与用户互动**，以及**操作 `DOM`**。
- 这决定了它只能是**单线程**，否则会带来很复杂的**同步问题**。

## 宏任务(task)、微任务()、Event-Loop

![Event-Loop](/images/Event-loop.png)

- JS 主线程执行栈(执行空间，无论宏任务还是微任务都在执行栈中执行)
  - 宏任务
- 回调队列（先进先出）
  - 微任务（宏任务的回调函数）
- 宏任务按顺序执行，且浏览器在每个宏任务之间渲染页面
- 所有微任务也按顺序执行，且在以下场景会立即执行所有微任务
  - 每个回调之后且 js 执行栈中为空。
  - 每个宏任务结束后。
- Event-Loop
  - 便是一个宏任务的结束与另一个宏任务的开始

## JS 引擎能实现多线程码？

- `Web Worker` 的作用，就是为 `JavaScript` 创造多线程环境，允许主线程创建 `Worker` 线程。

### Web Worker

- **同源限制**
  - 分配给 `Worker` 线程运行的脚本文件，必须与主线程的脚本文件同源。
- **DOM 限制**
  - `Worker` 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 `DOM` 对象，也无法使用 `document、window、parent` 这些对象。
  - 但是，`Worker` 线程可以 `navigator` 对象和 `location` 对象。
- **通信联系**
  - `Worker` 线程和主线程不在同一个上下文环境，它们不能直接通信，必须通过消息完成。
- **脚本限制**
  - `Worker` 线程不能执行 `alert()`方法和 `confirm()`方法，但可以使用 `XMLHttpRequest` 对象发出 `AJAX` 请求。
- **文件限制**
  - `Worker` 线程无法读取本地文件，即不能打开本机的文件系统`（file://）`，它所加载的脚本，必须来自网络。

#### 基本用法

- 主线程采用`new`命令，调用 W`orker()`构造函数，新建一个 `Worker` 线程。
  - `const worker = new Worker('work.js');`

## 参考链接

- [Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)

- [译文：JS 事件循环机制（event loop）之宏任务、微任务](https://segmentfault.com/a/1190000014940904)

- [微任务、宏任务与 Event-Loop](https://juejin.im/post/5b73d7a6518825610072b42b#heading-6)

- [JavaScript 异步机制](https://www.cnblogs.com/zhaodongyu/p/3922961.html)
