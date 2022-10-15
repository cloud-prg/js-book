const fs = require('fs')

/**
 * @params {string} dirname
 * @return {Array}
*/
const getChildrenData = dirname => {
    return fs.readdirSync(dirname).reduce((pre, cur) => {
        cur = cur.substring(0, cur.length - 3)
        return pre = [...pre, {
            title: cur, path: `/${dirname.split('\\').pop()}/${cur}`
        }]
    }, [])
}

module.exports = { getChildrenData }