/**
 * @description 检查参数有效性，根据约定，参数中不得包含 undefined、null、空字符串、NaN 或 Infinity，以免 native 闪退
 * @param params
 * @returns
 */
function checkParamsAvailable(params: any): boolean {
    let result = true
    Object.keys(params).forEach((key) => {
        if (
            params[key] === undefined ||
            params[key] === null ||
            params[key] === '' ||
            Number.isNaN(params[key] || params[key] === Infinity)
        ) {
            result = false
        }
    })
    return result
}

/**
 * @description 转换对象为请求参数
 * @param {any} obj 请求对象
 * @returns {string} 请求参数
 */
function convertObjectToQuery(obj: any): string {
    if (obj) {
        const queryList: Array<string> = []
        Object.keys(obj).forEach((key) => {
            queryList.push(`${key}=${encodeURIComponent(obj[key])}`)
        })
        if (queryList.length > 0) {
            return `?${queryList.join('&')}`
        }
    }
    return ''
}

/**
 * @description 检查参数是否为对象
 * @param {any} obj
 * @return {boolean} 返回该参数是否为对象的校验结果
 */
function isObject(obj: any): boolean {
    if (typeof obj !== 'object') {
        return false
    }
    if (obj === null || Array.isArray(obj)) {
        return false
    }
    return true
}

export default {
    checkParamsAvailable,
    convertObjectToQuery,
    isObject,
}
