module.exports = [
    {
      name: '作业',
      value: 'task',
      children: [
        {
          name: '数组形式的整数加法',
          value: 'addToArrayForm',
          parent: 'task',
          children: [{
            name: 'ooo',
            value: 'addToArrayFormC',
            parent: 'task'
          }]
        },
        {
          name: '字符的最短距离',
          value: 'shortestToChar',
          parent: 'task'
        },
        {
          name: 'symbol',
          value: 'symbolPolyfill',
          parent: 'task'
        },
        {
          name: '设计一个支持增量操作的栈',
          value: 'CustomStack',
          parent: 'task'
        },
        {
          name: 'PromiseAllSettled',
          value: 'PromiseAllSettled',
          parent: 'task'
        },
        {
          name: ' 字符串解码',
          value: 'decodeString',
          parent: 'task'
        },
        {
          name: ' 有序链表转换二叉搜索树',
          value: 'sortedListToBST',
          parent: 'task'
        }
      ]
    },
    {
      name: '二叉树',
      value: 'tree',
      children: [
        {
          name: '对称二叉树',
          value: 'binaryTree',
          parent: 'tree'
        },
        {
          name: '路径总和',
          value: 'pathSum',
          parent: 'tree'
        },
        {
          name: '二叉搜索树的第k大节点',
          value: 'searchkNode',
          parent: 'tree'
        },
        {
          name: ' 另一棵树的子树',
          value: 'isSubtree',
          parent: 'tree'
        },
        {
          name: '二叉树的层序遍历',
          value: 'levelOrder',
          parent: 'tree'
        },
        {
          name: '二叉树的最近公共祖先',
          value: 'lowestCommonAncestor',
          parent: 'tree'
        },
        {
          name: '求根节点到叶节点数字之和',
          value: 'sumNumbers',
          parent: 'tree'
        },
        {
          name: '链表',
          value: 'linkedList',
          parent: 'tree'
        }
      ]
    },
    {
      name: '字符串',
      value: 'string',
      children: [
        {
          name: 'kmp',
          value: 'kmp',
          parent: 'string'
        },
        {
          name: '有效的括号',
          value: 'isValid',
          parent: 'string'
        },
        {
          name: '无重复字符的最长子串',
          value: 'lengthOfLongestSubstring',
          parent: 'string'
        },
        {
          name: '组合',
          value: 'combine',
          parent: 'string'
        },
        {
          name: '复原ip地址',
          value: 'restoreIpAddresses',
          parent: 'string'
        },
        {
          name: '括号生成',
          value: 'generateParenthesis',
          parent: 'string'
        }
      ]
    },
    {
      name: '哈希表',
      value: 'hash',
      children: [
        {
          name: '有效的字母异位',
          value: 'isAnagram',
          parent: 'hash'
        }
      ]
    },
    {
      name: '每日一题',
      value: 'day',
      children: [
        {
          name: '交替合并字符串',
          value: 'mergeAlternately',
          parent: 'day'
        },
        {
          name: 'promise模拟接口请求并发限制',
          value: 'concurrency',
          parent: 'day'
        },
        {
          name: '数组元素积的符号',
          value: 'arraySign',
          parent: 'day'
        },
        {
          name: '子数组的最小值之和',
          value: 'sumSubarrayMins',
          parent: 'day'
        },
        {
          name: '数组转化成树，树转化成数组',
          value: 'treeConversionArr',
          parent: 'day'
        }
      ]
    },
    {
      name: '动态规划',
      value: 'dynamic',
      children: [
        {
          name: '最长回文子串',
          value: 'longestPalindrome',
          parent: 'dynamic'
        },
        {
          name: '斐波那契数',
          value: 'Solution',
          parent: 'dynamic'
        },
        {
          name: '使用最小花费爬楼梯',
          value: 'minCostClimbingStairs',
          parent: 'dynamic'
        },
        {
          name: '不同路径',
          value: 'uniquePaths',
          parent: 'dynamic'
        },
        {
          name: '不同路径II',
          value: 'uniquePathsTwo',
          parent: 'dynamic'
        },
        {
          name: '整数拆分',
          value: 'integerBreak',
          parent: 'dynamic'
        },
        {
          name: '最大子数组和',
          value: 'maxSubArray',
          parent: 'dynamic'
        },
        {
          name: '最长重复子数组',
          value: 'findLength',
          parent: 'dynamic'
        },
        {
          name: '最长公共子序列',
          value: 'longestCommonSubsequence',
          parent: 'dynamic'
        },
        {
          name: '最长连续递增序列',
          value: 'findLengthOfLCIS',
          parent: 'dynamic'
        },
        {
          name: '最长上升子序列',
          value: 'lengthOfLIS',
          parent: 'dynamic'
        },
        {
          name: '0 1 背包理论',
          value: 'WeightBagProblem',
          parent: 'dynamic'
        },
        {
          name: '0 1 背包理论(滚动数组)',
          value: 'WeightBagProblem1',
          parent: 'dynamic'
        },
        {
          name: '最后一块石头的重量 II',
          value: 'lastStoneWeightII',
          parent: 'dynamic'
        },
        {
          name: '杨辉三角',
          value: 'generate',
          parent: 'dynamic'
        },
        {
          name: '买卖股票的最佳时机',
          value: 'maxProfit',
          parent: 'dynamic'
        },
        {
          name: '零钱兑换',
          value: 'coinChange',
          parent: 'dynamic'
        },
        {
          name: '最小路径和',
          value: 'minPathSum',
          parent: 'dynamic'
        }
      ]
    },
    {
      name: '设计模式',
      value: 'designMode',
      children: [
        {
          name: '单例模式',
          value: 'singletonMode',
          parent: 'designMode'
        },
        {
          name: '工厂模式',
          value: 'factoryMode',
          parent: 'designMode'
        },
        {
          name: '装饰器模式',
          value: 'decoratorMode',
          parent: 'designMode'
        },
        {
          name: '适配器模式',
          value: 'adapterMode',
          parent: 'designMode'
        },
        {
          name: '代理模式',
          value: 'proxyMode',
          parent: 'designMode'
        },
        {
          name: '发布订阅模式',
          value: 'publishmode',
          parent: 'designMode'
        }
      ]
    }
  ]
  