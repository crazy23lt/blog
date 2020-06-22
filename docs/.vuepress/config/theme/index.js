// 导航栏
const nav = require('./nav')
// 侧边栏
const sidebar = require('./sidebar')
// 评论区域
const valineConfig = require('./valineConfig')
const themeConfig = {
  type: 'blog',
  huawei: false,
  nav,
  // 博客设置
  blogConfig: {
    category: {
      location: 2, // 在导航栏菜单中所占的位置，默认2
      text: '分类' // 默认 “分类”
    },
    tag: {
      location: 3, // 在导航栏菜单中所占的位置，默认3
      text: '标签' // 默认 “标签”
    }
  },
  logo: '/head2.jpg',
  // 搜索设置
  search: true,
  searchMaxSuggestions: 10,
  // 自动形成侧边导航
  sidebarDepth: 1,
  displayAllHeaders: false,
  sidebar,
  // 最后更新时间
  lastUpdated: 'Last Updated',
  // 作者
  author: 'mrliu',
  authorAvatar: '/head2.jpg',
  // 项目开始时间
  startYear: '2020'
}
module.exports = themeConfig