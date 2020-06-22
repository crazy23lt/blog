---
title: CSS3形变(transform)与动画(Animation)
date: 2020-06-22
sidebar: auto
tags:
  - transform
  - transform
categories:
  - CSS
---

## `Transform` & `Animation`

- _transform（变形）: 用于 2D 或 3D 转换，元素旋转、缩放、移动、倾斜。实用注意兼容性。_
- _translate（移动）: 控制 2D 或 3D 元素移动，仅是变换函数，提供给 transform 当属性使用。_
- _animation（动画）: 元素原先样式配置切换到另一种样式配置，不同帧对应不同样式配置。_
- _transition（过渡）: 过渡属性，元素属性的变化。_

### Animation 轮播图

```html
<style>
  * {
    padding: 0;
    margin: 0;
  }
  html,
  body {
    height: 100vh;
    background-color: black;
    overflow: hidden;
  }
  header {
    margin: 20px auto;
    color: white;
    text-align: center;
  }
  main {
    width: 50vw;
    margin: 0 auto;
  }
  .wrapper {
    overflow: hidden;
  }
  ul {
    height: 300px;
    width: 150vw;
    list-style: none;
    font-size: 0;
    position: relative;
    animation: moveli 5s linear infinite normal;
  }
  li {
    height: 300px;
    width: 50vw;
    display: inline-block;
  }
  li:nth-child(1) {
    background-color: blanchedalmond;
  }
  li:nth-child(2) {
    background-color: coral;
  }
  li:nth-child(3) {
    background-color: darkgreen;
  }
  @keyframes moveli {
    0% {
      left: 0;
    }
    30% {
      left: 0;
    }
    35% {
      left: -50vw;
    }
    65% {
      left: -50vw;
    }

    70% {
      left: -100vw;
    }
    100% {
      left: -100vw;
    }
  }
</style>
<body>
  <header>
    <h1>Animation轮播图</h1>
  </header>
  <main>
    <div class="wrapper">
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </main>
</body>
```

### 菱形 CSS 画法

```html
<style>
  * {
    padding: 0;
    margin: 0;
  }
  body,
  html {
    font-size: 16px;
    overflow: hidden;
    height: 100vh;
    background-color: black;
  }
  header {
    font-size: 1rem;
    color: blanchedalmond;
    text-align: center;
    margin: 20px auto;
  }
  main {
    margin: 0 auto;
    width: 50vw;
  }
  .s1 {
    position: relative;
    height: 400px;
    width: 100%;
    border: cornflowerblue solid 1px;
  }
  ul {
    width: 86.6px;
    height: 100px;
    list-style: none;
    font-size: 0;
    position: absolute;
    top: 50%;
    left: 50%;
  }
  li {
    display: inline-block;
    width: 86.6px;
    height: 100px;
    overflow: hidden;
    top: -50%;
    left: 0;
    position: absolute;
    transform-origin: -30% 50%;
  }

  li .clic {
    width: 100px;
    height: 86.6px;
    position: absolute;
    bottom: 0;
    transform-origin: 89% 87%;
    transform: rotate(30deg) skew(-30deg);
    background-color: burlywood;
  }
  li:nth-child(2) {
    transform: rotate(60deg);
  }
  li:nth-child(3) {
    transform: rotate(120deg);
  }
  li:nth-child(4) {
    transform: rotate(180deg);
  }
  li:nth-child(5) {
    transform: rotate(240deg);
  }
  li:nth-child(6) {
    transform: rotate(300deg);
  }
  .clear::after {
    content: "";
    height: 0;
    display: block;
    clear: both;
  }
</style>
<body>
  <header>
    <h1>菱形</h1>
  </header>
  <main>
    <section class="s1">
      <ul class="clear">
        <li>
          <div class="clic"></div>
        </li>
        <li>
          <div class="clic"></div>
        </li>
        <li>
          <div class="clic"></div>
        </li>
        <li>
          <div class="clic"></div>
        </li>
        <li>
          <div class="clic"></div>
        </li>
        <li>
          <div class="clic"></div>
        </li>
      </ul>
    </section>
  </main>
</body>
```
