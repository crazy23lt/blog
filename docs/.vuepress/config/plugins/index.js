const BgMusic = require('./BgMusic')
const KanBanNiang = require('./KanBanNiang')
const plugins = [

  // pwa 技术 需要单独了解
  [
    '@vuepress/pwa',
    {
      serviceWorker: true,
      updatePopup: {
        message: "发现新内容可用",
        buttonText: "刷新"
      }
    }
  ]
]
module.exports = plugins

/*
[
    KanBanNiang,
    {
      theme: ['blackCat'],
      width: 200,
      height: 470,
      modelStyle: {
        position: 'fixed',
        right: '110px',
        bottom: '50px',
        opacity: '0.9'
      },
      messageStyle: {
        position: 'fixed',
        right: '110px',
        bottom: '370px'
      },
      btnStyle: {
        bottom: '60px',
        right: '80px'
      }
    }
  ],
  // 背景音乐
  [
    BgMusic,
    {
      audios: [
        {
          name: '能够成家吗',
          artist: '咖啡少年',
          url: 'https://assets.smallsunnyfox.com/music/1.mp3',
          cover: 'https://assets.smallsunnyfox.com/music/1.jpg'
        },
        {
          name: '江南地铁站4号出口',
          artist: 'Plastic / Fallin` Dild',
          url: 'https://assets.smallsunnyfox.com/music/2.mp3',
          cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
        },
        {
          name: '用胳膊当枕头',
          artist: '최낙타',
          url: 'https://assets.smallsunnyfox.com/music/3.mp3',
          cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
        }
      ]
    }
  ]
  ,
  */