import { ethers, upgrades } from 'hardhat'
import { Wallet, providers } from 'ethers'
import dotenv from 'dotenv'
import { ConnectionInfo } from '@ethersproject/web'
// const { upgrades } = require('hardhat')

dotenv.config()

export const getNetwork = () => {
  return process.env.DEFAULT_NET
}

export const getEthers = () => {
  return ethers
}

export const getUpgrades = () => {
  return upgrades
}

export const getWallets = () => {
  const walletPrivateKey = process.env.DEVNET_PRIVKEY
  const localhostProvider = new providers.JsonRpcProvider(
    'http://127.0.0.1:8545'
  )
  const localWallet = new Wallet(walletPrivateKey as string, localhostProvider)

  // const connectionInfoBNB = {
  //   url: `https://rpc.particle.network/evm-chain?chainId=${
  //     process.env.MAIN_NET == '1' ? '56' : '97'
  //   }`,
  //   user: '74a1ff1a-a5bc-4026-a356-3769d88c061f',
  //   password: 'cT3A5sEu3QF5sQb51dYa6U83KCypYZPqE3hCa8LT',
  // } as ConnectionInfo

  // const connectionInfoOPBNB = {
  //   url: `https://rpc.particle.network/evm-chain?chainId=${
  //     process.env.MAIN_NET == '1' ? '204' : '5611'
  //   }`,
  //   user: '74a1ff1a-a5bc-4026-a356-3769d88c061f',
  //   password: 'cT3A5sEu3QF5sQb51dYa6U83KCypYZPqE3hCa8LT',
  // } as ConnectionInfo

  const bnbProvider =
    process.env.MAIN_NET == '1'
      ? new providers.JsonRpcProvider(process.env.L1RPC_BNB)
      : new providers.JsonRpcProvider(process.env.L1RPC_BNBTEST)
  const opbnbProvider =
    process.env.MAIN_NET == '1'
      ? new providers.JsonRpcProvider(process.env.L2RPC_OPBNB)
      : new providers.JsonRpcProvider(process.env.L2RPC_OPBNBTEST)

  const bnbWallet = new Wallet(walletPrivateKey as string, bnbProvider)
  const opbnbWallet = new Wallet(walletPrivateKey as string, opbnbProvider)

  return {
    localWallet,
    bnbWallet,
    opbnbWallet,
    localhostProvider,
    bnbProvider,
    opbnbProvider,
  }
}
