/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2021-11-11 15:11:11
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-02-22 22:54:13
 */
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat', // 新功能（feature）
                'fix', // 修补bug
                'chore', // 改变构建流程，或者增加依赖库、工具等
                'ci', // 持续集成修改
                'docs', // 文档更新
                'style', // 代码格式修改, 注意不是 css 修改（不影响代码运行的变动）
                'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
                'test', // 增加测试
                'revert', // 版本回退 (撤销之前的commit)
                'merge' // 合并分支， 例如： merge（前端页面）： feature-xxxx修改线程地址
            ]
        ],
        'type-case': [0],
        'type-empty': [0],
        'scope-empty': [0],
        'scope-case': [0],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never'],
        'header-max-length': [0, 'always', 72]
    }
}
