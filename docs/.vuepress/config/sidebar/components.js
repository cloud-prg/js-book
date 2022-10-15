const dir = require('path').resolve(__dirname,'../../../components')
const { getChildrenData } = require('../../utils/index')

module.exports =    {
    title: "组件实现",
    path: "/components/树形控件的简单实现",
    collapsable: true, //是否折叠
    children: getChildrenData(dir)
  }