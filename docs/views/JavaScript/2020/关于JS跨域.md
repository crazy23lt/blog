---
title: JS跨域问题
date: 2020-06-22
sidebar: auto
tags:
  - 跨域
categories:
  - JavaScript
---

## 跨域

### 何谓同源策略？

- 端口（port）、域名（Domain）、协议（http）三者一致则为同源

### 如何跨域

- 浏览器允许进行跨域写操作，如：链接、重定向。

- 浏览器允许进行跨域嵌入资源，如：img、script 标签。

- 浏览器不允许跨域读取操作

1. 客户端使用 jsonp
2.
3. 服务端配置跨域需求
4. 服务端代理（服务端不受同源策略影响）

### JSONP

- script 标签可以跨域请求
- JSONP 由两部分组成
  - 回调函数
  - 数据
- JSONP 请求过程

  - 请求阶段：创建 script 标签，src 属性赋值
  - 发送请求：script 标签渲染到 DOM 对象中
  - 数据响应：服务器返回数据作为参数和函数名称拼接在一起返回。

```js
class Tool {
  formatParams(data) {
    let arr = [];
    for (let name in data) {
      arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push("v=" + this.random());
    return arr.join("&");
  }
  random() {
    return Math.floor(Math.random() * 10000 + 500);
  }
}
class JSONP extends Tool {
  constructor(params = {}) {
    super();
    this.params = params;
    this.params.data = this.params.data || {};
    return this.jsonp();
  }
  jsonp() {
    let callbackName = this.params.jsonp;
    let head = document.getElementsByTagName("head")[0];
    this.params.data["callback"] = callbackName;
    let data = this.formatParams(this.params.data);
    let script = document.createElement("script");
    head.appendChild(script);
    window[callbackName] = (json) => {
      head.removeChild(script);
      clearTimeout(script.timer || null);
      window[callbackName] = null;
      this.params.success && this.params.success(json);
    };
    script.src = this.params.url + "?" + data;
    if (this.params.time) {
      script.timer = setTimeout(() => {
        window[callbackName] = null;
        head.removeChild(script);
        this.parasm.error && this.params.error(new Error({ message: "超时" }));
      }, this.params.time);
    }
  }
}
let getRet = new JSONP({
  url: "http://127.0.0.1:3000/api",
  jsonp: "callback",
  time: 3000,
  data: { name: "mrliu" },
  success: function(res) {
    console.info(res);
  },
  error: function(error) {},
});
```

```js
const express = require("express");
const app = express();
app.get("/api", (req, res) => {
  let response = {
    title: "耶鲁留学生的2000张自拍照",
    content:
      "耶鲁留学生的2000张自拍照，耶鲁留学生的2000张自拍照，耶鲁留学生的2000张自拍照，耶鲁留学生的2000张自拍照，耶鲁留学生的2000张自拍照",
  };
  res.type("application/json");
  res.jsonp(response);
});
app.use((req, res) => {
  res.status(500).json({ error: "api地址有问题", status: 500 });
});
app.listen(3000, () => {
  console.info("服务开启成功");
});
```

### jqueryAjaxjsonp 跨域

```js
$.ajax({
  url: "http://localhost:3000/api",
  data: { name: "mrliu" },
  dataType: "jsonp",
  jsonp: "callback",
  jsonpCallback: "callback",
  success: (ret) => {
    console.info(ret);
  },
});
```

### 服务端跨域设置(cors)

- 设置允许访问的域名
  - `res.setHeader('Access-Control-Allow-Orgin')`
- 设置允许访问的请求方式
  - `res.setHeader('Access-Control-Allow-Methods','PUT')`
- 设置需要允许访问的请求头
  - `res.setHeaders('Access-Control-Allow-Headers','name')`
- 设置 max-age
  - `req.setHeader('Access-Control-Max-Age',5)`//单位秒
- 允许跨域携带 cookie
  - `res.serHeader('Access-Control-Allow-Credentials')`
- 允许浏览器获取服务器返回的 headers
  - `res.setHeader('Access-Control-Expose-Headers','name')`

### http-proxy

- `http-proxy-middleware`模块

```js
//a.js
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
//将请求转发到另一个服务器
const apiProxy = createProxyMiddleware("/say", {
  target: "http://localhost:4000",
});

const app = express();
app.use(express.static(__dirname));
app.use(apiProxy);
app.listen(3000, function() {
  console.log("3000启动");
});
//b.js
const express = require("express");
const app = express();
app.use(express.static(__dirname));
app.get("/say", function(req, res) {
  res.end("我是b服务器的信息");
});
app.listen(4000, function() {
  console.log("4000启动");
});
```

### postMessage 跨域

- 页面之间的跨域
