import colors from "colors";

export const depositEth = ({ user, pool, ethInputAmount }) => {
  const ret = pool.exchangeEthForToken({ ethInputAmount });
  const { tokenOutputAmount } = ret;
  user.ethBalance -= ethInputAmount;
  user.tokenBalance += tokenOutputAmount;
  console.log(
    `=> ${user.name[user.color || "reset"]} deposited ${
      ethInputAmount.toString().yellow
    } ETH in exchange for ${tokenOutputAmount.toString().yellow} IFY on ${
      pool.name[pool.color || "reset"]
    }`
  );
  console.log("");
  return ret;
};

export const depositToken = ({ user, pool, tokenInputAmount }) => {
  const ret = pool.exchangeTokenForEth({ tokenInputAmount });
  const { ethOutputAmount } = ret;
  user.tokenBalance -= tokenInputAmount;
  user.ethBalance += ethOutputAmount;
  console.log(
    `=> ${user.name[user.color || "reset"]} deposited ${
      tokenInputAmount.toString().yellow
    } IFY in exchange for ${ethOutputAmount.toString().yellow} ETH on ${
      pool.name[pool.color || "reset"]
    }`
  );
  console.log("");
  return ret;
};
