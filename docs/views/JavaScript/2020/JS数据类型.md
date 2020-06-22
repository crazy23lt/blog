---
title: JS数据类型
date: 2020-06-22
sidebar: auto
tags:
  - 数据类型
categories:
  - JavaScript
---

## JS 数据类型

- 基本数据类型

  - **Underfined 类型**
    - 变量声明但没初始化
  - **Null 类型**
    - 空指针对象
  - **Boolean 类型**

    - 区分大小写 `true`、`false`
    - ```js
      Boolean(underfined); //false
      Boolean(null); //false
      Boolean(underfined); //false
      Boolean(""); //false
      Boolean(0); //false
      Boolean(NaN); //false
      Boolean({}); //true
      ```

  - **Number 类型**

    - ```js
      /**
       *  整型
       */
      var num = 56; //十进制56
      var num = 070; //八进制56
      var num = 0x38; //十六进制56
      /**
       *  浮点型
       *    - 浮点数值精度最高 17 位，计算会产生舍入误差
       */
      /**
       *  正无穷、负无穷
       *    - 正数除以 0 返回正无穷(Infinity)，负数除以 0 返回负无穷(-Infinity)
       */
      isFinite(500); // true
      isFinite(Infinity); // false
      /**
       *  NaN
       *    - 浮点数值精度最高 17 位，计算会产生舍入误差
       */
      ```

  - **String 类型**
    - 字符字面量（转义序列）
  - **Symbol 类型**
    - 不可变的数据类型，可以作为对象属性的标识符使用，表示独一无二的值。
  - **BigInt 类型**

- 引用类型
  - Object
    - Object 类型
    - Array 类型
    - Date 类型
    - RegExp 类型
    - Function 类型

### 两种类型的差别

- 基础数据存储在栈中，引用数据存储在堆中
  - 堆无序存储比栈大

### 数据类型判断

```js
var bool = true;
var num = 1;
var str = "abc";
var und = undefined;
var nul = null;
var arr = [1, 2, 3];
var obj = { name: "haoxl", age: 18 };
var fun = function() {
  console.log("I am a function");
};
/**
 * typeof   对于null及数组、对象，typeof均检测出为object
 */
console.log(typeof bool); //boolean
console.log(typeof num); //number
console.log(typeof str); //string
console.log(typeof und); //undefined
console.log(typeof nul); //object
console.log(typeof arr); //object
console.log(typeof obj); //object
console.log(typeof fun); //function
/**
 * instanceof  判断两个对象是否属于实例关系
 */
console.log(bool instanceof Boolean); // false
console.log(num instanceof Number); // false
console.log(str instanceof String); // false
console.log(und instanceof Object); // false
console.log(arr instanceof Array); // true
console.log(nul instanceof Object); // false
console.log(obj instanceof Object); // true
console.log(fun instanceof Function); // true

var bool2 = new Boolean();
console.log(bool2 instanceof Boolean); // true

var num2 = new Number();
console.log(num2 instanceof Number); // true

var str2 = new String();
console.log(str2 instanceof String); //  true

function Person() {}
var per = new Person();
console.log(per instanceof Person); // true

function Student() {}
Student.prototype = new Person();
var haoxl = new Student();
console.log(haoxl instanceof Student); // true
console.log(haoxl instanceof Person); // true
/**
 * 使用constructor
 *  - undefined和null没有contructor属性
 *  - 使用它是不安全的，因为contructor的指向是可以改变的
 */
console.log(bool.constructor === Boolean); // true
console.log(num.constructor === Number); // true
console.log(str.constructor === String); // true
console.log(arr.constructor === Array); // true
console.log(obj.constructor === Object); // true
console.log(fun.constructor === Function); // true

console.log(haoxl.constructor === Student); // false
console.log(haoxl.constructor === Person); // true
/**
 * 使用Object.prototype.toString.call
 */
console.log(Object.prototype.toString.call(bool)); //[object Boolean]
console.log(Object.prototype.toString.call(num)); //[object Number]
console.log(Object.prototype.toString.call(str)); //[object String]
console.log(Object.prototype.toString.call(und)); //[object Undefined]
console.log(Object.prototype.toString.call(nul)); //[object Null]
console.log(Object.prototype.toString.call(arr)); //[object Array]
console.log(Object.prototype.toString.call(obj)); //[object Object]
console.log(Object.prototype.toString.call(fun)); //[object Function]

function Person() {}
function Student() {}
Student.prototype = new Person();
var haoxl = new Student();
console.log(Object.prototype.toString.call(haoxl)); //[object Object]
```

## 参考资料

- [ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/promise)

- [js 判断数据类型](https://segmentfault.com/a/1190000015264821#item-3)

- [JS 学习笔记（一）数据类型](https://juejin.im/post/5ee4dca96fb9a047a64473af#heading-23)
