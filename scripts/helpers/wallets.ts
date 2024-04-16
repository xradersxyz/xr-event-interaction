import { ethers, upgrades } from "hardhat";
import { Wallet, providers } from "ethers";
import dotenv from "dotenv";
import { ConnectionInfo } from "@ethersproject/web";
// const { upgrades } = require('hardhat')

dotenv.config();

export const getNetwork = () => {
  return process.env.DEFAULT_NET;
};

export const getEthers = () => {
  return ethers;
};

export const getUpgrades = () => {
  return upgrades;
};

export const getWallets = () => {
  const walletPrivateKey = process.env.DEVNET_PRIVKEY;

  const bnbProvider =
    process.env.MAIN_NET == "1"
      ? new providers.JsonRpcProvider(process.env.L1RPC_BNB)
      : new providers.JsonRpcProvider(process.env.L1RPC_BNBTEST);
  const opbnbProvider =
    process.env.MAIN_NET == "1"
      ? new providers.JsonRpcProvider(process.env.L2RPC_OPBNB)
      : new providers.JsonRpcProvider(process.env.L2RPC_OPBNBTEST);

  const bnbWallet = new Wallet(walletPrivateKey as string, bnbProvider);
  const opbnbWallet = new Wallet(walletPrivateKey as string, opbnbProvider);

  return {
    bnbWallet,
    opbnbWallet,
    bnbProvider,
    opbnbProvider,
  };
};
