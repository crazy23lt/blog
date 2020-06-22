---
title: CSS---样式继承
date: 2020-06-22
sidebar: auto
tags:
  - CSS样式继承
categories:
  - CSS
---

## 样式继承

![CSS属性继承算法](/images/样式继承规则.png)

- 继承属性，初始值只能被用于**没有指定值的根元素**上。
  - 当元素的一个继承属性 （`inherited property`）没有指定值时，则取**父元素的同属性的计算值** `computed value`。只有文档根元素取该属性的概述中给定的初始值（`initial value`）（这里的意思应该是在该属性本身的定义中的默认值）
- 非继承属性，初始值可以被用于**任意没有指定值的元素**上。
  - 当元素的一个非继承属性(在 `Mozilla code` 里有时称之为 `reset property` )没有指定值时，则取**属性的初始值** `initial value`（该值在该属性的概述里被指定）。

### CSS 关键字`initial`、`inherit`、`unset`

- `initial`关键字：设置 css 属性为默认值，作用于任何 css 样式
- `inherit`关键字：元素的属性分为继承属性和非继承属性
- `unset`关键字：属性不进行设置，更具元素属性类型判断
  - 继承类型，使用父元素该属性的计算属性
  - 非继承类型，使用该属性的初始值

## 参考资料

- [CSS 参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)

- [谈谈一些有趣的 CSS 题目（十五）-- 谈谈 CSS 关键字 initial、inherit 和 unset](https://juejin.im/entry/58f7016fda2f60005d4d0916)
