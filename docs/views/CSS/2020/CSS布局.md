---
title: CSS---布局
date: 2020-06-22
sidebar: auto
tags:
  - 响应式
categories:
  - CSS
---

## Web 总体布局

### 两种布局理念

- 响应式布局：一套界面，通过分辨率，渲染不同布局和内容
- 自适应布局：多套界面，通过分辨率，服务端返回不同布局和内容

![Web页面响应式布](/images/Web页面响应式布局大赏.png)

#### 建立响应式布局

- 媒体查询

  - 重置浏览器窗口大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面。

- PC 媒体查询

```css
/* pc width > 1024px */
body {
  background-color: yellow;
}
/* ipad pro */
@media screen and (max-width: 1024px) {
  body {
    background-color: #ff00ff;
  }
}
/* ipad */
@media screen and (max-width: 768px) {
  body {
    background-color: green;
  }
}
/* iphone6 7 8 plus */
@media screen and (max-width: 414px) {
  body {
    background-color: blue;
  }
}
/* iphoneX */
@media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 3) {
  body {
    background-color: #0ff000;
  }
}
/* iphone6 7 8 */
@media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 2) {
  body {
    background-color: #0ff000;
  }
}
/* iphone5 */
@media screen and (max-width: 320px) {
  body {
    background-color: #0ff000;
  }
}
```

- 移动端媒体查询

```css
<style>
      /* iphone6 7 8 */
      body {
        background-color: yellow;
      }
      /* iphone 5 */
      @media screen and (max-width: 320px) {
        body {
          background-color: red;
        }
      }
      /* iphoneX */
      @media screen and (min-width: 375px) and (-webkit-device-pixel-ratio: 3) {
        body {
          background-color: #0ff000;
        }
      }
      /* iphone6 7 8 plus */
      @media screen and (min-width: 414px) {
        body {
          background-color: blue;
        }
      }
      /* ipad */
      @media screen and (min-width: 768px) {
        body {
          background-color: green;
        }
      }
      /* ipad pro */
      @media screen and (min-width: 1024px) {
        body {
          background-color: #ff00ff;
        }
      }
      /* pc */
      @media screen and (min-width: 1100px) {
        body {
          background-color: black;
        }
      }
    </style>
```

- 百分比布局
  - 通过百分比单位，元素组件的宽和高随着浏览器的高度的变化而变化，从而实现响应式的效果。
  - `Bootstrap`里面的栅格系统就是利用百分比来定义元素的宽高。
  - `CSS3`支持最大最小高，可以将百分比和`max(min)`一起结合使用来定义元素在不同设备下的宽高。
  - ![CSS中子元素的百分比相对参考准则](/images/CSS中子元素的百分比相对参考准则.png)
  - 百分比布局自身问题
    - 计算困难，设计稿，必须换算成百分比单位。
    - 不同属性相对参考不同，使用百分比单位容易使布局问题变得复杂。
- `rem` 布局
  - `REM` 是 `CSS3` 新增的单位，并且移动端的支持度很高，Android2.x+,ios5+都支持。
  - `rem` 单位都是**相对于根元素 `html` 的 `font-size` 来决定大小**的,根元素的 `font-size` 相当于提供了一个基准。
  - 当页面的 `size` 发生变化时，只需要改变 `font-size` 的值，那么以 `rem` 为固定单位的元素的大小也会发生响应的变化。
  - 因此，如果通过 `rem` 来实现响应式的布局，只需要根据视图容器的大小，动态的改变 `font-size` 即可（而 `em` 是相对于父元素的）。
- REM 布局
  ```css
  <style>
      /* pc width > 1100px */
      html {
        font-size: 100%;
      }
      body {
        background-color: yellow;
        font-size: 1.5rem;
      }
      /* ipad pro */
      @media screen and (max-width: 1024px) {
        body {
          background-color: #ff00ff;
          font-size: 1.4rem;
        }
      }
      /* ipad */
      @media screen and (max-width: 768px) {
        body {
          background-color: green;
          font-size: 1.3rem;
        }
      }
      /* iphone6 7 8 plus */
      @media screen and (max-width: 414px) {
        body {
          background-color: blue;
          font-size: 1.25rem;
        }
      }
      /* iphoneX */
      @media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 3) {
        body {
          background-color: #0ff000;
          font-size: 1.125rem;
        }
      }
      /* iphone6 7 8 */
      @media screen and (max-width: 375px) and (-webkit-device-pixel-ratio: 2) {
        body {
          background-color: #0ff000;
          font-size: 1rem;
        }
      }
      /* iphone5 */
      @media screen and (max-width: 320px) {
        body {
          background-color: #0ff000;
          font-size: 0.75rem;
        }
      }
    </style>
  ```
- 视口单位
  - 百分比单位大部分相对于祖先元素
  - `vw/vh` 相对于**视窗的尺寸**
  - | 单位 | 含义                                                        |
    | ---- | ----------------------------------------------------------- |
    | vw   | 相对于视窗的宽度，1vw 等于视口宽度的 1%，即视窗宽度是 100vw |
    | vh   | 相对于视窗的高度，1vh 等于视口高度的 1%，即视窗高度是 100vh |
    | vmin | vw 和 vh 中的较小值                                         |
    | vmax | vw 和 vh 中的较大值                                         |
- 图片响应式
  - 设备屏幕分辨率改变，图片不会出现压缩、拉伸的情况（大小自适应）
  - 根据不同的屏幕分辨率和设备像素比来尽可能选择高分辨率的图片，也就是当在小屏幕上不需要高清图或大图，这样我们用小图代替，就可以减少网络带宽了。
  - 图片响应式三种方法
  ```html
  <style>
    .mod_banner {
      max-width: 750px;
      margin: 0 auto;
    }
    .mod_banner .figure {
      box-sizing: border-box;
      padding-top: 62.5%;
      background-image: url("../../images/Object.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    @media screen and (max-width: 767px) {
      /* .mod_banner .figure {
          background-image: url("../../images/CSS属性选择器.png");
        } */
    }
    .mod_banner img {
      display: inline-block;
      max-width: 100%;
      height: auto;
    }
  </style>
  <body>
    <div class="mod_banner">
      <div class="figure"></div>
      <img src="../../images/Object.png" alt="" />
      <img
        srcset="
          ../../images/CSS元素选择器.png 1x,
          ../../层叠样式表优先级策略.png      2x
        "
        src="../../images/CSS主要部分初略图.png"
        alt=""
      />
    </div>
  </body>
  ```

#### 响应式布局方案

- 利用上面的方法自己来实现，比如 CSS3 Media Query,rem，vw 等
- Flex 弹性布局，兼容性较差
- Grid 网格布局，兼容性较差
- Columns 栅格系统，往往需要依赖某个 UI 库，如 Bootstrap

#### 响应式布局要点

- 设置 viewport
- 媒体查询
- 字体适配（rem 单位）
- 百分比布局
- 图片适配
- 结合 flex、grid、BFC、栅格系统

## 参考资料

- [前端响应式布局原理与方案（详细版）](https://juejin.im/post/5caaa230e51d452b672f9703#heading-5)

- [物理像素与 css 像素](https://github.com/hijiangtao/hijiangtao.github.io/blob/master/_posts/2017-07-08-Device-Viewport-and-Pixel-Introduction.md)

- [响应式布局的常用解决方案对比(媒体查询、百分比、rem 和 vw/vh）](https://juejin.im/post/5b39905351882574c72f2808#heading-7)

- [媒体查询 - PX,EM or REM?](https://juejin.im/entry/5704a9f25bbb500051d79e41)
