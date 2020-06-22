---
title: Ajax的演变
date: 2020-06-22
sidebar: auto
tags:
  - ajax
categories:
  - JavaScript
---

## XHR

**AJAX 的核心是 XMLHttpRequset**

- 实例化 XMLHttpRequest 对象
- 连接服务器
- 发送请求
- 接收响应数据

```js
// 适配不同浏览器的XHR
if (window.XMLHttpRequest) {
  request = new XMLHttpRequest();
} else if (window.ActiveXObject) {
  try {
    request = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      request = new ActiveXObect("Microsoft.XMLHTTP");
    } catch (e) {}
  }
}
request.open("GET", "http://jartto.wang/ajax-example", true);
request.send(null);
```

### 封装一个 ajax()方法

```js
```

### jquery 中的 ajax

```js
$.ajax({
  type: "post",
  url: url,
  data: data,
  dataType: dataType,
  seccess: function() {},
  error: function() {},
});
```

## Fetch

- `XMLHttpRequest` 是一个设计粗糙的 `API`，不符合关注分离`（Separation of Concerns）`的原则。
- 配置和调用方式非常混乱，而且基于事件的异步模型写起来也没有现代的 `Promise，generator/yield，async/await` 友好。

### 基本实例

```js
fetch(url, { method: "get" })
  .then((response) => {
    console.info(response);
  })
  .catch((err) => {
    console.info(err);
  });
```

### 自定义请求头（header）

- `new Headers()`创建请求头
- `headers.append('key','value')`添加请求头
- `headers.get('key')`获取请求头
- `headers.set('value')`设置请求头
- `headers.delete('key')`删除请求头

```js
// 创建一个空的Headers实例
const headers = new Headers();

// 添加一些 headers
headers.append("Content-Type", "text/plain");
headers.append("X-My-Custom-Header", "CustomValue");

// 检查，获取和设置 header 值
headers.has("Content-Type"); // true
headers.get("Content-Type"); // "text/plain"
headers.set("Content-Type", "application/json");

// 删除 header
headers.delete("X-My-Custom-Header");

// 添加初始值
const headers = new Headers({
  "Content-Type": "text/plain",
  "X-My-Custom-Header": "CustomValue",
});
```

- 设置请求头，先创建 Request 实例

```js
const request = new Request(url,{
  methods:'POST',
  mode:'cors',
  redirect:'follow',
  header:new Headers({
    'Content-Type':'text/plain'
  })
})
fetch(request).then(...).catch(...)
```

### 请求体与响应体（Request、Response）

- **Request 请求体参数**
  - method - GET, POST, PUT, DELETE, HEAD
  - url - 请求的 url
  - headers - 对应的 Header 对象
  - referrer - 请求的 referrer 信息
  - mode - 模式，可选类型有 cors, no-cors, same-origin
  - credentials - 是否携带 cookie，可选类型有 omit, same-origin
  - redirect - follow, error, manual
  - integrity - subresource integrity value
  - cache - 缓存模式，可选类型有 default, reload, no-cache
- **Response 响应体参数**
  - type - 类型，支持 basic, cors
  - url
  - useFinalURL - 是否是最终的 url，Boolean 类型
  - status - 状态码 (200, 404,等)
  - ok - Boolean 值，代表成功响应（status 值在 200-299 之间）
  - statusText - 状态值（例如：OK）
  - headers - 与响应相关联的 Headers 对象
- **Response 响应体方法**
  - clone() - 创建一个新的 Response 克隆对象
  - error() - 返回一个新的，与网络错误相关的 Response 对象
  - redirect() - 重定向，使用新的 URL 创建新的 Response 对象
  - arrayBuffer() - 返回一个 promise,resolves 是一个 ArrayBuffer
  - blob() - 返回一个 promise,resolves 是一个 Blob
  - formData() - 返回一个 promise, resolves 是一个 FormData 对象
  - json() - 返回一个 promise,resolves 是一个 JSON 对象
  - text() - 返回一个 promise,resolves 是一个 USVString(text)

### 使用场景

- JSON

```js
fetch("http://mrliu/public/index.json")
  .then((response) => {
    // 转换成json字符串
    return response.json();
  })
  .then((result) => {
    console.info(result);
  });
```

- HTML/text

```js
fetch("http://mrliu/public/page")
  .then((response) => {
    return response.text();
  })
  .then((text) => {
    console.info(text);
  });
```

- form 表单

```js
let form = document.querySelector("form");
fetch("http://jartto.wang/submit", {
  method: "post",
  body: new FormData(form),
});
fetch("http://jartto.wang/submit-json", {
  method: "post",
  body: JOSN.stringify({
    name: "mrliu",
    blog: "http://mrliu",
  }),
});
```

- 图片处理

```js
fetxh("http://jartto.wang/logo.png")
  .then((response) => {
    return response.blob();
  })
  .catch((imageBlob) => {
    document.querySeletor("img").src = URL.createObjectURL(imageBlob);
  });
```

- 上传实例

```js
let input = document.querySelector("input[type=file]");
let data = new FormData();
data.append("flie", input.files[0]);
data.append("name", "jartto");
fetch("http://mrliu", {
  method: "POST",
  body: data,
});
```

- 处理 http 错误状态码

```js
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}
function parseJSON(response) {
  return response.json();
}
fetch("/mrliu")
  .then(checkStatus)
  .then(parseJSON)
  .then((data) => {
    console.info(data);
  })
  .catch((error) => {
    console.info(error);
  });
```

- cookie 配置

```js
//同域
fetch("http://jartto.wang/users", {
  credentials: "same-origin",
});
//跨域
fetch("https://baidu.com/users", {
  credentials: "include",
});
```

## 参考资料

- [XHR or Fetch API ?](http://jartto.wang/2017/01/17/xhr-or-fetch-api/)
- [从 ajax 到 fetch、axios](https://juejin.im/post/5acde23c5188255cb32e7e76#heading-0)
- [axios 中文文档|axios 中文网](http://www.axios-js.com/zh-cn/docs/)
