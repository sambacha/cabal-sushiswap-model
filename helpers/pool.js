export default class Pool{
  ethBalance
  tokenBalance
  name
  color

  constructor({ ethBalance, tokenBalance, name, color }) {
    this.ethBalance = ethBalance
    this.tokenBalance = tokenBalance
    this.name = name
    this.color = color
  }

  get productConst() {
    return this.ethBalance * this.tokenBalance
  }

  get ethRate() {
    return this.tokenBalance / this.ethBalance
  }

  get tokenRate() {
    return this.ethBalance / this.tokenBalance
  }

  exchangeEthForToken({ ethInputAmount, log }) {
    const newEthBalance = this.ethBalance + ethInputAmount
    const newTokenBalance = this.productConst / newEthBalance
    const tokenOutputAmount = this.tokenBalance - newTokenBalance
    const oldTokenRate = this.tokenRate

    this.ethBalance = newEthBalance
    this.tokenBalance = newTokenBalance

    const newTokenRate = this.tokenRate
    const avgTokenRate = ethInputAmount / tokenOutputAmount
    const slippage = (avgTokenRate - oldTokenRate) / oldTokenRate * 100 // diffence between old rate and actual rate for user in percentage
    const priceMovement = (newTokenRate - oldTokenRate) / oldTokenRate * 100 // diffence between old rate and new rate in percentage

    log && console.log('old token rate', oldTokenRate)
    log && console.log('avg token rate', avgTokenRate)
    log && console.log('new token rate', newTokenRate)
    log && console.log('slippage', slippage)
    log && console.log('priceMovement', priceMovement)

    return { tokenOutputAmount, oldTokenRate, avgTokenRate, newTokenRate, slippage, priceMovement }
  }

  exchangeTokenForEth({ tokenInputAmount, log }) {
    const newTokenBalance = this.tokenBalance + tokenInputAmount
    const newEthBalance = this.productConst / newTokenBalance
    const ethOutputAmount = this.ethBalance - newEthBalance
    const oldEthRate = this.ethRate
    
    this.tokenBalance = newTokenBalance
    this.ethBalance = newEthBalance

    const newEthRate = this.ethRate
    const avgEthRate = tokenInputAmount / ethOutputAmount
    const slippage = (avgEthRate - oldEthRate) / oldEthRate * 100 // diffence between old rate and actual rate for user in percentage
    const priceMovement = (newEthRate - oldEthRate) / oldEthRate * 100 // diffence between old rate and new rate in percentage

    log && console.log('old eth rate', oldEthRate)
    log && console.log('avg eth rate', avgEthRate)
    log && console.log('new eth rate', newEthRate)
    log && console.log('slippage', slippage)
    log && console.log('priceMovement', priceMovement)

    return { ethOutputAmount, oldEthRate, avgEthRate, newEthRate, slippage, priceMovement }
  }

  reset({ ethBalance, tokenBalance }) {
    this.ethBalance = ethBalance
    this.tokenBalance = tokenBalance
  }
}
