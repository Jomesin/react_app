class Storage {
    constructor(name) {
        this.name = name;
    }

    setItem (params) {  // 设置缓存
        let obj = {
            name: "",
            value: "",
            expires: "",
            starTime: new Date().getTime()  // 记录何时将值存入缓存,单位毫秒
        };

        let options = {};
        // 将obj和params合并到options里去
        Object.assign(options, obj, params);

        if (options.expires) {
            // 如果options.expires设置了的话
            // 以options.name为key, options为值放进去
            localStorage.setItem(options.name, JSON.stringify(options));
        } else {
            // 如果option.expires没有设置, 就判断一下value的类型
            let type = Object.prototype.toString.call(options.value);
            // 如果value是对象或者数组对象的类型,就先用JSON.stringify转一下,再存进去
            if (type == "[object Object]" || type == "[object Array]") {
                options.value = JSON.stringify(options.value);
            }
            localStorage.setItem(options.name, options.value);
        }
    }

    getItem (name) {  // 获取缓存
        let oldItem = localStorage.getItem(name);
        let newItem = "";
        // 先将拿到的试着进行json转为对象的形式
        try {
            newItem = JSON.parse(oldItem);
        } catch (error) {
            // 如果不行就不是json的字符串,就直接返回
            newItem = oldItem;
        }
        if (newItem) {
            // 如果有starTime的值,说明设置了失效时间
            if (newItem.starTime) {
                let date = new Date().getTime();
                // 何时将值去除减去刚存入的时间,与item.expires比较,如果大于就是过期了,如果小于或等于就还没过期
                if (date - newItem.starTime > newItem.expires) {
                    // 缓存过期, 清除缓存, 返回false
                    localStorage.removeItem(name);
                    return null;
                } else {
                    // 缓存未过期, 返回值
                    return newItem.value;
                }
            } else {
                // 如果没有设置失效时间, 直接返回值
                return newItem;
            }
        } else {
            return null;
        }
    }

    // 移出缓存
    removeItem (name) {
        localStorage.removeItem(name);
    }

    // 移出全部缓存
    clear () {
        localStorage.clear();
    }
}


export default Storage;
