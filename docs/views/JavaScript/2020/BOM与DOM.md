---
title: BOM对象与DOM对象
date: 2020-06-22
sidebar: auto
tags:
  - BOM
  - DOM
categories:
  - JavaScript
---

# BOM 与 DOM

- `BOM(browser object model)`：浏览器对象模型，提供属性与方法操作浏览器
- `DOM(document object model)`：文档对象模型，提供属性与方法操作页面元素

![dom和bom的联系](/images/dom和bom的联系.png)

- 由于 `BOM` 的 `window` 包含了 `document`，因此可以直接使用 `window` 对象的 `document` 属性，通过 `document` 属性就可以访问、检索、修改 `XHTML` 文档内容与结构。
- 因为 `document` 对象又是 `DOM（Document Object Model）`模型的根节点。

- 可以说，`BOM`包含了`DOM`(对象)，浏览器提供出来给予访问的是`BOM`对象，从`BOM`对象再访问到`DOM`对象，从而`js`可以操作浏览器以及浏览器读取到的文档。

## BOM API

- 对话框
  - `window.alert()`
  - `window.confirm()`
  - `window.prompt()`
- 窗口对象
  - `window.open()`打开窗口
    - 参数 1：地址（内部地址或外部地址）
    - 参数 2：打开方式：`self`当前页面打开，`blank`新建页面打开
  - `window.close()`关闭窗口
  - `window.location`浏览器地址
  - `window.navigator`获取客户端信息
  - `window.history`历史管理记录
    - 后退：`history.back().history.go(-1)`
    - 前进：`history.forward().history.go(1)`

## DOM API

![DOMAPI](/images/DOMAPI.png)

### 事件

- 绑定事件

  1. `对象.on+"事件名字"=事件处理函数`
  2. `对象.addEventListener("事件名字",命名函数,false)`
  3. `对象.revemoEventListener("事件名字",命名函数的名字,false)`
  4. `对象.attachEvent("事件名字",命名函数)`
  5. `对象.detachEvent("事件名字",命名函数的名字)`

- 事件阶段

  - 捕获阶段：某元素触发事件->顶层对象触发事件流->到达目标元素(下一阶段)（事件函数没触发）
  - 目标阶段：到达目标元素，执行绑定监听函数（下阶段）
  - 冒泡阶段：从目标函数冒泡->到达顶层函数(途中节点若绑定对应的监听事件，触发该节点对应的监听事件。)

- 事件代理
  - 在 `js` 中添加到页面上的事件处理程序数量关系到页面整体运行性能，每对 `dom` 节点进行交互，浏览器就进行重绘或重排。因此进行事件委托，仅需对父级对象进行操作，极大减少操作 `dom` 节点的频率，从而提高性能。
  - 通过事件冒泡来实现。从最深节点开始逐级向上传播事件。
  - `target` 指向触发事件的监听对象
  - `currentarget` 指向添加事件的监听对象

### offset（元素定位）

- 正常文档流
  - `offset`系列获取的值都是数字类型
  - `offsetLeft`：元素相对左边的横坐标
  - `offsetTop`：元素相对上面的纵坐标
  - `offsetWidth`（`offsetHeight`）获取的元素本身的宽（高）+元素边框的宽（高）
- 脱离文档流
  - 父级元素脱离文档流，子级元素此时的`offsetLeft`获取的是相对父级元素的`padding`+自己的`margin`
  - 元素自己脱离文档流，此时的`offsetLeft`获取的事自己的`left`+自己的`margin`

### scroll（滚动条）

- `scrollLeft`：向左卷曲出去的横坐标
- `scrollTop`：向上卷曲出去的纵坐标
- `scrollWidth`：内容实际的宽度，没有内容就是元素的宽度，没有边框
- `scrollHeight`：内容实际的高度，没有内容就是元素的高度，没有边框

- scroll 滚动到指定位置
  - window.scrollTo(x-coord,y-coord)
  - window.scrollTo(options)
    - options
      - top 等同于 y-coord
      - left 等同于 x-coord
      - behavior 类型 String,表示滚动行为
        - smooth(平滑滚动)
        - instant(瞬间滚动)
        - 默认值 auto,实测效果等同于 instant

* scroll 滚动到相对位置
  - window.scrollBy(x-coord, y-coord);
  - window.scrollBy(options)

### client（视口）

- `clientX`：可视区域的横坐标
- `clientY`：可视区域的纵坐标
- `clientWidth`：可视区域的宽
- `clientHeight`：可视区域的高

### 隐藏元素

- `display:none` 不占位
- `visibility:hidden` 占位
- `opacity:0` 占位
- `height(width):0` 占位

### 获取子节点

- `node.childNodes`
- `node.children`
- `node.parentNode`
- `node.parentElement`
- `node.firstChild`
- `node.firsetElementChild`
- `node.lastChild`
- `node.lastElementChild`
- `node.previousElementSibling`
- `node.nextSibling`
- `node.nextElememtSibling`

### 创建元素的三种方法

- document.write
- nodeObj.innerHTML = '标签代码及内容'
- document.createElement

### 自定义属性

- nodeObj.getAttribute('属性名称')
- nodeObj.setAttribute('属性名称','值')
- removeAttribute、getAttribute、setAttribute 还可以操作元素的自带属性

### 表单校验的古往今来

- 数据库校验时代：仅在入库阶段来校验数据
- 提交校验时代
  - 服务器端校验
  - 客户端校验
- 快速校验
  - 失焦校验
  - 输入校验

## 参考资料

- [DOM 和 BOM](https://segmentfault.com/a/1190000016264329#item-1-1)

- [最全的 DOM 和 BOM 的解释分析](https://juejin.im/post/5d7677b06fb9a06afd662d20#heading-1)

- [表单校验](https://zhuanlan.zhihu.com/p/28323080)
