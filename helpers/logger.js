import colors from "colors";

export const logPoolState = (pool) => {
  console.log(`    ${pool.name} Details`[pool.color || "reset"]);
  console.log("        ETH balance:", pool.ethBalance);
  console.log("        IFY balance:", pool.tokenBalance);
  console.log("        IFY price:", pool.tokenRate, "ETH");
  console.log("        ETH price:", pool.ethRate, "IFY");
  console.log("");
};

export const logUserState = (user) => {
  console.log(`    ${user.name} Details`[user.color || "reset"]);
  console.log("        ETH balance:", user.ethBalance);
  console.log("        IFY balance:", user.tokenBalance);
  console.log("");
};

export const logState = ({ label, pools = [], users = [] } = {}) => {
  label && console.log(label);
  pools.forEach(logPoolState);
  users.forEach(logUserState);
};
