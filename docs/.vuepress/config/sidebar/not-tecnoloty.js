const dir = require('path').resolve(__dirname,'../../../not-tecnology')
const { getChildrenData } = require('../../utils/index')
module.exports = {
    title: "非技术部分",
    path: "/not-tecnology/第一年总结",
    collapsable: true, //是否折叠
    children: getChildrenData(dir)
}