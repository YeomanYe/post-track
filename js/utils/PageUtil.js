import React from 'react';
export default class PageUtil{
    static bindFun(self) {
        let proto = self.constructor.prototype,
            arr = Object.getOwnPropertyNames(proto),
            excludeFunArr = ['constructor','componentWillUnmount','componentDidMount','render',];
        for (let i=0,len=arr.length;i<len;i++) {
            let key = arr[i];
            if (excludeFunArr.indexOf(key) < 0 && (proto[key] instanceof Function))
                self[key] = proto[key].bind(self);
        }
    }

    /**
     * 格式化href
     * @param href
     */
    static formatHref(href, baseHref) {
        let retHref;
        let index = href.search('^https?://');
        if (index < 0) {
            //如果href不是http打头，那么应该为 //www.xx.com/dd 这样的形式
            if (!baseHref) retHref = 'http:' + href;
            else {
                href = baseHref + href;
                index = href.search('^https?://');
                if (index < 0) retHref = 'http:' + href;
                else retHref = href;
            }
        } else {
            retHref = href;
        }
        return retHref;
    }
}
