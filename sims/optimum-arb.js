import colors from "colors";

import Pool from "../helpers/pool";
import { logState } from "../helpers/logger";
import { depositEth, depositToken } from "../helpers/pool-util";

// keep ratio of balances same for both exchanges
const UNISWAP_ETH_BALANCE = 1000;
const UNISWAP_TOKEN_BALANCE = 20000;

const DUOSWAP_ETH_BALANCE = 2000;
const DUOSWAP_TOKEN_BALANCE = 40000;

const NOOB_ETH_BALANCE = 100;
const NOOB_TOKEN_BALANCE = 0;

const PRO_ETH_BALANCE = 1000;
const PRO_TOKEN_BALANCE = 0;

const uniswap = new Pool({
  name: "Uniswap",
  color: "magenta",
  ethBalance: UNISWAP_ETH_BALANCE,
  tokenBalance: UNISWAP_TOKEN_BALANCE,
});

const sushiswap = new Pool({
  name: "Duoswap",
  color: "cyan",
  ethBalance: DUOSWAP_ETH_BALANCE,
  tokenBalance: DUOSWAP_TOKEN_BALANCE,
});

const noob = {
  name: "Noob",
  color: "red",
  ethBalance: NOOB_ETH_BALANCE,
  tokenBalance: NOOB_TOKEN_BALANCE,
};

const pro = {
  name: "Pro",
  color: "green",
  ethBalance: PRO_ETH_BALANCE,
  tokenBalance: PRO_TOKEN_BALANCE,
};

console.log("");
logState({
  label: "Initial State",
  pools: [uniswap, sushiswap],
  users: [noob, pro],
});

depositEth({
  user: noob,
  pool: uniswap,
  ethInputAmount: 100,
});

// amount calculated to make final exchange rates same for both pools
// refer arb-amount-calc for more information
const sushiswapEthInput =
  (Math.sqrt(
    uniswap.ethBalance *
      uniswap.tokenBalance *
      sushiswap.ethBalance *
      sushiswap.tokenBalance
  ) -
    uniswap.tokenBalance * sushiswap.ethBalance) /
  (uniswap.tokenBalance + sushiswap.tokenBalance);

const { tokenOutputAmount: sushiswapTokenOutput } = depositEth({
  user: pro,
  pool: sushiswap,
  ethInputAmount: sushiswapEthInput,
});

const uniswapTokenInput = sushiswapTokenOutput;
const { ethOutputAmount: uniswapEthOutput } = depositToken({
  user: pro,
  pool: uniswap,
  tokenInputAmount: uniswapTokenInput,
});

console.log(
  `=> Net profit ${
    (uniswapEthOutput - sushiswapEthInput).toString().yellow
  } ETH`
);
console.log("");

logState({
  label: "Final State",
  pools: [uniswap, sushiswap],
  users: [noob, pro],
});
