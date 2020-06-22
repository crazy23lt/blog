---
title: JS原型与继承
date: 2020-06-22
sidebar: auto
tags:
  - 原型与继承
categories:
  - JavaScript
---

# JS 原型

JS 基于对象，面向原型（`prototype`）。对象关联（`Object Link Other Object`）

每一个实例对象都有一个`__proto__`私有属性，指向构造函数的原型对象（`prototype`）

该原型对象也有一个自己的原型对象(`__proto__`)

层层向上直到一个对象的原型对象称为`null`。

根据定义：`null`没有原型，并作为这个**原型链**中的最后一个环节。

## 原型链

访问一个对象的属性时，会通过`__proto__`属性来查找属性。

ECMAScript 标准，规定`someObject.[[Prototype]]`符号用于指向 `someObject` 的原型。

从 ESMAScript6 开始，可以通过 `Object.getPrototypeOf()`和 `Object.setPrototypeOf()`访问器来访问对象原型

等同于 JS 的非标准，但许多浏览器实现的属性`__proto__`

每一个实例对象都有一个 `constructor` 属性，默认调用 `prototype` 对象的 `constructor` 属性

因此在基于 `prototype` 继承属性时，会造成实例对象 `constructor` 属性指向错误。

解决方法：`prototype` 的 `constructor` 属性重新指向实例对象的构造函数。

![原型链继承](/images/Object.png)

### 继承属性与继承方法

在构造函数的原型上定义属性或者方法，实例化对象将会继承这些属性或方法。

```javascript
// 声明构造函数F，F.__proto__指向Function.prototype
function F() {
  this.a = "a";
  this.privateFn1:()=>{return '私有方法'}
}
// 实例化一个对象
let obj = new F();
// F构造函数prototype上定义属性
F.prototype.b = "b";
F.prototype.publicFn1 = ()=>{return '公有方法'}
// 原型链 {a:'a',provateFn1:function}--->{b:'b',plubicFn1:function}--->Object.prototype--->null
```

### JS 创建对象和生成原型链

#### 语法结构创建对象

```javascript
var o = { a: 1 };
// o ---> Object.prototype ---> null
var a = ["12", "12"];
// a ---> Array.prototype ---> Object.prototype --->null
function f() {
  return 2;
}
// f ---> Function.prototype ---> Object.prototype ---> null
```

#### 构造器创建对象

```javascript
function Graph() {
  this.vertices = [];
}
Graph.prototype = {
  addVertex: function(v) {
    this.vertices.push(v);
  },
};
var g = new Graph();
```

#### Object.create 创建对象

```javascript
var a = { a: 1 };
// a ---> Object.prototype ---> null
var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
var c = Object.create(b);
// c ---> b ---> a ---> Object.prottype ---> null
var d = Object.create(null);
// d ---> null
```

#### class 关键字创建对象

_ECMAScript6 引入一套新关键字实现`class`。（语法糖）_

```javascript
"use staict";
class Polygon {
  constructor(w, h) {
    this.w = w;
    this.h = h;
  }
}
class Square extends Polygon {
  constructor(sideLength) {
    super(sideLength, sideLength);
  }
  get area() {
    return this.h * this.w;
  }
  set sideLength(newLength) {
    this.h = newLength;
    this.w = newlength;
  }
}
```

## Object 构造函数方法

构造函数实例化对象，this 将指向实例对象

- 返回新对象

  - `Object.assign()` 复制一个或多个对象返回新对象

  - `Object.create()` 指定原型对象与属性返回新对象

- 对象添加属性

  - `Object.defineProperty()` 对象添加属性并指定属性配置

  - `Object.defineProperties()` 对象添加多个属性并配置

- 遍历对象自身可枚举属性

  - `Object.entries()` 返回对象**自身**可枚举属性[key,value]数组

  - `Object.keys()` 返回数组，列出对象**自身**可枚举属性名称

  - `Object.values()` 返回数组，列出对象**自身**可枚举属性

- 遍历对象所有属性

  - `Object.getOwnPropertyDescriptor()` 返回对象指定属性配置

  - `Object.getOwnPropertyNames()` 返回数组列出对象可枚举或不可枚举属性

  - `Object.getOwnPropertySymbols()` 返回数组对象**自身**所有符号属性

- 对象的原型对象

  - `Object.getPrototypeOf()` 返回对象的原型对象

  - `Object.setPrototypeOf()` 设置对象原型对象

- 比较对象

  - `Object.is()` 比较值相同否。所有 NaN 值都相等。

- 对象扩展

  - `Object.preventExtensions()` 防止对象任何扩展

  - `Object.isExtensible()` 判断对象是否可扩展

- 对象密封

  - `Object.isSealed()` 判断对象是否密封

- 对象冻结

  - `Object.isFrozen()` 判断对象是否冻结

  - `Object.freeze()` 冻结对象其他代码无法删除或修改属性

  - `Object.seal()` 防止其他代码删除对象属性

---

## Object 原型对象方法

- `Object.prototype.constructor` 特定函数，用于创建对象的原型

- `Object.prototype.__proto__`当对象被实例化之后，只想原型对象

- `Object.prototype.hasOwnProperty(attrName)`返回布尔值，对象自身是否含有指定属性

- `Object.prototype.isPrototypeOf(attrName)` 返回布尔值，指定属性是否在本对象原型链中

---

## 构造函数的继承

### 构造函数绑定：

将父对象的构造函数绑定到子对象上。

```javascript
function SuperType() {
  this.color = ["red", "green", "blue"];
}
function SubType() {
  //继承自SuperType
  SuperType.call(this);
}
var instance1 = new SubType();
instance1.color.push("black");
alert(instance1.color); //"red,green,blue,black"

var instance2 = new SubType();
alert(instance2.color); //"red,green,blue"
```

只能继承父类实例属性和方法，原型属性和方法无法继承。

无法复用，每个子类都有父类的函数副本，影响性能

### 原型链继承

改变 prototype 继承

多个实例对引用类型的操作会被篡改。

```javascript
function SuperType() {
  this.colors = ["red", "blue", "green"];
}
function SubType() {}
// 此处执行和建立了 new SuperType
SubType.prototype = new SuperType();
var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
var instance2 = new SubType();
alert(instance2.colors); //"red,blue,green,black"
```

上述方法，存在建立 `SuperType` 实例对象，占用一部分内存。

解决办法：**`prototype` 继承父类的原型对象，公用属性都定义在原型对象上。**

```javascript
function SuperType() {}
SuperType.prototype.colors = ["red", "blue", "green"];
function SubType() {}
SubType.prototype = SuperType.prototype;
SubType.prototype.constructor = SubType;
var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
var instance2 = new SubType();
alert(instance2.colors); //"red,blue,green,black"
```

上述方法，`Sub.prototype` 与 `SuperType.prototype` 指向同一对象

导致任何对 `Sub.prototype` 的修改都会反应到 `Super.prototype` 上，明显不符合预期。

解决办法：**利用空对象作为中介**

```javascript
function myextends(Sub, Super) {
  let F = function() {};
  F.prototype = Super.prototype;
  Sub.prototype = new F();
  Sub.prototype.constructor = Sub;
  Sub.Uber = Super.prototype;
}
function SuperType() {}
SuperType.prototype.colors = ["red", "blue", "green"];
function SubType() {}
myextends(SubType, SuperType);
var instance1 = new SubType();
instance1.colors.push("black");
console.info(instance1.colors); //"red,blue,green,black"
var instance2 = new SubType();
console.info(instance2.colors); //"red,blue,green,black"
```

解决原型对象 `constructor` 指向问题，内存损耗问题。

任然存在共享原型对象属性。

### 组合继承

通过构造函数绑定（调用），实现继承构造函数上的属性

因为，构造函数绑定无法继承原型对象上的属性，所以不存在公享属性问题

```javascript
function SuperType(name) {
  this.name = name;
  this.colors = ["yellow", "blue", "red"];
}
SuperType.prototype.sayName = function() {
  console.info(this.name);
};
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
  console.info(this.age);
};
let Jerry = new SubType("Jerry", 20);
Jerry.colors.push("black"); // ["yellow", "blue", "red","black"]
let Tom = new SubType("Tom", 20);
Tom.color; //["yellow", "blue", "red"]
```

调用了两次 SuperType 构造函数，造成了原型和实例上拥有两个相同的属性。

### 寄生组合继承

利用空对象解决组合继承多次调用父类导致内存消耗问题。

```javascript
function inheritPrototype(subType, superType) {
  // 抽取父类的原型对象 返回新对象
  // 子类 prototype 改写并修正 constructor 属性
  subType.prototype = Object.create(superType.prototype);
  subType.prototype.constructor = subType;
}
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
  console.info(this.name);
};
function SubType(name, age) {
  //实例化子类对象时，拷贝父类上的属性方法，无法拷贝父类原型对象上的属性方法
  SuperType.call(this, name);
  this.age = age;
}
// 修改子类 prototype 属性
inheritPrototype(SubType, SuperType);
// 修改 子类 prototype 之后操作
SubType.prototype.sayAge = function() {
  console.info(this.age);
};
let Jerry = new SubType("Jerry", 12);
let Tom = new SubType("Tom", 12);
Jerry.colors.push("2");
Tom.colors.push("3");
```

_仅调用了一次父类`SuperType.call(name,this)`，并且通过`Object.create()`来返回一个新的原型对象_
_本质还是，原型对象继承原型属性。通过函数绑定继承函数属性。_
_`Object.assign(subType.prototype,superType.prototype)`合并多个原型对象（同时继承多个原型对象）_

```javascript
function inheritPrototype(subType, ...prototype) {
  // 抽取父类的原型对象 返回新对象
  // 子类 prototype 改写并修正 constructor 属性
  subType.prototype = Object.assign(subType.prototype, ...prototype);
  subType.prototype.constructor = subType;
  subType.prototype.uber = prototype;
}
function OtherType() {}
OtherType.prototype.sayHi = function() {
  console.info("sayHI");
};
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
  console.info(this.name);
};
function SubType(name, age) {
  //实例化子类对象时，拷贝父类上的属性方法，无法拷贝父类原型对象上的属性方法
  SuperType.call(this, name);
  this.age = age;
}
// 修改子类 prototype 属性
inheritPrototype(SubType, SuperType.prototype, OtherType.prototype);
// 修改 子类 prototype 之后操作
SubType.prototype.sayAge = function() {
  console.info(this.age);
};
let Jerry = new SubType("Jerry", 12);
let Tom = new SubType("Tom", 12);
Jerry.colors.push("2");
Tom.colors.push("3");
```

### ES6`extends`继承

```javascript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  get area() {
    return this.calcArea;
  }
  calcArea() {
    return this.height + this.width;
  }
}
class Square extends Rectangle {
  constructor(length) {
    super(length, length);
    this.name = "Square";
  }
  get area() {
    return this.height * this.width;
  }
}
const square = new Square(10);
console.info(square.area);
```

**总结：构造函数继承围绕 prototypr 来实现，因为对象延`__proto__`查询属性**

```javascript
var Chinese = {
  nation: "中国",
};
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
let Doctor = object(Chinese);
Doctor.career = "医生";
```

## new 运算符

`new` 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。`new` 关键字会进行如下的操作：

1. 创建一个空的简单 `JavaScript` 对象（即{}）
2. 这个对象会被执行[[Prototype]]（也就是**proto**）链接。
3. 生成的新对象会绑定到函数调用的 this。
4. 通过 new 创建的每个对象将最终被[[Prototype]]链接到这个函数的 prototype 对象上。
5. 如果函数没有返回对象类型 Object(包含 Functoin, Array, Date, RegExg, Error)，那么 new 表达式中的函数调用会自动返回这个新的对象

```js
function newOperator(ctor) {
  if (typeof ctor !== "function") {
    throw "newOperator function the first param must be a function"; // 参数必须是函数
  }
  newOperator.target = ctor; // target 属性值为 ctor  ES6 new.target 是指向构造函数
  var newObj = Object.create(ctor.prototype); // 空对象，函数原型绑定到空对象上
  var argsArr = [].slice.call(arguments, 1); // 去除其余参数
  var ctorReturnResult = ctor.apply(newObj, argsArr); // 绑定函数调用this
  // 中这些类型中合并起来只有Object和Function两种类型 typeof null 也是'object'所以要不等于null，排除null
  var isObject =
    typeof ctorReturnResult === "object" && ctorReturnResult !== null;
  var isFunction = typeof ctorReturnResult === "function";
  if (isObject || isFunction) {
    return ctorReturnResult;
  }
  // 如果函数没有返回对象类型`Object`(包含`Functoin`, `Array`, `Date`, `RegExg`, `Error`)，那么`new`表达式中的函数调用会自动返回这个新的对象。
  return newObj;
}
```

## 拷贝

- 浅拷贝

```javascript
function extendCopy(p) {
  var c = {};
  for (var i in p) {
    c[i] = p[i];
  }
  c.uber = p;
  return c;
}
```

- 深拷贝

```javascript
function deepCopy(p, c) {
  var c = c || {};
  for (var i in p) {
    if (typeof p[i] === "object") {
      c[i] = p[i].constructor === Array ? [] : {};
      deepCopy(p[i], c[i]);
    } else {
      c[i] = p[i];
    }
  }
  return c;
}
```

## References

- [Object - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

- [JS 八种继承方案](https://juejin.im/post/5bcb2e295188255c55472db0#heading-4)

- [new 运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)

- [面试官问：能否模拟实现 JS 的 new 操作符](https://juejin.im/post/5bde7c926fb9a049f66b8b52#heading-5)
