const fs = require('fs')
const os = require('os')
/**
 * @params {string} dirname
 * @return {Array}
*/
const isWindows = os.type().toLowerCase().indexOf('windows') !== -1
const getChildrenData = dirname => {
    return fs.readdirSync(dirname).reduce((pre, cur) => {
        cur = cur.substring(0, cur.length - 3)
        const gang = isWindows ? '\\' :'/'
        return pre = [...pre, {
            title: cur, path: `/${dirname.split(gang).pop()}/${cur}`
        }]
    }, [])
}

module.exports = { getChildrenData }