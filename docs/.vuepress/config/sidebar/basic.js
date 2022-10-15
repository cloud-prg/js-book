const dir = require('path').resolve(__dirname,'../../../basic')
const { getChildrenData } = require('../../utils/index')

console.log(getChildrenData(dir))
module.exports = {
    title: "基础巩固",
    path: "/basic/前言",
    collapsable: true, //是否折叠
    children: getChildrenData(dir)
}