const dir = require('path').resolve(__dirname,'../../../book')
const { getChildrenData } = require('../../utils/index')

module.exports = {
  title: "博客",
  path: "/book/Memorize",
  collapsable: true, //是否折叠
  children: getChildrenData(dir)
}