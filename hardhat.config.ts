import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const mnemonic = process.env.MNEMONIC;
if (!mnemonic) {
  throw new Error("Mnemonic phrase not defined");
}
const wallet = ethers.Wallet.fromMnemonic(mnemonic);
const privateKey = wallet.privateKey;

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  paths: { tests: "tests" },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [privateKey],
    },
  },
};

export default config;
