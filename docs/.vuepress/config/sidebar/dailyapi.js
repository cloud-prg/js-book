const dir = require('path').resolve(__dirname,'../../../dailyapi')
const { getChildrenData } = require('../../utils/index')

module.exports =  {
    title: "手写API",
    path: "/dailyapi/手写一个ajax",
    collapsable: true, //是否折叠
    children: getChildrenData(dir)
  }