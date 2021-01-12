import Pool from '../helpers/pool'

const POOL_ETH_BALANCE = 50
const POOL_TOKEN_BALANCE = 100
const USER_ETH_BALANCE = 10
const USER_TOKEN_BALANCE = 50

const pool = new Pool({
  ethBalance: POOL_ETH_BALANCE,
  tokenBalance: POOL_TOKEN_BALANCE
})

const user = {
  ethBalance: USER_ETH_BALANCE,
  tokenBalance: USER_TOKEN_BALANCE
}

const depositEth = (ethInputAmount) => {
  const { tokenOutputAmount, slippage, avgTokenRate } = pool.exchangeEthForToken({ ethInputAmount })
  user.ethBalance -= ethInputAmount
  user.tokenBalance += tokenOutputAmount
  console.log(`deposited ${ethInputAmount} ETH in exchange for ${tokenOutputAmount} TKN`)
  console.log('  slippage', slippage, '%')
  console.log('  avg TKN price', avgTokenRate, 'ETH')
  console.log('')
}

const depositToken = (tokenInputAmount) => {
  const { ethOutputAmount, slippage, avgEthRate } = pool.exchangeTokenForEth({ tokenInputAmount })
  user.tokenBalance -= tokenInputAmount
  user.ethBalance += ethOutputAmount
  console.log(`deposited ${tokenInputAmount} TKN in exchange for ${ethOutputAmount} ETH`)
  console.log('  slippage', slippage, '%')
  console.log('  avg ETH price', avgEthRate, 'TKN')
  console.log('')
}

const reset = () => {
  pool.reset({
    ethBalance: POOL_ETH_BALANCE,
    tokenBalance: POOL_TOKEN_BALANCE,
  })
  user.ethBalance = USER_ETH_BALANCE
  user.tokenBalance = USER_TOKEN_BALANCE
}

console.log('')
console.log('Pool Details')
console.log('  ETH balance:', POOL_ETH_BALANCE)
console.log('  TKN balance:', POOL_TOKEN_BALANCE)
console.log('  TKN price:', pool.tokenRate, 'ETH')
console.log('  ETH price:', pool.ethRate, 'TKN')
console.log('')

reset()
depositEth(1)

reset()
depositEth(5)

reset()
depositEth(10)
