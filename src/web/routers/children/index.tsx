import Shortesttochar from '../../components/article/task/shortestToChar'
import Symbolpolyfill from '../../components/article/task/symbolPolyfill'
import Customstack from '../../components/article/task/CustomStack'
import Promiseallsettled from '../../components/article/task/PromiseAllSettled'
import Decodestring from '../../components/article/task/decodeString'
import Sortedlisttobst from '../../components/article/task/sortedListToBST'
import Binarytree from '../../components/article/tree/binaryTree'
import Pathsum from '../../components/article/tree/pathSum'
import Searchknode from '../../components/article/tree/searchkNode'
import Issubtree from '../../components/article/tree/isSubtree'
import Levelorder from '../../components/article/tree/levelOrder'
import Lowestcommonancestor from '../../components/article/tree/lowestCommonAncestor'
import Sumnumbers from '../../components/article/tree/sumNumbers'
import Linkedlist from '../../components/article/tree/linkedList'
import Kmp from '../../components/article/string/kmp'
import Isvalid from '../../components/article/string/isValid'
import Lengthoflongestsubstring from '../../components/article/string/lengthOfLongestSubstring'
import Combine from '../../components/article/string/combine'
import Restoreipaddresses from '../../components/article/string/restoreIpAddresses'
import Generateparenthesis from '../../components/article/string/generateParenthesis'
import Isanagram from '../../components/article/hash/isAnagram'
import Mergealternately from '../../components/article/day/mergeAlternately'
import Concurrency from '../../components/article/day/concurrency'
import Arraysign from '../../components/article/day/arraySign'
import Sumsubarraymins from '../../components/article/day/sumSubarrayMins'
import Treeconversionarr from '../../components/article/day/treeConversionArr'
import Longestpalindrome from '../../components/article/dynamic/longestPalindrome'
import Solution from '../../components/article/dynamic/Solution'
import Mincostclimbingstairs from '../../components/article/dynamic/minCostClimbingStairs'
import Uniquepaths from '../../components/article/dynamic/uniquePaths'
import Uniquepathstwo from '../../components/article/dynamic/uniquePathsTwo'
import Integerbreak from '../../components/article/dynamic/integerBreak'
import Maxsubarray from '../../components/article/dynamic/maxSubArray'
import Findlength from '../../components/article/dynamic/findLength'
import Longestcommonsubsequence from '../../components/article/dynamic/longestCommonSubsequence'
import Findlengthoflcis from '../../components/article/dynamic/findLengthOfLCIS'
import Lengthoflis from '../../components/article/dynamic/lengthOfLIS'
import Weightbagproblem from '../../components/article/dynamic/WeightBagProblem'
import Weightbagproblem1 from '../../components/article/dynamic/WeightBagProblem1'
import Laststoneweightii from '../../components/article/dynamic/lastStoneWeightII'
import Generate from '../../components/article/dynamic/generate'
import Maxprofit from '../../components/article/dynamic/maxProfit'
import Coinchange from '../../components/article/dynamic/coinChange'
import Minpathsum from '../../components/article/dynamic/minPathSum'
import Singletonmode from '../../components/article/designMode/singletonMode'
import Factorymode from '../../components/article/designMode/factoryMode'
import Decoratormode from '../../components/article/designMode/decoratorMode'
import Adaptermode from '../../components/article/designMode/adapterMode'
import Proxymode from '../../components/article/designMode/proxyMode'
import Publishmode from '../../components/article/designMode/publishmode'
import Addtoarrayformc from '../../components/article/task/addToArrayFormC'
const childrenRouters = [
  { path: '/shortestToChar', element: <Shortesttochar /> },
  { path: '/symbolPolyfill', element: <Symbolpolyfill /> },
  { path: '/CustomStack', element: <Customstack /> },
  { path: '/PromiseAllSettled', element: <Promiseallsettled /> },
  { path: '/decodeString', element: <Decodestring /> },
  { path: '/sortedListToBST', element: <Sortedlisttobst /> },
  { path: '/binaryTree', element: <Binarytree /> },
  { path: '/pathSum', element: <Pathsum /> },
  { path: '/searchkNode', element: <Searchknode /> },
  { path: '/isSubtree', element: <Issubtree /> },
  { path: '/levelOrder', element: <Levelorder /> },
  { path: '/lowestCommonAncestor', element: <Lowestcommonancestor /> },
  { path: '/sumNumbers', element: <Sumnumbers /> },
  { path: '/linkedList', element: <Linkedlist /> },
  { path: '/kmp', element: <Kmp /> },
  { path: '/isValid', element: <Isvalid /> },
  { path: '/lengthOfLongestSubstring', element: <Lengthoflongestsubstring /> },
  { path: '/combine', element: <Combine /> },
  { path: '/restoreIpAddresses', element: <Restoreipaddresses /> },
  { path: '/generateParenthesis', element: <Generateparenthesis /> },
  { path: '/isAnagram', element: <Isanagram /> },
  { path: '/mergeAlternately', element: <Mergealternately /> },
  { path: '/concurrency', element: <Concurrency /> },
  { path: '/arraySign', element: <Arraysign /> },
  { path: '/sumSubarrayMins', element: <Sumsubarraymins /> },
  { path: '/treeConversionArr', element: <Treeconversionarr /> },
  { path: '/longestPalindrome', element: <Longestpalindrome /> },
  { path: '/Solution', element: <Solution /> },
  { path: '/minCostClimbingStairs', element: <Mincostclimbingstairs /> },
  { path: '/uniquePaths', element: <Uniquepaths /> },
  { path: '/uniquePathsTwo', element: <Uniquepathstwo /> },
  { path: '/integerBreak', element: <Integerbreak /> },
  { path: '/maxSubArray', element: <Maxsubarray /> },
  { path: '/findLength', element: <Findlength /> },
  { path: '/longestCommonSubsequence', element: <Longestcommonsubsequence /> },
  { path: '/findLengthOfLCIS', element: <Findlengthoflcis /> },
  { path: '/lengthOfLIS', element: <Lengthoflis /> },
  { path: '/WeightBagProblem', element: <Weightbagproblem /> },
  { path: '/WeightBagProblem1', element: <Weightbagproblem1 /> },
  { path: '/lastStoneWeightII', element: <Laststoneweightii /> },
  { path: '/generate', element: <Generate /> },
  { path: '/maxProfit', element: <Maxprofit /> },
  { path: '/coinChange', element: <Coinchange /> },
  { path: '/minPathSum', element: <Minpathsum /> },
  { path: '/singletonMode', element: <Singletonmode /> },
  { path: '/factoryMode', element: <Factorymode /> },
  { path: '/decoratorMode', element: <Decoratormode /> },
  { path: '/adapterMode', element: <Adaptermode /> },
  { path: '/proxyMode', element: <Proxymode /> },
  { path: '/publishmode', element: <Publishmode /> },
  { path: '/addToArrayFormC', element: <Addtoarrayformc /> }
]
export default childrenRouters
