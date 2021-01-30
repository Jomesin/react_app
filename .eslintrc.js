module.exports = {
    root: true,
    parser: "babel-eslint",
    env: {
        browser: true,
        es2021: true,
        node: true,
        es6: true,
        jquery: true
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: ["react", "html"],
    rules: {
        indent: ["off", 4],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "no-const-assign": 2, // 禁止修改const声明的变量
        "no-delete-var": 2, // 不能对var声明的变量使用delete操作符
        "no-dupe-keys": 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
        "no-dupe-args": 2, // 函数参数不能重复
        "no-duplicate-case": 2, // switch中的case标签不能重复
        "no-empty": 2, // 块语句中的内容不能为空
        "no-empty-character-class": 2, // 正则表达式中的[]内容不能为空
        // "no-labels": 0, // 使用空label
        "no-eval": 1, // 禁止使用eval
        "no-extra-semi": 2, // 禁止多余的冒号
        "no-floating-decimal": 2, // 禁止省略浮点数中的0 .5 3.
        "no-func-assign": 2, // 禁止重复的函数声明
        "no-implied-eval": 2, // 禁止使用隐式eval
        "no-inline-comments": 0, // 禁止行内备注
        "no-invalid-regexp": 2, // 禁止无效的正则表达式
        "no-iterator": 0, // 禁止使用__iterator__ 属性
        "no-label-var": 2, // label名不能与var声明的变量名相同
        "no-multiple-empty-lines": [1, { max: 2 }], // 空行最多不能超过2行
        "arrow-parens": 1, // 箭头函数用小括号括起来
        "arrow-spacing": 1, // =>的前/后括号
        camelcase: 1, // 强制驼峰法命名
        "consistent-this": [1, "that", "vm"], // this别名
        "eol-last": 1, // 文件以单一的换行符结束
        // "keyword-spacing": [1, "always"], // 关键字后面是否要空一格
        "spaced-comment": 1, // 注释风格要不要有空格什么的
        strict: 1, // 使用严格模式
        "no-unused-vars": 1,
        "react/jsx-key": 0,
        "react/prop-types": 0,  // 防止在react组件定义中缺少props验证
        "no-empty-function": 2, // 禁止空函数
        "no-trailing-spaces": 2, // 禁止禁用行尾空格
        "no-case-declarations": 0  // 该规则禁止词法声明 (let、const、function 和 class) 出现在 case或default 子句
    }
};
