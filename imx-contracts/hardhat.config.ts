import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";

import dotenv from "dotenv";

dotenv.config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    dev: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_GOERLI_API_KEY}`,
      accounts: [`0x${process.env.DEPLOYER_TESTNET_PRIVATE_KEY}`],
    },
    sandbox: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_GOERLI_API_KEY}`,
      accounts: [`0x${process.env.DEPLOYER_TESTNET_PRIVATE_KEY}`],
    },    
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_MAINNET_API_KEY}`,
      accounts: [`0x${process.env.DEPLOYER_MAINNET_PRIVATE_KEY}`],
    },
  },
  typechain: {
    outDir: "artifacts/typechain",
    target: "ethers-v5",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
