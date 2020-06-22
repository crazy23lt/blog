---
title: HTML5---语义化标签
date: 2020-01-09
sidebar: auto
tags:
  - 语义化
categories:
  - HTML
---

## 单页面监听 localStorage 变动

- 方法 1：重写 localStorage.setItem()方法

  ```javascript
  const oldSetItem = window.localStorage.setItem;
  window.localStorage.setItem = function(key, newValue) {
    if (key === "你要监听的key") {
      // do something
    }
    oldSetItem(key, newValue);
  };
  ```

- 方法 2：封装原生 localStorage 的 api,生成自己的自定义功能
  ```javascript
  var myStorage = {
    setItem(key, val, ...rest){
      // do something
      window.localStorage.setItem(key,val)
    }
    getItem(key,..rest){
      // do something
      return window.localStorage. getItem(key)
    }
    // ...其他方法
  }
  export default myStorage
  ```
- 方法 3：监听 localStorage 时间
  ```javascript
  // 重写setItem方法
  const oldSetItem = window.localStorage.setItem;
  window.localStorage.setItem = function(key, newValue) {
    var setItemEvent = new Event("setItemEvent");
    setItemEvent.key = key;
    setItemEvent.newValue = newValue;
    window.dispatchEvent(setItemEvent);
    oldSetItem.apply(this, arguments);
  };
  // 添加监听事件
  window.addEventListener("setItemEvent", function(e) {
    // do something
  });
  ```

## 不同页面监听 localStorage 变动

```javascript
window.addEventListener("storage", function(e) {
  if (e.key === "你要监听的key") {
    // do something
    console.log(e.newValue);
  }
});
```

## 参考链接

- [localStorage 单页面及不同页面监听变动](https://blog.csdn.net/qq_42076140/article/details/80307326)
- [vue 怎么监听 localStorage 值得变化](https://segmentfault.com/q/1010000015906159)
- [vuex 持久化插件](https://github.com/robinvdvleuten/vuex-persistedstate)
