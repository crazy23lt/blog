const head = require('./config/head')
const markdown = require('./config/markdown')
const plugins = require('./config/plugins')
const themeConfig = require('./config/theme')
module.exports = {
  base: /blog/,
  repo: 'https://github.com/crazy23lt/blog.git',
  repoLabel: 'My GitHub',
  theme: 'reco',  // 引用主题
  title: "Web学习之路", // 网站的标题
  description: '生命以负熵为食',  // 网站描述
  // 被注入页面 HTML <head> 额外的标签
  head,
  // 为使用的主题提供配置选项
  themeConfig,
  markdown,
  // 插件
  plugins
}  