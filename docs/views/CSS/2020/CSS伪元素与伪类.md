---
title: CSS---伪元素/伪类
date: 2020-06-22
sidebar: auto
tags:
  - CSS伪元素/伪类
categories:
  - CSS
---

## 伪类伪元素

**_伪元素_**

- _`：：before`，`：：after`，`：：first-letter`，`：：first-line` 等等_

**CSS3 明确规定，伪类使用一个冒号（：），伪元素使用两个冒号（：：）**

### **_伪类实例：表单校验伪类应用_**

- _`:required`-----指定 required 属性的表单元素_
- _`:valid`-----匹配指定要求的表单元素_
- _`:invalid`-----不匹配指定要求的表单元素_

```html
<style>
      form {
        font: 1em sans-serif;
        max-width: 320px;
      }

      p > label {
        display: block;
      }

      input[type="text"],
      input[type="email"],
      input[type="number"],
      textarea,
      fieldset {
        width: 100%;
        border: 1px solid #333;
        box-sizing: border-box;
      }

      input:invalid {
        box-shadow: 0 0 5px 1px red;
      }

      input:focus:invalid {
        box-shadow: none;
      }
    </style>
<body>
    <form>
      <p>
        <fieldset>
          <legend>Do you have a driver's license?<abbr title="This field is mandatory" aria-label="required">*</abbr></legend>
          <!-- While only one radio button in a same-named group can be selected at a time,
               and therefore only one radio button in a same-named group having the "required"
               attribute suffices in making a selection a requirement -->
          <input type="radio" required name="driver" id="r1" value="yes"><label for="r1">Yes</label>
          <input type="radio" required name="driver" id="r2" value="no"><label for="r2">No</label>
        </fieldset>
      </p>
      <p>
        <label for="n1">How old are you?</label>
        <!-- The pattern attribute can act as a fallback for browsers which
             don't implement the number input type but support the pattern attribute.
             Please note that browsers that support the pattern attribute will make it
             fail silently when used with a number field.
             Its usage here acts only as a fallback -->
        <input type="number" min="12" max="120" step="1" id="n1" name="age"
               pattern="\d+">
      </p>
      <p>
        <label for="t1">What's your favorite fruit?<abbr title="This field is mandatory" aria-label="required">*</abbr></label>
        <input type="text" id="t1" name="fruit" list="l1" required
               pattern="[Bb]anana|[Cc]herry|[Aa]pple|[Ss]trawberry|[Ll]emon|[Oo]range">
        <datalist id="l1">
          <option>Banana</option>
          <option>Cherry</option>
          <option>Apple</option>
          <option>Strawberry</option>
          <option>Lemon</option>
          <option>Orange</option>
        </datalist>
      </p>
      <p>
        <label for="t2">What's your e-mail address?</label>
        <input type="email" id="t2" name="email">
      </p>
      <p>
        <label for="t3">Leave a short message</label>
        <textarea id="t3" name="msg" maxlength="140" rows="5"></textarea>
      </p>
      <p>
        <button>Submit</button>
      </p>
    </form>
  </body>
```

### 折叠面板（:target）实现

```html
<style>
  p:target {
    background-color: gold;
  }

  /* 在目标元素中增加一个伪元素*/
  p:target::before {
    font: 70% sans-serif;
    content: "►";
    color: limegreen;
    margin-right: 0.25em;
  }

  /*在目标元素中使用italic样式*/
  p:target i {
    color: red;
  }
</style>
<body>
  <h3>Table of Contents</h3>
  <ol>
    <li><a href="#p1">Jump to the first paragraph!</a></li>
    <li><a href="#p2">Jump to the second paragraph!</a></li>
    <li>
      <a href="#nowhere"
        >This link goes nowhere, because the target doesn't exist.</a
      >
    </li>
  </ol>

  <h3>My Fun Article</h3>
  <p id="p1">
    You can target <i>this paragraph</i> using a URL fragment. Click on the link
    above to try out!
  </p>
  <p id="p2">
    This is <i>another paragraph</i>, also accessible from the links above.
    Isn't that delightful?
  </p>
</body>
```

## 参考资料

- [[愣锤笔记]你真的了解什么是伪类和伪元素吗](https://juejin.im/post/5ca22bae6fb9a05e1e523a5d#heading-2)

- [CSS 参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference)
