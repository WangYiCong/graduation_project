import { HTTP } from '../common/request';

class KeywordModel extends HTTP {
    constructor(key, maxLength) {
        super();
        this.key = key;
        this.maxLength = maxLength;
    }
    getHistory(){
        const words = wx.getStorageSync(this.key);
        if(!words){
            return []
        }
        return words;
    }

    getHot(){
       return this.request({
           url:'book/hot_keyword'
       }) 
    }

    addToHistory(keyword){
        let words = this.getHistory();
        const has = words.includes(keyword);
        // 队列 栈
        if(!has){
            // 数组末尾 删除 ， keyword 数组第一位
            const length = words.length;
            if (length >= this.maxLength){
                words.pop();
            }
            words.unshift(keyword);
            wx.setStorageSync(this.key, words);
        }
    }    
}

export {
    KeywordModel
}