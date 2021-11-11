const Common = {
    /**
     * @description 根据传入的key获取url上带的参数对应的值
     * @param k 链接对应的key
     * @param query 需要从哪些字符串查询，默认为url上的参数
     * @param seperator 默认分隔符&
     */
    getQueryParam: (k: string, query?: string, seperator = '&'): any  => {
    const param: any = {}
    const queryStr = query || window.location.search.substring(1)
    const arr = queryStr.split(seperator || '&')
  
    for (const i of arr) {
      const tem: any = i.match(/^\s*([%\w]+)=(.*)[#]?$/)
      try {
        param[tem[1]] = decodeURIComponent(tem[2])
      } catch (e) {
        window.console.log(JSON.stringify(e))
      }
    }
    return k ? param[k] : param
  }
}

export default Common
