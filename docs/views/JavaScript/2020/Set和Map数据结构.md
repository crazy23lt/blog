---
title: JS---Set和Map数据结构
date: 2020-06-22
sidebar: auto
tags:
  - ES6数据结构
categories:
  - JavaScript
---

# 数据结构

JS 原有表示集合的数据结构有，Array、Object。

ES6 新添加两种，Map、Set

用户通过这是用上述四种数据结构，来构建自己的数据。

同时需要一种统一的接口机制，来处理不同的数据结构，**Iterator**。

- Iterable（可迭代、可重复）
  - Array
  - Map
  - Set

---

## Array

### 扩展运算符

- `...[arrs]`，扩展运算符

  - 扩展运算符内部调用的是数据结构的`iterator`接口，只要具有`iterator`接口的对象，都能使用扩展运算符。

  - 运算符主要用于函数调用

  - 数组转为函数参数

    - apply 方法：`Math.max.apply(null,[1,3,4])`

    - 扩展运算符方法：`functionName(...arg)`

- 扩展运算符应用

  - 复制数组

    ```javascript
      const arr1 = [1,2]
      // ES5 拼接空数组来实现深拷贝
      arr1.concat()
      // ES6 展开数组，返回新数组
      [...arr1]
    ```

  - 合并数组

    - `arr.concat(arr2)`

    - `[...arr1,...arr2,...arr]`

  - 与解构赋值结合使用

    - `const [first,...rets] = [1,2,3,4]`

    - 扩展运算符用于数组赋值，只能放在参数的最后一位

  - 字符串转为真正的数组

    - `Unicode` 字符长度识别问题。

    ```javascript
      let str = 'x\uD83D\uDE80y';
      str.split('').reverse().join('')
      // 'y\uDE80\uD83Dx'
      [...str].reverse().join('')
      // 'y\uD83D\uDE80x'
    ```

  - 实现`iterator`接口对象

    - 任何定义了遍历器（`iterator`）接口的对象，都能使用扩展运算符转换成数组。

      ```javascript
      // 定义Number对象的遍历器接口
      Number.prototype[Symbol.iterator] = function*() {
        let i = 0;
        let num = this.valueOf();
        while (i < num) {
          yield i++;
        }
      };
      console.info([...5]); // [0,1,2,3,4]
      ```

  - `Map`和`Set`结构、`Generator`函数

    - 以上数据结构内部拥有`iterator`接口，因此可以上用扩展运算符。

### `Array.from()`

- 用于将两类对象转换成真正的数组

  - 类似数组的对象（array-like-object）

  - 可遍历（iterator）对象

  - ES5 写法：`[].slice.call(arrayLike)`

  - ES6 写法: `Array.from(arrayLike)`

- 应用场景

  - DOM 操作返回的 NodeList 集合

  - 函数内部 arguments 对象

- 转换数组对那些数据起效

  - 扩展运算符：部署了`iterator`接口的数据结构

  - `Array.from`：`length`属性的对象

- Array.from 可接受第二个参数，对数组元素进行处理，返回到新数组中。

  - `Array.from(arraylike, value => value.textContent)`

  - `Array.prototype.map.call(arraylike, s => s.textContent)`

  - ```javascript
    let arrayLike = {
      "0": "nab",
      "1": "ntc",
      "2": "bbc",
      length: 3,
    };
    Array.prototype.slice.call(arrayLike).map((x) =>
      x
        .split("")
        .reverse()
        .join("")
    );
    Array.from(arrayLike, (x) =>
      x
        .split("")
        .reverse()
        .join("")
    );
    ```

- 甄别浏览器是否支持`Array.from()`

  ```javascript
  const toArray = (() =>
    Array.from ? Array.from : (obj) => [].slice.call(obj))();
  ```

- 自符串转换成数组，返回字符串的长度。（此方法能正确处理 Unicode 字符）

  - JS 将大于\uFFFF 的 Unicode 字符，算作两个字符的 bug

  - `[...str]` 扩展运算符字符串

  - `Array.from(string)` Array.from 装换成数组

### Array.of()

一组值转换成数组

原始的 Array()方法当参数个数不同，导致 Array()行为存在差异。

Array.of()不存在上述差异。

```javascript
Array(); // []
Array(3); // [, , ,]
Array(1, 2, 3); // [1,2,3]
Array.of(); // []
Array.of(undefined); // [undefined]
Array.of(1, 2); // [1,2]
```

### 数组实例的 copyWithim()

复制指定位置的成员到其他位置（存在则覆盖），修改当前数组。

- `Array.prototype.copyWithin(target,start = 0,end = this.length)`

  - `target`：确定替换值起始位置

  - `start`：拾取替换值起始位置

  - `end`：拾取替换值结束位置

### 数组实例 find()和 findIndex()、filter()

- `Array.prototype.find(callback,this)`

  - 遍历数组元素，查找符合条件的元素
  - 存在目标元素（命中第一个），返回 true
  - 不存在目标元素，返回 undefined

- `Array.prototype.findIndex(callback,this)`

  - 遍历数组元素，查找符合条件的元素
  - 存在目标元素，返回索引
  - 不存在目标元素，返回-1

- `Array.prototype.filter(callback,this)`

  - 遍历数组元素，查找符合条件的元素
  - 存在目标元素，返回元素
  - 不存在目标元素，返回-1

- 以上三种方法接受两个参数

  - `callback`：数组成员依次执行的回调函数
  - `this`：回调函数中 `this` 指向的对象

### 数组实例的 fill()

- 使用一个定值填充数组`new Array(3).fill(77)`（若存在则覆盖）

- `Array.prototype.fill(target,start,end)`

  - `target`：填充值
  - `start`：被填充值起始位置
  - `end`：被填充值结束位置

- 如果被填充的数据是一个对象类型的，则真实填充的值是对象类型的指针。

```javascript
let arr = new Array(3).fill({ name: "Mike" });
// arr数组元素被填充指针
arr[0].name = "Ben";
// 数组元素存储的指针都指向同一位置
// [{name:'Ben'},{name:'Ben'},{name:'Ben'}]
```

### entries()、keys()、values()

返回遍历器（`iterator`）对象，使用`for...of`遍历数组

- entries()：返回键值对遍历器
- keys()：返回值遍历器
- values()：返回键遍历器

### 数组实例的 includes()

- `Array.prototype.includes()`返回布尔值，判断数组是否有目标值。

- `ES5`的`indexOf()`方法，使用严格相等运算符进行判断，无法判断`NaN`，`includes()`不存在此问题

```javascript
const contains = (() => {
  Array.prototype.includes
    ? (arr, value) => arr.includes(value)
    : (arr, value) => arr.some((el) => el === value);
})();
contains(["foo", "fooooo"], "foo"); // true
```

### 数组实例 flat()、flatMap()

二维数组或多维数组，使用 `Array.prototype.flat()`拉平嵌套数组。返回新数组，不会修改原数组。

- 用法

  - `[1,2,3,[4,5]].flat()`
  - `[1,2,3,[4,5,[6,7]]].flat(2)`
  - 携带参数可以是一个`Number`、或者`Infinity`

- 数组排空

  - `[1,2,3, ,5].flat()`

`Array.prototype.flatMap(callback,this)`

`回调函数接受3个参数，当前数组成员，当前数组成员位置，原数组。`

`this` 可绑定一个对象

```javascript
[1, 2, 3, 4].flatMap((x) => [[x * 2]]);
[(1, 2, 3, 4)].flatMap((x) => [[x * 2]]);
```

### [数组空位处理](https://es6.ruanyifeng.com/?search=iterable&x=0&y=0#docs/array#%E6%95%B0%E7%BB%84%E7%9A%84%E7%A9%BA%E4%BD%8D)

### [Array.prototype.sort()排序的稳定性](https://es6.ruanyifeng.com/?search=iterable&x=0&y=0#docs/array#Array-prototype-sort-%E7%9A%84%E6%8E%92%E5%BA%8F%E7%A8%B3%E5%AE%9A%E6%80%A7)

---

## Set

`Set`本身是一个**构造函数**，用来生成`Set`数据结构。

`new Set()`，接受一个数组或`iterable`接口的其他数据

`Set`结构没有键名，只有键值。遍历时 key 与 value 相等

`Set`结构数据默认可遍历，默认遍历器生成的函数就是`Set.prototype.values()`方法

### Set 实例的属性与方法

- `Set`结构实例的属性

  - `Set.prototype.constructor`：构造函数，默认`Set`函数

  - `Set.prototype.size`：`set`实例的成员总数

- `Set`实例方法

  - `Set.prototype.add(value)`：添加某个值

    - 添加`Set`结构成员，不会添加重复值。

    - `Set`加入值时，判断值相等否，依据`Same-value-zero equality`，类似精确相等运算符（===）。主要区别，`Set`能够判断`NaN`等于自身。而（===）无法判断。

  - `Set.prototype.delete(value)`：删除某个值，返回布尔值。

  - `Set.prototype.has(value)`：判断值是否为`set`成员，返回布尔值。

  - `Set.prototype.clear()`：清除 Set 所有成员，无返回值。

- `Set`遍历方法

  - `Set.prototype.keys()`：返回键名的遍历器

  - `Set.prototype.values()`：返回键值的遍历器

    - values 方法时 Set 数据结构的默认遍历器

    - ```js
      Set.prototype[Symbol.iterator] === Set.prototype.values; // true
      // 省略values方法，直接使用for..of 循环遍历Set
      let set = new Set(["red", "green", "blue"]);
      for (let x of set) {
        console.info(x);
      }
      ```

  - `Set.prototype.entries()`：返回键值对的遍历器

  - `Set.prototype.forEach()`：回调函数遍历每个成员

    - 主要用于对每个成员执行某种操作

### Set 功能实践

- 去重

  ```javascript
  // 去除数组的重复成员
  [...new Set(array)]
  // 去除字符串里面的重复字符
  [...new Set('ababbc')].join('')
  ```

---

## Map

### Map 实例属性与操作方法

- 比`Object`更纯粹的键值对应的数据结构。键存储的是内存地址。旨在解决同名属性碰撞问题

- `NaN` 严格不相等自己，但是 `Map` 将其视为同一键

- `size`属性

- `Map.prototype.set(key,value)`

  - 设置键名 `key` 与键值 `value`，无则插入，有则更新。

  - `Map.protorype.set`返回的是当前 Map，所以支持链式写法。

- `Map.prototype.get(key)`

  - 读取`key`对应的值，无则则返回`undefined`

- `Map.prototype.has(key)`

  - 返回布尔值，判断当前键值是否存在`Map`对象中

- `Map.prototype.delete(key)`

- `Map.prototype.clear()`

### Map 遍历方法

- `Map.prototype.keys()`：返回**键名**遍历器

- `Map.prototype.values()`：返回**键值**遍历器

- `Map.prototype.entries()`：返回**键值对**遍历器（`Map`默认遍历器接口）

- `Map.prototype.forEach()`：遍历 Map 的所有成员

  ```javascript
  const reporter = {
    report: function(key, value) {
      console.info(`key:${key}+++value${value}`);
    },
  };
  // forEach的第二个参数是一个对象，用来绑定this
  map.forEach(function(value, key, map) {
    // forEach方法的回调函数的this，就指向reporter
    this.report(key, value);
  }, reporter);
  ```

### Map 数据结构与其他数据结构转换

- `Map` 与 `Array`

  - `Map=>Array`：扩展运算符，默认调用 `Map.prototype.entries()`遍历器接口
  - `Array=>Map`：`new Map([[true, 7],[false, 8]])`，传入数组即可

- `Map` 与 `Object`

  - `Map=>Object`：`for..of` 循环 `map` 数据结构，填充到对象中
  - `Object=>Map`：`Object.entries(objData)`，返回数组

- `Map` 与 `JSON`
  - `Map=>数组 JSON`：`JSON.stringify([...mapCache])`，序列化数组
  - `Map=>对象 JSON`：同理，序列化对象即可。`map=>object=>序列化`
  - `JSON=>Map`：`new Map(JSON.parse(jsonStr))`

## Iterator

ES6 规定，默认的 `Iterator` 接口部署在数据结构的`Symbol.iterator`属性

`Iterator` 接口主要供 `for...of` 消费。

原生具备`Iterator`接口的数据结构

- `Array`
- `Map`
- `Set`
- `String`
- `TypedArray`
- 函数`arguments`对象
- `NodeList对象`

### Iterator 实现原理

Iterator 遍历原理

- 创建一个指针对象，指向数据结构的起始位置。（遍历器对象本质就是一个指针对象）
- 通过调用指针对象的 next 方法，将指针指向数据结构的下一位成员

```javascript
function makeiterator(array) {
  let nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { value: undefined, done: true };
    },
  };
}
```

### 默认 Iterator 接口

一种数据结构只要部署了 `Iterator` 接口，我们就称这种数据结构是“可遍历的”（`iterable`）。

ES6 规定，默认的 `Iterator` 接口部署在数据结构的 `Symbol.iterator` 属性

```javascript
const obj = {
  [Symbol.iterator]: function() {
    return {
      next: function() {
        return {
          value: 1,
          done: true,
        };
      },
    };
  },
};
```

### 部署 Iterator

`Object` 对象上部署 `iterator`

```javascript
let obj = {
  data: ["hello", "world"],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false,
          };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  },
};
```

`Object` 对象原型上部署 `iterator`

```javascript
class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    let val = this.value++;
    if (val < this.stop) return { done: false, value: val };
    return { done: true, value: undefined };
  }
}
function range(start, stop) {
  return new RangeIterator(start, stop);
}
for (const iterator of range(1, 8)) {
  console.info(iterator);
}
```

类似数组的对象（存在数值键名和 length 属性）

```javascript
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator]
NodeList.prototype[Symbol.iterator] = [][Symbol.iterator]
[...document.querySelectorAll('div')]
let iterable = {
  0:'a',
  1:'b',
  2:'c',
  length:3,
  [Symbol.iterator]:Array.prototype[Symbol.iterator]
}
for(let item of iterator){
  console.info(item)
}
```

### Iterator 使用场景

- 解构赋值：默认调用 Symbol.iterator
- 扩展运算符：默认调用 Symbol.iterator
- yield\*：
- 其他场景
  - for..of
  - Array.from
  - Map(),set(),WeakMap(),WeakSet()
  - Promise.all()
  - Promise.race()

### 对象遍历方法

- for..in 直接遍历对象属性
- for..of 遍历对象的 Object.keys(obj)
- Generator 包装

```javascript
function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]];
  }
}
for (let [key, value] of entries(obj)) {
  console.log(key, "->", value);
}
```

### 其他遍历语法比较

- `for` 循环
  - 最原始，代码量较大。
- `forEach`
  - 仅数组生效
  - 无法中途跳出循环（`break`、`return` 失效）
- `for...in`
  - 数组键名是 `Number`，`for...in` 以字符串作为键名。
  - 不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
  - 某些情况，`for...in` 一任意顺序遍历键名。
- `for...of`
  - `break`、`continue`、`return` 有效。
  - 提供遍历所有数据结构的统一操作接口。
