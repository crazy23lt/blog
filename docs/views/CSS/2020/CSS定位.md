---
title: CSS---定位
date: 2020-06-22
sidebar: auto
tags:
  - CSS定位
categories:
  - CSS
---

## Web 元素细节布局

### 标准文档流

![标准文档流](/images/标准文档流.png)

- `HTML` 文档分为两大类
  - 行内元素：`DOM` 树中的一个节点，不占据单独空间。依附于块级元素，行内元素没有自己的区域。
  - 块级元素：`DOM` 树中的一个节点，与同级兄弟块竖直排列，自动横向伸展。
- 元素在标准流中的定位原则
  - 行内元素水平间的 `margin`
    - 相邻边 `margin` 叠加
  - 块级元素竖直间的 `margin`
    - 相邻边取 `margin` 最大值
  - 嵌套元素之间的 `margin`
    - 子元素的 `margin` 以父元素的 `content` 为参考
  - `margin` 设为负值
    - 负数的块向相反的方向移动。
- `margin` 叠加问题
  - 元素 `height:0`，元素自身 `margin-top`、`margin-button` 叠加。
  - 相邻元素情况下，前一个元素的 `margin-button` 于后一个元素 `margin-top` 发生叠加。
  - 嵌套元素情况下，父元素的 `margin-top(margin-button)`与首(最后一)个子元素 `margin-top(margin-button)`发生叠加
- 消除`margin`叠加
  - 浮动元素不与子元素或兄弟元素发生叠加
  - 创建 BFC 的元素不会与子元素发生 margin 叠加
  - 绝对定位元素不会与其他元素或子元素发生 margin 叠加
  -

---

![元素布局模式](/images/元素布局模式.png)

- position
- Float
- BFC
- Flex
- Grid
- 栅格系统

### Position 定位系统

![position定位](/images/Position定位.png)

- `static`（静态定位）
  - 遵循标准文档流，`top、button、left、right`失效。
- `relative` （相对定位）
  - 遵循标准文档流，依赖`top、button、left、right`属性相对自己进行偏移，同时通过 `z-index` 定位层叠关系。
  - 相对自身进行偏移但是不改变元素原始在文档流中的占位（不对文档流中其他元素产生影响）
- `absolute` （绝对定位）
  - 脱离标准文档流，依赖`top、button、left、right`属性相对离自己最近非`static`定位的父级元素进行偏移，同时通过 `z-index` 定位层叠关系。
  - **进行 `absolute` 定位时，元素 `top、button、left、right` 这些属性默认初始值为 auto**
  - **猜想：一个元素上述属性的初始值是以其相对 Root 元素来计算的。**
    - **所以造成元素进行绝对定位，元素的上述值任然以相对定位的值出现。**
- `fixed` （固定定位）
  - 脱离标准文档流，依赖`top、button、left、right`属性相对浏览器窗口进行偏移，同时通过 `z-index` 定位层叠关系。
- `sticky`（粘性定位）
  - 相对定位 `relative` 和固定定位 `fixed` 的结合
- `inherit`（继承）

### Float 浮动

- 浮动的框可以向左或向右移动，直到它的外边缘碰到包含框或另一个浮动框的边框为止。
- 由于浮动框不在文档的普通流中，相当于不占用空间。
- `float` 属性

  - `left`：元素向左浮动
  - `right`：元素向右浮动
  - `none`：默认值，元素不浮动
  - `inherit`：元素继承父元素 `float` 计算属性

- 浮动带来的影响
  - 普通流内的元素使用浮动，可能造成元素覆盖问题，
  - 普通流中多个元素浮动，还有可能造成排序问题（元素 height 不同一），
  - 同时浮动元素对外部元素会造成影响（高度塌陷等）

#### 清除浮动（解决高度塌陷问题）

- 使用 `clear` 的空 `div` 标签
  - 恢复父元素本身高度
- 使用`::after` 伪元素
- 使用邻接元素清除
- 使用 `overflow` 属性
- 将容器设置成 `float`
- 使用 `display：table`
- 触发 `hasLayout` 清除

```html
<style>
  html,
  body {
    height: 100vh;
    background-color: black;
  }
  .container {
    width: 50%;
    height: 100%;
    margin: 0 auto;
  }
  section {
    /* height: 13%; */
    width: 100%;
    border: blanchedalmond solid 1px;
  }
  section:not(.last) {
    margin-bottom: 5px;
  }
  .floatLeft {
    float: left;
    height: 105px;
    width: 100px;
    border: 1px red solid;
  }
  .floatRight {
    float: left;
    height: 50px;
    width: 100px;
    border: 1px yellow solid;
  }
  .clear {
    clear: both;
  }
  .clearfix::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
  }
  .clearfix {
    zoom: 1;
  }
  .contentClear {
    clear: both;
  }
  .overflow {
    overflow: hidden;
  }
  .left {
    float: left;
  }
  .table {
    display: table;
  }
  .haslayout-clear-float {
    zoom: 1;
  }
</style>
<body>
  <div class="container">
    <!-- clear类div标签清除浮动 -->
    <section>
      <div class="floatLeft"></div>
      <div class="floatRight"></div>
      <div class="clear"></div>
    </section>
    <!-- ::after伪元素清除浮动 -->
    <section class="clearfix">
      <div class="floatLeft"></div>
      <div class="floatRight"></div>
    </section>
    <!-- 邻接元素清除 -->
    <section>
      <div class="floatLeft"></div>
      <div class="floatRight"></div>
      <div class="contentClear"></div>
    </section>
    <!-- 使用overflow属性 -->
    <section class="overflow">
      <div class="floatLeft"></div>
      <div class="floatRight"></div>
      <div class="contentClear"></div>
    </section>
    <!-- 将容器设置成float -->
    <section class="left">
      <div class="floatLeft"></div>
      <div class="floatRight"></div>
    </section>
    <!-- display:table -->
    <section class="table">
      <div class="floatLeft"></div>
      <div class="floatRight"></div>
    </section>
    <!-- 触发 hasLayout 清除 -->
    <section class="last haslayout-clear-float">
      <div class="floatLeft"></div>
      <div class="floatRight"></div>
    </section>
  </div>
</body>
```

### BFC 块级格式上下文

- `Block Formatting Contents`（块级格式上下文）
- `bfc` 特性元素可以看作是隔离的独立容器，容器里面的元素不会在布局上影响带外面的元素
- `bfc` 具有普通容器没有的一些特性。

- 触发 `bfc`

  - `body` 根元素
  - 浮动元素：`float` 除 `none` 外的值
  - 绝对定位元素：`position(absolute、fixed)`
  - `display` 为 `inline-block、table-cells、flex`
  - `overflow` 除了 `visible` 以外的值`（hidden、auto、scroll）`

- bfc 特性及应用

  - 同一个 bfc 下边距会发生折叠
  - bfc 可以包含浮动元素(清除浮动)
  - bfc 阻止元素被浮动元素覆盖

#### BFC 遇到的问题

- body 默认是一个 BFC 盒子，但是首个子元素的 maring-top 会与父元素（body）的 margin-top 重叠
- 理论上 BFC 盒子的子元素不会与父元素发生重叠
- 解决办法
  - 给 body 和 html 同时加上 overflow:hidden，成功触发 BFC 创建
  - 给 body 加上 display:table、display:inline-block、position:absolute，成功触发 BFC 创建。

### Flex 弹性布局

- 容器属性
  - 主轴方向 `flex-direction`
  - 轴线上项目换行 `flex-wrap`
  - 轴线上项目对齐方式 `justify-content`
  - 交叉轴上项目对齐方式 `align-items`
  - 多根轴线对齐方式 `align-content`
- 项目属性
  - 项目排列顺序 `order`
  - 项目方法比例 `flex-grow`
  - 项目缩小比例 `flex-shrink`
  - 当个项目对齐方式 `align-self`
  - 分配多余空间 `flex-basis`

```html
<style>
  * {
    padding: 0;
    margin: 0;
  }
  html,
  body {
    overflow: hidden;
  }
  body {
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.897);
  }
  .container {
    width: 50vw;
    height: 50vw;
    border: rgb(185, 185, 185) 4px solid;
    background-color: rgb(241, 241, 241);
    margin: 50vh auto;
    border-radius: 2vw;
    transform: translateY(-50%);
    overflow: hidden;
  }
  .warper {
    margin: 50% auto;
    transform: translateY(-50%);
    background-color: rgb(255, 255, 255);
    border-radius: 4vw;
    box-shadow: 0 50px 70px rgb(185, 185, 185);
    width: 48vw;
    height: 48vw;
  }
  ul {
    display: flex;
    height: 33%;
    list-style: none;
    flex-wrap: wrap;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 30px;
    align-content: center;
  }
  ul:nth-child(2) {
    justify-content: center;
  }
  li::before {
    content: "";
    display: inline-block;
    position: absolute;
    width: 10vw;
    height: 10vw;
    border-radius: 60%;
    background-color: rgba(39, 41, 36, 0.884);
    transform: translateY(6%);
  }
  li {
    position: relative;
    width: 10vw;
    height: 10vw;
    border-radius: 60%;
    background-color: rgb(14, 9, 9);
  }
</style>
<body>
  <main class="container">
    <div class="warper">
      <ul>
        <li></li>
        <li></li>
      </ul>
      <ul>
        <li></li>
      </ul>
      <ul>
        <li></li>
        <li></li>
      </ul>
    </div>
  </main>
</body>
```

### Grid 网格布局

- 项目与容器
  - 采用网格布局的区域称为容器(`container`)
  - 容器内部采用网格定义的子元素称为项目(`item`)
- 行和列
  - 容器内部水平区域称为行(`row`)
  - 容器内部垂直区域称为行(`column`)
- 单元格与网格线
  - 行和列交叉区域称为单元格(`cell`)
  - 划分网格的称为网格线(`grid line`)
- Grid 属性

  - `container`属性

    - `dispaly:grid`容器元素为块级元素
    - `dispaly:inline-grid`容器元素为行内元素
    - `grid-template-rows(columns)`行宽与列高
      - 具体数值 `100px 100px 100px`
      - 百分比`30% 40% 30%`
      - 函数`repeat(3, 33.33%)`
        - `repeat(auto-fill, 100px)`单元格固定容器不固定
      - fr 关键字`150px 1fr 2fr`

  - `item`属性

### 栅格系统

## 参考资料

- [CSS 参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)

- [CSS 中容易被忽视的 position 属性 sticky](https://juejin.im/post/5e68e020f265da570f50404a)

- [了解 CSS 浮动以及清除浮动](https://segmentfault.com/a/1190000002616482)

- [深入了解 CSS 外边距折叠](https://segmentfault.com/a/1190000010346113)

- [重提 CSS 中外边距折叠](https://segmentfault.com/q/1010000002645174)

- [Flex 布局教程](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

- [Grid 布局教程](ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
