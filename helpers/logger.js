import colors from 'colors';

export const logPoolState = (pool) => {
  console.log(`    ${pool.name} Details`[pool.color || 'reset'])
  console.log('        ETH balance:', pool.ethBalance)
  console.log('        TKN balance:', pool.tokenBalance)
  console.log('        TKN price:', pool.tokenRate, 'ETH')
  console.log('        ETH price:', pool.ethRate, 'TKN')
  console.log('')
}

export const logUserState = (user) => {
  console.log(`    ${user.name} Details`[user.color || 'reset'])
  console.log('        ETH balance:', user.ethBalance)
  console.log('        TKN balance:', user.tokenBalance)
  console.log('')
}

export const logState = ({
  label,
  pools = [],
  users = []
} = {}) => {
  label && console.log(label)
  pools.forEach(logPoolState)
  users.forEach(logUserState)
}
