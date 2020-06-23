/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "4e983436e6e1ee97abe0a46495d38f9d"
  },
  {
    "url": "about/index.html",
    "revision": "9322294ffff726d533bb40df62f746d7"
  },
  {
    "url": "assets/css/0.styles.f6fc169d.css",
    "revision": "7c164cf008a18f481689120f3d964085"
  },
  {
    "url": "assets/img/home-bg.7b267d7c.jpg",
    "revision": "7b267d7ce30257a197aeeb29f365065b"
  },
  {
    "url": "assets/js/1.ba1ea6f6.js",
    "revision": "43cb5793538fcfeebd73741c6b469fc5"
  },
  {
    "url": "assets/js/10.4f518997.js",
    "revision": "8ea7daa619455a6f8cf2d635fe63e5fc"
  },
  {
    "url": "assets/js/11.495071cc.js",
    "revision": "47f82fa69d2f48972e7ac7094ec21977"
  },
  {
    "url": "assets/js/12.95755a32.js",
    "revision": "98e30039b2ec10aa6463f24046e919cb"
  },
  {
    "url": "assets/js/13.3589ec2e.js",
    "revision": "7be4a552767340e7e5c0a1c3bbe7635a"
  },
  {
    "url": "assets/js/14.c9f3fb1f.js",
    "revision": "ccb811dae29e2b4ca8af6053c4bd77d1"
  },
  {
    "url": "assets/js/15.3ef33a5a.js",
    "revision": "20c7c4634012a2ab68b146c5ca9760bf"
  },
  {
    "url": "assets/js/16.30273d00.js",
    "revision": "0dc03ff2cdccefa210199ed63e53bcea"
  },
  {
    "url": "assets/js/17.4451a9c9.js",
    "revision": "9c0a8c4bd018cbcc6f1aca8e6a10d75d"
  },
  {
    "url": "assets/js/18.a7bd82ad.js",
    "revision": "b588ef002e1fa6f3a813d2ccd20bd40c"
  },
  {
    "url": "assets/js/19.aa446afd.js",
    "revision": "d5c6602df186cd254293547227df8f86"
  },
  {
    "url": "assets/js/20.69ecbbe8.js",
    "revision": "b3858b0729331c746acfa8de8ac67e88"
  },
  {
    "url": "assets/js/21.2e5502b0.js",
    "revision": "4b3d9b6a835b814885cc091348369db7"
  },
  {
    "url": "assets/js/22.1387cf80.js",
    "revision": "85d0b044fb0c168dd50a406c81d8aca5"
  },
  {
    "url": "assets/js/23.645bc28c.js",
    "revision": "f86654b01b4a34a121bfa74000e871a2"
  },
  {
    "url": "assets/js/24.8698c72c.js",
    "revision": "0e5ea8bd9ca215ef9e35b03fbaafe73f"
  },
  {
    "url": "assets/js/25.0bb9cc61.js",
    "revision": "e490f1a54c376337720328ad9b3ad844"
  },
  {
    "url": "assets/js/26.836bec31.js",
    "revision": "dfdf4062192aa3f895fb40591929c964"
  },
  {
    "url": "assets/js/27.92699577.js",
    "revision": "17f59b9691a45781aedf7179008d478f"
  },
  {
    "url": "assets/js/28.1334f294.js",
    "revision": "d53a98f503c1fe0d2c8f4fcc1137ca72"
  },
  {
    "url": "assets/js/29.4f526c5f.js",
    "revision": "5ecaa7a43913c3099d6d1349986a1326"
  },
  {
    "url": "assets/js/3.60e83559.js",
    "revision": "c1c4803d7271f6a31402e20e3b5fed60"
  },
  {
    "url": "assets/js/30.6fe640c9.js",
    "revision": "dc897bb99fa3eba85aa5beccfc8c1442"
  },
  {
    "url": "assets/js/31.eafa12c3.js",
    "revision": "e57565c5dc94042f12dea2cdb036e2d4"
  },
  {
    "url": "assets/js/32.0687af08.js",
    "revision": "a933c0bcc88687c5dd404eaa6b6c2854"
  },
  {
    "url": "assets/js/33.2cc09c29.js",
    "revision": "55be5f7f91660a74df61fa435321494b"
  },
  {
    "url": "assets/js/34.4e80d4d3.js",
    "revision": "2788cd6ddf11d19af98d79dcdc2a16ce"
  },
  {
    "url": "assets/js/35.4069690c.js",
    "revision": "a190fb7f6654e14bb8494a35e347148f"
  },
  {
    "url": "assets/js/36.6901cf51.js",
    "revision": "6a025989a185682fdcdb42a4910800d6"
  },
  {
    "url": "assets/js/4.7c656f0d.js",
    "revision": "db2ad4437301fbe649b6b695b971d4fc"
  },
  {
    "url": "assets/js/5.a42b12a7.js",
    "revision": "95c71c1a6cae2f068e081d7b3b9b7517"
  },
  {
    "url": "assets/js/6.4dca2098.js",
    "revision": "b723d93d063fc56ff13ad7e36ea59af1"
  },
  {
    "url": "assets/js/7.b1e512e3.js",
    "revision": "615b43481ff68449cef53d3404c86dc4"
  },
  {
    "url": "assets/js/8.3d19da94.js",
    "revision": "eddaf52b1ec96bcbd8fdd28eccd41047"
  },
  {
    "url": "assets/js/9.67c39010.js",
    "revision": "263cfc49f3ac7cbb575431b9b1f525b6"
  },
  {
    "url": "assets/js/app.40113c42.js",
    "revision": "6bb19ad1d3ae1b35637e9759ca14429f"
  },
  {
    "url": "bg.png",
    "revision": "4c0e65add60e0d7129cb39c3cc0ab574"
  },
  {
    "url": "categories/编程算法/index.html",
    "revision": "6d778de644b9e9799e359e73e2f63143"
  },
  {
    "url": "categories/浏览器/index.html",
    "revision": "d66c1fb66fe34b59a9519591046ac171"
  },
  {
    "url": "categories/CSS/index.html",
    "revision": "208d45efb876635ef1ca6bcd130f3051"
  },
  {
    "url": "categories/HTML/index.html",
    "revision": "a15e382a134c6029df0228c11b0e6864"
  },
  {
    "url": "categories/index.html",
    "revision": "2c9591d02b0767014354411527f54dc9"
  },
  {
    "url": "categories/JavaScript/index.html",
    "revision": "6e06fbf26ba0f50ded4c027ef8efec8a"
  },
  {
    "url": "categories/web开发/index.html",
    "revision": "6a6548e5007778913bf0e0082415023a"
  },
  {
    "url": "head2.jpg",
    "revision": "9a96039b9d937e763eba78d8690fe8a6"
  },
  {
    "url": "head2.png",
    "revision": "fee2a218b075e5e09f4bd9d9e8450e1a"
  },
  {
    "url": "icons/cat128.png",
    "revision": "a5c5942bcb1a10affff8c4029383fa79"
  },
  {
    "url": "icons/cat16.png",
    "revision": "1aec0693ff6e320c0adedf185806b1ab"
  },
  {
    "url": "icons/cat48.png",
    "revision": "231db9fe2dd479a3aac7da8194bb9fd5"
  },
  {
    "url": "icons/LatteAndCat.png",
    "revision": "a5c5942bcb1a10affff8c4029383fa79"
  },
  {
    "url": "icons/LatteAndCat.svg",
    "revision": "ec9380aaccc3ef15b7150505a7c5f524"
  },
  {
    "url": "images/标准文档流.png",
    "revision": "4f291600c17c7981f0d00a65f081ebd1"
  },
  {
    "url": "images/层叠样式表优先级策略.png",
    "revision": "4676460eb8aa472481dd95148aef6e85"
  },
  {
    "url": "images/浏览器解析URL.jpg",
    "revision": "39ed629d827617d0f374faa147dc2870"
  },
  {
    "url": "images/样式继承规则.png",
    "revision": "8906268c3348f868f52f67d97374a855"
  },
  {
    "url": "images/元素布局模式.png",
    "revision": "c2ad11d8044767b1e16c340e6f5b5d44"
  },
  {
    "url": "images/CSS关系选择器.png",
    "revision": "7de72e849070469c2ac8bbb2ef538012"
  },
  {
    "url": "images/CSS属性选择器.png",
    "revision": "f5d8f3e5f6ea1661b1ac1df164e86cc8"
  },
  {
    "url": "images/CSS四类选择器.png",
    "revision": "cec3f10bf67c221c90d4e3a5afa46a68"
  },
  {
    "url": "images/CSS伪选择器1.png",
    "revision": "39bc48fc55eac0634adc4bed0be29f9a"
  },
  {
    "url": "images/CSS元素选择器.png",
    "revision": "09c8ee0490ea7677e78159d161702a02"
  },
  {
    "url": "images/CSS中子元素的百分比相对参考准则.png",
    "revision": "86d1176db9debd5f420cfb443a8d4469"
  },
  {
    "url": "images/CSS主要部分初略图.png",
    "revision": "7ee64c1ce07f0c41465ee4d844ab5612"
  },
  {
    "url": "images/dom和bom的联系.png",
    "revision": "e0d9f1d401986f9cd32bf7abd29598ec"
  },
  {
    "url": "images/DOMAPI.png",
    "revision": "1c374bab0ae8e98be259c3dae1f444c4"
  },
  {
    "url": "images/Event-loop.png",
    "revision": "da078fa3eadf3db4bf455904ae06f84b"
  },
  {
    "url": "images/html5-layout.jpg",
    "revision": "380904a0376926e5757e018477a55362"
  },
  {
    "url": "images/Object.png",
    "revision": "443dc2ef048ae0631ac606dd68fbcddc"
  },
  {
    "url": "images/Position定位.png",
    "revision": "67991ae792942b3a943d594f87808ae3"
  },
  {
    "url": "images/Web页面响应式布局大赏.png",
    "revision": "80032175aa81b88730622178caeb7948"
  },
  {
    "url": "index.html",
    "revision": "523d3ca9c5487a7ce70b6fd442918a38"
  },
  {
    "url": "knowledge_system/algorithm/排序算法.html",
    "revision": "3213fc3222971f309f8d59f9c11afc1f"
  },
  {
    "url": "knowledge_system/web_design _patterns/web八种设计模式.html",
    "revision": "f6110c56eabafe84ec509c8484002d5b"
  },
  {
    "url": "pg4.png",
    "revision": "0bda5fbe6a6d5730fc73c584451934cd"
  },
  {
    "url": "star.png",
    "revision": "d58c2c2e1655abbdbf4fb891b37361e6"
  },
  {
    "url": "tag/跨域/index.html",
    "revision": "eb03f7b779a6fc76897180fd9ee84f51"
  },
  {
    "url": "tag/排序/index.html",
    "revision": "b9994a5415a154a3d2a68086fed2a42b"
  },
  {
    "url": "tag/设计模式/index.html",
    "revision": "82392bfd5c0e61d9b1fd444f751132c1"
  },
  {
    "url": "tag/数据类型/index.html",
    "revision": "ea7d97cf7354f3b8eefb47422c81713b"
  },
  {
    "url": "tag/响应式/index.html",
    "revision": "8226c57cda3ce3975863d942c89278a7"
  },
  {
    "url": "tag/异步编程/index.html",
    "revision": "b88097051b5384fa2297b5a1fd0962cd"
  },
  {
    "url": "tag/语义化/index.html",
    "revision": "00c5a7380252996081a06bb965d5acaa"
  },
  {
    "url": "tag/原型与继承/index.html",
    "revision": "43ff307b03b5061ff32dfb799328558c"
  },
  {
    "url": "tag/ajax/index.html",
    "revision": "db12286093e8a55c432a42557618f93b"
  },
  {
    "url": "tag/BOM/index.html",
    "revision": "3636da2a457056b23454e112b0c5dc4d"
  },
  {
    "url": "tag/CSS/index.html",
    "revision": "f6d1eab4d30c0f169655494360893827"
  },
  {
    "url": "tag/CSS定位/index.html",
    "revision": "c0ee7018c4212061fa3f6583134d033f"
  },
  {
    "url": "tag/CSS伪元素/伪类/index.html",
    "revision": "208d8476a823604cf65dabb41ed3261b"
  },
  {
    "url": "tag/CSS选择器/index.html",
    "revision": "49cf08089b1d21ff1cd743560b94f2f5"
  },
  {
    "url": "tag/CSS样式继承/index.html",
    "revision": "577fa6c8f5d58bef2dd6910b23e810b0"
  },
  {
    "url": "tag/DOM/index.html",
    "revision": "056bcc51146aae72cc94ff2c3400e914"
  },
  {
    "url": "tag/ES6数据结构/index.html",
    "revision": "2ad8043fa6584368296b928e25dec7ec"
  },
  {
    "url": "tag/filter滤镜/index.html",
    "revision": "1a332ea444b446bebf9b6a20ebb52dca"
  },
  {
    "url": "tag/index.html",
    "revision": "18ab1e74e3dfa01d23cf546cafca0d1f"
  },
  {
    "url": "tag/JS编译/index.html",
    "revision": "23f50b7470df18b321a6f076f15a4d6c"
  },
  {
    "url": "tag/this指向/index.html",
    "revision": "3eebf8025a5a8124f12cfb6c96e7faca"
  },
  {
    "url": "tag/transform/index.html",
    "revision": "f3d45a6997d89a43b725b14e932c2720"
  },
  {
    "url": "tag/V8引擎/index.html",
    "revision": "6946eee0a608a5ca57fbe4e070515989"
  },
  {
    "url": "timeline/index.html",
    "revision": "20ba6a53f6b316b4934f7b53ae27afd1"
  },
  {
    "url": "views/browser/2020/JS引擎工作机制.html",
    "revision": "22834d579c6f39479fab27d50f786dcf"
  },
  {
    "url": "views/CSS/2020/CSS---filter.html",
    "revision": "83263a4ae630305958acefb49d88a031"
  },
  {
    "url": "views/CSS/2020/CSS布局.html",
    "revision": "9d5a307fffc9a48232ff89ee14243d1a"
  },
  {
    "url": "views/CSS/2020/CSS层叠样式表.html",
    "revision": "49fef8a4384c6f64342a235f5510beb3"
  },
  {
    "url": "views/CSS/2020/CSS定位.html",
    "revision": "b1b3e17f7887a076d82331ea717de319"
  },
  {
    "url": "views/CSS/2020/CSS媒体查询.html",
    "revision": "8055b82a8806e3dc0c5d6f80b858f71b"
  },
  {
    "url": "views/CSS/2020/CSS伪元素与伪类.html",
    "revision": "c3f4aa5f3fe09af5861bae71b437a691"
  },
  {
    "url": "views/CSS/2020/CSS选择器.html",
    "revision": "c842b3f04a3f1a227203234d0106ed8d"
  },
  {
    "url": "views/CSS/2020/CSS样式继承.html",
    "revision": "a0b15f6a7dd47d762b9e66083d486507"
  },
  {
    "url": "views/CSS/2020/Transform&Animation.html",
    "revision": "2ec49a8fac43aeaf69b016d0a1fa24e6"
  },
  {
    "url": "views/HTML/2020/HTML5---语义化标签.html",
    "revision": "40c2875ec596c9b144325c2b6cffa95e"
  },
  {
    "url": "views/JavaScript/2020/关于JS跨域.html",
    "revision": "3830f178f969054bf29577a54b276238"
  },
  {
    "url": "views/JavaScript/2020/ajax、fetch、axios.html",
    "revision": "a905153fd1731d885da8fec3051efadf"
  },
  {
    "url": "views/JavaScript/2020/BOM与DOM.html",
    "revision": "ae7dbe6aa1977f046de1e55168f646f0"
  },
  {
    "url": "views/JavaScript/2020/JS编译原理.html",
    "revision": "b6dd55a1e4d3925ca17c27dd7299bd4d"
  },
  {
    "url": "views/JavaScript/2020/JS数据类型.html",
    "revision": "6f9304b0c8080361724df7b18e04e118"
  },
  {
    "url": "views/JavaScript/2020/JS异步编程.html",
    "revision": "25130eae499bdb1e78fafa4dada7c5d1"
  },
  {
    "url": "views/JavaScript/2020/JS原型与继承.html",
    "revision": "e1f826ce03aa276783e86e70f64bbd43"
  },
  {
    "url": "views/JavaScript/2020/Set和Map数据结构.html",
    "revision": "be8160ced8198ca3e3f984c35483bc89"
  },
  {
    "url": "views/JavaScript/2020/this指向问题.html",
    "revision": "678b808f50f5e46b6d3bf54fe5f62c1b"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
